import { Modal, ScrollView, TouchableOpacity, View } from "react-native";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
import { useState } from "react";
import { TextAtom } from "../TextAtom";
import { Ionicons } from "@expo/vector-icons"; // Importe o ícone do Expo
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import { Controller } from "react-hook-form";
import { Select } from "./Select";

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
    <View style={styles.baseStyle} data-testid="SelectHookFormTestId">
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
    </View>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  baseStyle: {
    backgroundColor: theme.colors.background,
    marginVertical: 5,
  },
  selectButtonText: {
    marginVertical: 8,
    fontSize: RFValue(16),
    fontFamily: fonts.primary_400,
    color: theme.colors.text,
  },
  selectButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: theme.colors.grey[300],
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    marginTop: getStatusBarHeight(),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
    marginTop: 4,
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    padding: 20,
    borderRadius: 4,
  },
  option: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey[300],
  },
}));
