import React from "react";

import { Controller } from "react-hook-form";

import {
  Box,
  Divider,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  TextField,
  Typography,
} from "@material-ui/core";

import { Checkbox } from "@/components/Checkbox";
import { Card } from "@/components/Template";

export const FormProperties = (props) => {
  const { control, errors } = props;
  return (
    <Card title="Properties" useMargin>
      <Box marginBottom={"8px !important"}>
        <Typography variant="subtitle1" color="textSecondary">
          Storefront Properties
        </Typography>
        <Divider />
      </Box>
      <FormControlLabel
        control={
          <Controller
            as={Checkbox}
            control={control}
            name="filterableInStorefront"
            type="checkbox"
            size="small"
          />
        }
        label="Use in Faceted Navigation"
      />
      <Controller
        as={TextField}
        control={control}
        name="storefrontSearchPosition"
        label="Position in faceted navigation"
        fullWidth
        error={!!errors.storefrontSearchPosition}
        helperText={errors.storefrontSearchPosition?.message}
      />
      <FormControlLabel
        control={
          <Controller
            as={Checkbox}
            control={control}
            name="visibleInStorefront"
            type="checkbox"
            size="small"
          />
        }
        label="Visible on Product Page in Storefront"
      />
      <Box marginBottom={"8px !important"}>
        <Typography variant="subtitle1" color="textSecondary">
          Dashboard Properties
        </Typography>
        <Divider />
      </Box>
      <FormGroup>
        <FormControlLabel
          control={
            <Controller
              as={Checkbox}
              control={control}
              name="filterableInDashboard"
              type="checkbox"
              size="small"
            />
          }
          label="Use in Filtering"
        />
        <FormHelperText>
          If enabled, you’ll be able to use this attribute to filter products in product list.
        </FormHelperText>
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={
            <Controller
              as={Checkbox}
              control={control}
              name="availableInGrid"
              type="checkbox"
              size="small"
            />
          }
          label="Add to Column Options"
        />
        <FormHelperText>
          If enabled this attribute can be used as a column in product table.
        </FormHelperText>
      </FormGroup>
    </Card>
  );
};
