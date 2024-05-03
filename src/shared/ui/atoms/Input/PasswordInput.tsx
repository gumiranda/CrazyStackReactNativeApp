import { TextInputProps, View } from "react-native";
import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import { forwardRef, useState } from "react";
import { MaterialIcon } from "../MaterialIcon";
import { BaseInput } from "./Input";
import { BorderlessButton } from "react-native-gesture-handler";
interface Props extends TextInputProps {
  iconName: string;
  value?: string;
  mask?: string;
  options?: any;
  type?: string;
}

export const PasswordInput_ = ({ iconName, value, onBlur, ...rest }: Props, ref) => {
  const theme = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
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
            color={theme.colors.text}
            size={24}
          />
        </View>
      </BorderlessButton>
    </View>
  );
};

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
    backgroundColor: !theme.dark ? theme.colors.grey[200] : theme.colors.grey[800],
    borderRadius: 8,
    marginRight: 1,
  },
  isFocused: { borderBottomWidth: 2, borderBottomColor: theme.colors.text },
}));
export const PasswordInput = forwardRef(PasswordInput_);
