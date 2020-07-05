import React from "react";

import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";

import { ErrorMessage } from "@/components/_form";
import { Card } from "@/components/Card";
import { SimpleColGrid } from "@/components/SimpleColGrid";

export const useStyles = makeStyles(
  () => ({
    inputRoot: {
      padding: "0 65px 0 0 !important",
    },
    input: {
      padding: "23px 12px 10px 12px !important",
    },
  }),
  { name: "Attribute" }
);

export const Attribute = (props) => {
  const { attribute, watch, idx, setValue } = props;
  const { values } = attribute;
  const classes = useStyles();
  const attributes = watch("attributes");
  const value = attributes.find((item) => item.id === attribute.id).values[0];

  return (
    <Autocomplete
      disableClearable
      classes={{ inputRoot: classes.inputRoot, input: classes.input }}
      options={values}
      value={values.find((x) => x.slug === value) || null}
      getOptionLabel={(item) => item.name}
      getOptionSelected={(option) => option.slug === value}
      onChange={(_, value) => {
        const oldAttributes = [...attributes];
        oldAttributes[idx].values = value?.slug ? [value.slug] : [];
        setValue("attributes", oldAttributes, { shouldValidate: true, shouldDirty: true });
      }}
      renderInput={(params) => <TextField {...params} label={attribute.name} variant="outlined" />}
    />
  );
};

export const Attributes = (props) => {
  const { attributes, watch, setValue, errors } = props;
  return (
    <Card title="Attributes" useMargin>
      <ErrorMessage errors={errors} name="attributes" useMarginTop={false} />
      <SimpleColGrid>
        {attributes.map((item, idx) => {
          const attribute = item?.attribute || item;

          return (
            <Attribute
              key={attribute.id}
              attribute={attribute}
              watch={watch}
              setValue={setValue}
              idx={idx}
            />
          );
        })}
      </SimpleColGrid>
    </Card>
  );
};
