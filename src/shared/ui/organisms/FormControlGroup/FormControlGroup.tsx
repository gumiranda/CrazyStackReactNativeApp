import { FormControl } from "../../molecules";

export const FormControlGroup = ({
  formControls = [],
  formState,
  control,
  defaultFormControl = true,
}) => {
  return (
    <>
      {formControls.map(
        (
          {
            label = "",
            iconName = "person",
            inputProps = {},
            name = "text",
            password = false,
          },
          index: number
        ) => {
          return (
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
          );
        }
      )}
    </>
  );
};
