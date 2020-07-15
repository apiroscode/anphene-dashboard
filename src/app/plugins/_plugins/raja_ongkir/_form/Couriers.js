import React, { useEffect } from "react";

import { FormControlLabel, FormGroup, Typography } from "@material-ui/core";

import { Card } from "@/components/Card";
import { Checkbox } from "@/components/Checkbox";

const couriers = {
  sicepat: "SiCepat Express",
  jne: "Jalur Nugraha Ekakurir (JNE)",
  jnt: "J&T Express",
  pos: "POS Indonesia",
  ninja: "Ninja Xpress",
  tiki: "Citra Van Titipan Kilat (TIKI)",
  lion: "Lion Parcel",
  jet: "JET Express",
  wahana: "Wahana Prestasi Logistik",
  rpx: "RPX Holding (RPX)",
  esl: "Eka Sari Lorena (ESL)",
  pcp: "Priority Cargo and Package (PCP)",
  pandu: "Pandu Logistics",
  pahala: "Pahala Kencana Express",
  sap: "SAP Express",
  dse: "21 Express (DSE)",
  slis: "Solusi Ekspres (SLIS)",
  first: "First Logistics",
  ncs: "Nusantara Card Semesta (NCS)",
  star: "Star Cargo",
  idl: "IDL Carg",
  rex: "Royal Express Indonesia (REX)",
};

export const Couriers = (props) => {
  const { register, unregister, plugin, setValue, watch } = props;
  const { configuration } = plugin;
  const courier = watch("courier");
  const courierHelpText = configuration.find((config) => config.name === "courier").helpText;

  useEffect(() => {
    register("courier");
    return () => {
      unregister("courier");
    };
  }, [register, unregister]);

  const handleChange = (e) => {
    const name = e.target.name;
    if (courier.includes(name)) {
      setValue(
        "courier",
        courier.filter((item) => item !== name),
        { shouldValidate: true, shouldDirty: true }
      );
    } else {
      setValue("courier", [...courier, name], { shouldValidate: true, shouldDirty: true });
    }
  };

  return (
    <Card title="Couriers" useMargin>
      <Typography>{courierHelpText}</Typography>
      <FormGroup>
        {Object.keys(couriers).map((key) => (
          <FormControlLabel
            key={key}
            control={
              <Checkbox name={key} checked={courier.includes(key)} onChange={handleChange} />
            }
            label={couriers[key]}
          />
        ))}
      </FormGroup>
    </Card>
  );
};
