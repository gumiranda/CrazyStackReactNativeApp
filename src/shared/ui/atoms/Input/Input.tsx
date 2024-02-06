import React, { forwardRef, useState } from "react";
import { View, TextInput, TextInputProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialIcon } from "../MaterialIcon";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";

interface Props extends TextInputProps {
  iconName: string;
  value?: string;
}
const Input_ = ({ iconName, value, onBlur, ...props }: Props, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const theme = useTheme();
  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur(e) {
    setIsFocused(false);
    setIsFilled(!!value);
    onBlur(e);
  }
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, isFocused ? styles.isFocused : {}]}>
        <MaterialIcon
          type="Feather"
          name={iconName}
          size={24}
          color={isFocused || isFilled ? theme.colors.primary[500] : theme.colors.text}
        />
      </View>
      <TextInput
        ref={ref}
        style={[styles.inputText, isFocused ? styles.isFocused : {}]}
        onFocus={handleInputFocus}
        placeholderTextColor={theme.colors.text}
        {...props}
        onBlur={handleInputBlur}
      />
    </View>
  );
};
export const Input = forwardRef(Input_);
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    marginBottom: 8,
  },
  iconContainer: {
    height: 56,
    width: 55,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 1,
    backgroundColor: !theme.dark ? theme.colors.grey[200] : theme.colors.grey[300],
    borderRadius: 4,
  },
  isFocused: { borderBottomWidth: 2, borderBottomColor: theme.colors.main },
  inputText: {
    flex: 1,
    backgroundColor: !theme.dark ? theme.colors.grey[200] : theme.colors.grey[300],
    color: theme.colors.title,
    fontFamily: fonts.primary_400,
    fontSize: RFValue(15),
    paddingVertical: 0,
    paddingHorizontal: 23,
  },
}));
