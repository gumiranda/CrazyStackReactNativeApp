import { TextInputProps, View } from "react-native";
import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { forwardRef, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { TextInput } from "./TextInput";
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
      <TextInput
        {...props}
        ref={ref}
        style={styles.baseStyle}
        data-testid="InputTestId"
      ></TextInput>
    </View>
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
    fontSize: RFValue(15),
  },
}));
export const Input = forwardRef(Input_);
