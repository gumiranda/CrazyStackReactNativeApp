import { TextInputProps, View } from "react-native";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
import { forwardRef, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { TextInput } from "./TextInput";
import { MaterialIcon } from "../MaterialIcon";
interface Props extends TextInputProps {
  iconName: string;
  value?: string;
  mask?: string;
  options?: any;
  type?: string;
}

export const Input_ = ({ iconName, value, onBlur, ...props }: Props, ref) => {
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
  return (
    <View style={styles.container}>
      <BaseInput
        ref={ref}
        isFocused={isFocused}
        iconName={iconName}
        handleInputBlur={handleInputBlur}
        handleInputFocus={handleInputFocus}
        isFilled={isFilled}
        {...props}
      />
    </View>
  );
};
export const BaseInput_ = (
  { isFocused, iconName, isFilled, handleInputFocus, handleInputBlur, ...props },
  ref
) => {
  const theme = useTheme();
  return (
    <>
      <View style={[styles.iconContainer, isFocused ? styles.isFocused : {}]}>
        <MaterialIcon
          type="Feather"
          name={iconName}
          size={24}
          color={isFocused || isFilled ? theme.colors.text : theme.colors.text}
        />
      </View>
      <TextInput
        ref={ref}
        style={[styles.baseStyle, isFocused ? styles.isFocused : {}]}
        onFocus={handleInputFocus}
        placeholderTextColor={theme.colors.text}
        onBlur={handleInputBlur}
        {...props}
      />
    </>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    marginBottom: 8,
  },
  baseStyle: {
    flex: 1,
    backgroundColor: !theme.dark ? theme.colors.grey[200] : theme.colors.grey[800],
    color: theme.colors.text,
    fontFamily: fonts.secondary_500,
    fontSize: RFValue(15),
    paddingVertical: 0,
    paddingHorizontal: 23,
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
export const Input = forwardRef(Input_);
export const BaseInput = forwardRef(BaseInput_);
