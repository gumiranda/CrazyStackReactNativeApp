import React, { forwardRef, useState } from "react";
import { View, TextInputProps } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import { MaterialIcon } from "../MaterialIcon";
import { BaseInput } from "./Input";

interface Props extends TextInputProps {
  iconName: string;
  value?: string;
}
const PasswordInput_ = ({ iconName, value, onBlur, ...rest }: Props, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
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

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  return (
    <View style={styles.container}>
      <BaseInput
        ref={ref}
        isFocused={isFocused}
        iconName={iconName}
        isFilled={isFilled}
        handleInputBlur={handleInputBlur}
        handleInputFocus={handleInputFocus}
        autoCorrect={false}
        placeholderTextColor={theme.colors.text}
        {...rest}
        secureTextEntry={isPasswordVisible}
      />
      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <View style={[styles.iconContainer, isFocused ? styles.isFocused : {}]}>
          <MaterialIcon
            type="Feather"
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text}
          />
        </View>
      </BorderlessButton>
    </View>
  );
};
export const PasswordInput = forwardRef(PasswordInput_);

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
    marginRight: 2,
    backgroundColor: !theme.dark ? theme.colors.grey[200] : theme.colors.grey[800],
  },
  isFocused: { borderBottomWidth: 2, borderBottomColor: theme.colors.text },
}));
