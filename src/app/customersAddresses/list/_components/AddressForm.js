import React, { useEffect } from "react";

import { Controller } from "react-hook-form";

import { TextField } from "@material-ui/core";

import { RowGrid } from "@/components/RowGrid";

import { useDistrict } from "@/app/_components/_hooks/useDistrict";
import { Districts } from "@/app/_components/Districts";

export const AddressForm = (props) => {
  const { control, errors, address, setValue, register, unregister } = props;
  const { selected, setSelected, options, loading, onChange } = useDistrict({
    address,
    setValue,
    valueName: "subDistrict",
  });

  useEffect(() => {
    register("subDistrict");
    return () => {
      unregister("subDistrict");
    };
  }, [register, unregister]);

  return (
    <RowGrid>
      <Controller
        as={TextField}
        control={control}
        name="name"
        label="Name"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Controller
        as={TextField}
        control={control}
        name="phone"
        label="Phone"
        fullWidth
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />
      <Controller
        as={TextField}
        control={control}
        name="streetAddress"
        label="Address"
        fullWidth
        error={!!errors.streetAddress}
        helperText={errors.streetAddress?.message}
      />
      <Districts
        label="Province"
        options={options.provinces}
        loading={loading.province}
        selected={selected.province}
        setSelected={setSelected}
        onChange={onChange.province}
        isProvince
      />
      <Districts
        label="City"
        options={options.cities}
        loading={loading.city}
        selected={selected.city}
        setSelected={setSelected}
        onChange={onChange.city}
      />
      <Districts
        label="District"
        options={options.districts}
        loading={loading.district}
        selected={selected.district}
        setSelected={setSelected}
        error={!!errors.subDistrict}
        helperText={errors.subDistrict?.message}
      />
      <Controller
        as={TextField}
        control={control}
        name="postalCode"
        label="Postal Code"
        fullWidth
        error={!!errors.postalCode}
        helperText={errors.postalCode?.message}
      />
    </RowGrid>
  );
};
