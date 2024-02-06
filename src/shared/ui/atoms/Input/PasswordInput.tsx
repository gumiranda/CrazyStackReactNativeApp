import React, { forwardRef, useState } from "react";
import { View, TextInput, TextInputProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { BorderlessButton } from "react-native-gesture-handler";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
import { MaterialIcon } from "../MaterialIcon";

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
        onBlur={handleInputBlur}
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
    backgroundColor: !theme.dark ? theme.colors.grey[200] : theme.colors.grey[600],
  },
  isFocused: { borderBottomWidth: 2, borderBottomColor: theme.colors.primary },
  inputText: {
    flex: 1,
    backgroundColor: !theme.dark ? theme.colors.grey[200] : theme.colors.grey[600],
    color: theme.colors.text,
    fontFamily: fonts.secondary_500,
    fontSize: RFValue(15),
    paddingVertical: 0,
    paddingHorizontal: 23,
  },
}));
