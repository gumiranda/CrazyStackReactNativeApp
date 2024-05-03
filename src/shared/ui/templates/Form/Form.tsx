import { FormControlGroup } from "../../organisms";

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
