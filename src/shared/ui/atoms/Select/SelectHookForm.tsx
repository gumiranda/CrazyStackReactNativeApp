import { View, Text } from "react-native";
import { Controller } from "react-hook-form";
import { DynamicStyleSheet } from "@/shared/libs/utils";
import { Select } from "./Select";
import appMetrics from "@/shared/libs/functions/metrics";
export const SelectHookForm = ({
  control,
  list,
  defaultValue,
  placeholder,
  keyValue,
  keyLabel,
  errors,
  name,
  label,
  extraOnChange,
}) => {
  return (
    <View style={styles.containerSelect}>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Select
            options={list}
            onSelect={onChange}
            placeholder={placeholder}
            selectedValue={value}
            keyValue={keyValue}
            keyLabel={keyLabel}
            label={label}
            extraOnChange={extraOnChange}
          />
        )}
      />
      {errors[name] && <Text style={styles.errorMessage}>{errors[name].message}</Text>}
    </View>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  button: {
    width: appMetrics.SCREEN_WIDTH * 0.9,
    alignSelf: "center",
  },
  errorMessage: {
    color: theme.colors.error[500],
    fontSize: 14,
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  containerSelect: {
    marginHorizontal: 16,
  },
}));
