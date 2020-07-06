import React, { useEffect } from "react";

import { Controller } from "react-hook-form";

import { TextField } from "@material-ui/core";

import { useDistrict } from "@/app/_components/_hooks/useDistrict";
import { Districts } from "@/app/_components/Districts";

import { Card } from "@/components/Card";

export const PrimaryAddress = (props) => {
  const { control, errors, address, setValue, register, unregister } = props;
  const { selected, setSelected, options, loading, onChange } = useDistrict({
    address,
    setValue,
    valueName: "defaultShippingAddress.subDistrict",
  });

  useEffect(() => {
    register("defaultShippingAddress.subDistrict");
    return () => {
      unregister("defaultShippingAddress.subDistrict");
    };
  }, [register, unregister]);

  return (
    <Card title="Primary Address" useMargin>
      <Controller
        as={TextField}
        control={control}
        name="defaultShippingAddress.name"
        label="Name"
        fullWidth
        error={!!errors.defaultShippingAddress?.name}
        helperText={errors.defaultShippingAddress?.name?.message}
      />
      <Controller
        as={TextField}
        control={control}
        name="defaultShippingAddress.phone"
        label="Phone"
        fullWidth
        error={!!errors.defaultShippingAddress?.phone}
        helperText={errors.defaultShippingAddress?.phone?.message}
      />
      <Controller
        as={TextField}
        control={control}
        name="defaultShippingAddress.streetAddress"
        label="Address"
        fullWidth
        error={!!errors.defaultShippingAddress?.streetAddress}
        helperText={errors.defaultShippingAddress?.streetAddress?.message}
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
        error={!!errors.defaultShippingAddress?.subDistrict}
        helperText={errors.defaultShippingAddress?.subDistrict?.message}
      />
      <Controller
        as={TextField}
        control={control}
        name="defaultShippingAddress.postalCode"
        label="Postal Code"
        fullWidth
        error={!!errors.defaultShippingAddress?.postalCode}
        helperText={errors.defaultShippingAddress?.postalCode?.message}
      />
    </Card>
  );
};
