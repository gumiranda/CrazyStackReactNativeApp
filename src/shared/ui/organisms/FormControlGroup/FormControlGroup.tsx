import React from "react";
import { FormControl } from "../..";

export const FormControlGroup = ({
  formControls = [],
  formState,
  control,
  defaultFormControl = true,
}) => {
  return (
    <>
      {formControls?.map?.(
        (
          {
            label = "",
            iconName = "person",
            inputProps = {},
            name = "text",
            password = false,
          },
          index: number
        ) => (
          <FormControl
            key={index}
            name={name}
            iconName={iconName}
            label={label}
            inputProps={inputProps}
            error={formState?.errors?.[name]}
            control={control}
            defaultFormControl={defaultFormControl}
            password={password}
          />
        )
      )}
    </>
  );
};
