import React, { useState } from "react";

import ToggleIcon from "material-ui-toggle-icon";

import { IconButton, InputAdornment, TextField as MuiTextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export const PasswordField = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <MuiTextField
      {...props}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              <ToggleIcon on={showPassword} onIcon={<Visibility />} offIcon={<VisibilityOff />} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
