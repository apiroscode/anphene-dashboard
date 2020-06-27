import React, { useEffect } from "react";

import { FormControlLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
    values,
    info,
    setValues,
    product: {
      getUniqueSku,
      productType: { variantAttributes },
    },
    setVariants,
  } = props;
  const classes = useStyles();

  useEffect(() => {
    const mutateVariants = (values) => {
      if (values.every((item) => item.values.length > 0)) {
        const cartesian = cartesianProduct(values);
        const allSku = findDuplicateValues(
          cartesian.map((item) =>
            [getUniqueSku, ...item.map((val) => val.values[0].substr(0, 3).toUpperCase())].join(
              "-"
            )
          )
        );
        const flatten = cartesian.map((item, idx) => {
          return {
            attributes: item.map((val) => ({ id: val.id, values: val.values, name: val.name })),
            sku: allSku[idx],
            weight: info.weight,
            cost: info.cost,
            price: info.price,
            quantity: info.quantity,
          };
        });
        setVariants(flatten);
      } else {
        setVariants([]);
      }
    };

    mutateVariants(values);
  }, [values, getUniqueSku, setVariants, info]);

  const handleCheck = (slug, idx, checked) => {
    const attribute = values[idx];
    let rawValues;
    if (checked) {
      rawValues = [...attribute.values, slug];
    } else {
      rawValues = attribute.values.filter((item) => item !== slug);
    }

    const newValues = attribute.sortingValues.filter((item) => rawValues.includes(item));
    const rawTemp = [...values];
    rawTemp[idx].values = newValues;
    setValues(rawTemp);
  };

  return (
    <>
      {values.length > 0 &&
        variantAttributes.map((attribute, idx) => {
          return (
            <Card key={attribute.id} title={attribute.name}>
              <div className={classes.valueContainer}>
                {attribute.values.map((value) => {
                  const attributeValues = values.find((item) => item.id === attribute.id).values;
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
