import { useEffect } from "react";

import { useLazyQuery } from "@apollo/react-hooks";

import { maybe } from "@/utils";
import { useObjectState, useQuery } from "@/utils/hooks";

import { GetCities, GetDistricts, GetProvinces } from "@/core/_graphql/queries";

const getOptions = (rawData) => {
  return rawData.map(({ node }) => ({ id: node.id, name: node.name }));
};

export const useDistrict = (props) => {
  const { address, setValue, valueName } = props;
  const { loading: provincesLoading, data: provincesData } = useQuery(GetProvinces);
  const [getCities, { loading: citiesLoading, data: citiesData }] = useLazyQuery(GetCities);
  const [getDistricts, { loading: districtsLoading, data: districtsData }] = useLazyQuery(
    GetDistricts
  );
  const [options, setOptions] = useObjectState({
    provinces: [],
    cities: [],
    districts: [],
  });

  const [selected, setSelected] = useObjectState({
    province: address ? address?.subDistrict?.city?.province : null,
    city: address
      ? { id: address?.subDistrict?.city.id, name: address?.subDistrict?.city.name }
      : null,
    district: address ? { id: address?.subDistrict.id, name: address?.subDistrict.name } : null,
  });

  useEffect(() => {
    const rawData = maybe(() => provincesData.provinces.edges, []);
    setOptions({
      provinces: getOptions(rawData),
    });
  }, [setOptions, provincesData]);

  useEffect(() => {
    const rawData = maybe(() => citiesData.cities.edges, []);
    setOptions({
      cities: getOptions(rawData),
    });
  }, [setOptions, citiesData]);

  useEffect(() => {
    const rawData = maybe(() => districtsData.subDistricts.edges, []);
    setOptions({
      districts: getOptions(rawData),
    });
  }, [setOptions, districtsData]);

  useEffect(() => {
    if (selected.province) {
      getCities({ variables: { province: selected.province?.id } });
    }
  }, [getCities, setOptions, setSelected, selected.province]);

  useEffect(() => {
    if (selected.city) {
      getDistricts({ variables: { city: selected.city?.id } });
    }
  }, [getDistricts, setOptions, setSelected, selected.city]);

  useEffect(() => {
    if (selected.district) {
      setValue(valueName, selected.district?.id, { shouldValidate: false, shouldDirty: true });
    } else {
      setValue(valueName, "", { shouldValidate: false, shouldDirty: true });
    }
  }, [setValue, valueName, selected.district]);

  const provinceOnChange = () => {
    setSelected({
      city: null,
      district: null,
    });
    setOptions({ cities: [], districts: [] });
  };

  const cityOnChange = () => {
    setSelected({
      district: null,
    });
    setOptions({ districts: [] });
  };

  return {
    options,
    loading: {
      province: provincesLoading,
      city: citiesLoading,
      district: districtsLoading,
    },
    selected,
    setSelected,
    onChange: {
      province: provinceOnChange,
      city: cityOnChange,
    },
  };
};
