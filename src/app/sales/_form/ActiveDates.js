import React, { useState } from "react";

import { Controller } from "react-hook-form";

import { FormControlLabel, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Checkbox } from "@/components/Checkbox";
import { Card } from "@/components/Card";

const useStyles = makeStyles(
  (theme) => ({
    dateWrapper: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridTemplateColumns: "1fr 1fr",
    },
  }),
  { name: "SaleFormActiveDates" }
);

export const ActiveDates = (props) => {
  const { control, errors, setValue, sale } = props;
  const classes = useStyles();
  const [openEndDate, setOpenEndDate] = useState(!!sale?.endDate);

  const handleChangeEndDate = () => {
    if (openEndDate) {
      setOpenEndDate(false);
      setValue("endDate", "", { shouldValidate: true, shouldDirty: true });
      setValue("endHour", "", { shouldValidate: true, shouldDirty: true });
    } else {
      setOpenEndDate(true);
    }
  };

  return (
    <Card title="Active Dates" useMargin>
      <div className={classes.dateWrapper}>
        <Controller
          as={TextField}
          control={control}
          name="startDate"
          type="date"
          label="Start Date"
          fullWidth
          error={!!errors.startDate}
          helperText={errors.startDate?.message}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Controller
          as={TextField}
          control={control}
          name="startHour"
          type="time"
          label="Start Hour"
          fullWidth
          error={!!errors.startHour}
          helperText={errors.startHour?.message}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <FormControlLabel
        control={<Checkbox checked={openEndDate} onChange={handleChangeEndDate} />}
        label="Set end date"
      />
      {openEndDate && (
        <div className={classes.dateWrapper}>
          <Controller
            as={TextField}
            control={control}
            name="endDate"
            type="date"
            label="End Date"
            fullWidth
            error={!!errors.endDate}
            helperText={errors.endDate?.message}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Controller
            as={TextField}
            control={control}
            name="endHour"
            type="time"
            label="End Hour"
            fullWidth
            error={!!errors.endHour}
            helperText={errors.endHour?.message}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      )}
    </Card>
  );
};
