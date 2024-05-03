import { View } from "react-native";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
import { Input, TextInput } from "../../atoms";
import { Controller } from "react-hook-form";
import { RFValue } from "react-native-responsive-fontsize";

export const FormControl = ({
  inputProps,
  control,
  name,
  iconName,
  label,
  error = null,
  defaultFormControl,
  password,
  ...extraProps
}) => {
  const theme = useTheme();
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value, ref } }) => {
        return (
          <Input
            {...inputProps}
            {...extraProps}
            ref={ref}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            defaultValue={value}
            style={styles.input}
          />
        );
      }}
      name={name}
    />
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  baseStyle: {
    backgroundColor: theme.colors.primary[500],
  },
  input: {
    backgroundColor: theme.colors.grey[300],
    fontSize: RFValue(16),
    fontFamily: fonts.primary_500,
    color: theme.colors.text,
    paddingLeft: RFValue(48),
    paddingRight: RFValue(12),
    height: RFValue(48),
    borderRadius: RFValue(12),
    width: "100%",
  },
}));
