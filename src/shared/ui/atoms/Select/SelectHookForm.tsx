import { Modal, ScrollView, TouchableOpacity, View } from "react-native";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import { Controller } from "react-hook-form";
import { Select } from "./Select";
import { TextAtom } from "../TextAtom";
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
  haveLoadMore = true,
}) => {
  return (
    <View style={styles.container} data-testid="SelectHookFormTestId">
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => {
          return (
            <Select
              options={list}
              onSelect={onChange}
              placeholder={placeholder}
              selectedValue={value}
              keyLabel={keyLabel}
              keyValue={keyValue}
              label={label}
              extraOnChange={extraOnChange}
              haveLoadMore={haveLoadMore}
            />
          );
        }}
      />
      {errors[name] && (
        <TextAtom style={styles.errorMessage}>{errors[name].message}</TextAtom>
      )}
    </View>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  errorMessage: {
    color: theme.colors.error[500],
    fontSize: RFValue(12),
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  containerSelect: {
    marginHorizontal: 16,
  },
}));
