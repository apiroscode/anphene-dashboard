import React from "react";
import { ErrorMessage } from "@/components/form";
import { Card } from "@/components/Template";
import { ColGrid } from "@/app/products/components/components";
import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";

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
        console.log(value);
        const oldAttributes = [...attributes];
        oldAttributes[idx].values = value?.slug ? [value.slug] : [];
        setValue("attributes", oldAttributes);
      }}
      renderInput={(params) => <TextField {...params} label={attribute.name} variant="outlined" />}
    />
  );
};

export const FormAttributes = (props) => {
  const { variant, watch, setValue, errors } = props;
  const { attributes } = variant;

  return (
    <Card title="Attributes" useMargin>
      <ErrorMessage errors={errors} name="attributes" useMarginTop={false} />
      <ColGrid>
        {attributes.map(({ attribute }, idx) => (
          <Attribute
            key={attribute.id}
            attribute={attribute}
            watch={watch}
            setValue={setValue}
            idx={idx}
          />
        ))}
      </ColGrid>
    </Card>
  );
};
