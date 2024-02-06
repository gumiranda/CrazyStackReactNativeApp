import React from "react";
import { FormControlGroup } from "@/shared/ui/organisms";

export const Form = ({
  formState,
  control,
  formControls,
  children = null,
  defaultFormControl = true,
  ...rest
}) => {
  return (
    <>
      <FormControlGroup
        formControls={formControls}
        formState={formState}
        control={control}
        defaultFormControl={defaultFormControl}
        {...rest}
      />
      {children}
    </>
  );
};
