import React, { useEffect, useState } from "react";

import { useDebouncedCallback } from "use-debounce";

import { FormControlLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { DELAYED_TIMEOUT } from "@/config/constants";
import { Checkbox } from "@/components/Checkbox";
import { Card } from "@/components/Template";

import { cartesianProduct, findDuplicateValues } from "./utils";

const useStyles = makeStyles(
  (theme) => ({
    valueContainer: {
      display: "grid",
      gridColumnGap: theme.spacing(3),
      gridTemplateColumns: "repeat(5, 1fr)",
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "repeat(2, 1fr)",
      },
    },
  }),
  { name: "ProductVariantCreatorValues" }
);

export const Values = (props) => {
  const {
    activeStep,
    product: {
      getUniqueSku,
      productType: { variantAttributes },
    },
    setVariants,
  } = props;
  const classes = useStyles();
  const [tempValues, setTempValues] = useState([]);
  const [mutateVariants] = useDebouncedCallback((tempVariants) => {
    if (tempVariants.every((item) => item.values.length > 0)) {
      const cartesian = cartesianProduct(tempVariants);
      const allSku = findDuplicateValues(
        cartesian.map((item) =>
          [getUniqueSku, ...item.map((val) => val.values[0].substr(0, 3).toUpperCase())].join("-")
        )
      );
      const flatten = cartesian.map((item, idx) => {
        return {
          attributes: item.map((val) => ({ id: val.id, values: val.values })),
          sku: allSku[idx],
          weight: "",
          cost: 0,
          price: 0,
          quantity: 0,
        };
      });
      setVariants(flatten);
    } else {
      setVariants([]);
    }
  }, DELAYED_TIMEOUT);

  useEffect(() => {
    const defaultTempValues = variantAttributes.map((attribute) => ({
      id: attribute.id,
      values: [],
      sortingValues: attribute.values.map((value) => value.slug),
    }));

    if (activeStep === 0) {
      setTempValues(defaultTempValues);
    }
  }, [activeStep, variantAttributes]);

  useEffect(() => {
    mutateVariants(tempValues);
  }, [mutateVariants, tempValues]);

  const handleCheck = (slug, idx, checked) => {
    const attribute = tempValues[idx];
    let rawValues;
    if (checked) {
      rawValues = [...attribute.values, slug];
    } else {
      rawValues = attribute.values.filter((item) => item !== slug);
    }

    const newValues = attribute.sortingValues.filter((item) => rawValues.includes(item));
    const rawTemp = [...tempValues];
    rawTemp[idx].values = newValues;
    setTempValues(rawTemp);
  };

  return (
    <>
      {tempValues.length > 0 &&
        variantAttributes.map((attribute, idx) => {
          return (
            <Card key={attribute.id} title={attribute.name}>
              <div className={classes.valueContainer}>
                {attribute.values.map((value) => {
                  const attributeValues = tempValues.find((item) => item.id === attribute.id)
                    .values;
                  const checked = attributeValues.includes(value.slug);

                  return (
                    <FormControlLabel
                      key={value.id}
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={(e) => handleCheck(value.slug, idx, e.target.checked)}
                          size="small"
                          name="checkedB"
                          color="primary"
                        />
                      }
                      label={value.name}
                    />
                  );
                })}
              </div>
            </Card>
          );
        })}
    </>
  );
};
