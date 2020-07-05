import React, { useEffect } from "react";

import { Controller } from "react-hook-form";

import { TextField } from "@material-ui/core";

import { useDistrict } from "@/app/_components/_hooks/useDistrict";
import { Districts } from "@/app/_components/Districts";

import { Card } from "@/components/Card";

export const StoreInformation = (props) => {
  const { control, errors, address, setValue, register, unregister } = props;
  const { selected, setSelected, options, loading, onChange } = useDistrict({
    address,
    setValue,
    valueName: "addressInput.subDistrict",
  });

  useEffect(() => {
    register("addressInput.subDistrict");
    return () => {
      unregister("addressInput.subDistrict");
    };
  }, [register, unregister]);

  return (
    <Card title="Store Information" useMargin>
      <Controller
        as={TextField}
        control={control}
        name="addressInput.name"
        label="Name of your store"
        fullWidth
        error={!!errors.addressInput?.name}
        helperText={errors.addressInput?.name?.message}
      />
      <Controller
        as={TextField}
        control={control}
        name="addressInput.phone"
        label="Phone"
        fullWidth
        error={!!errors.addressInput?.phone}
        helperText={errors.addressInput?.phone?.message}
      />
      <Controller
        as={TextField}
        control={control}
        name="addressInput.streetAddress"
        label="Address"
        fullWidth
        error={!!errors.addressInput?.streetAddress}
        helperText={errors.addressInput?.streetAddress?.message}
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
        error={!!errors.addressInput?.subDistrict}
        helperText={errors.addressInput?.subDistrict?.message}
      />
      <Controller
        as={TextField}
        control={control}
        name="addressInput.postalCode"
        label="Postal Code"
        fullWidth
        error={!!errors.addressInput?.postalCode}
        helperText={errors.addressInput?.postalCode?.message}
      />
    </Card>
  );
};
