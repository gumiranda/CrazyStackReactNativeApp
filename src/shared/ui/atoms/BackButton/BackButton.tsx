import React from "react";
import { MaterialIcon } from "../MaterialIcon";
import { BorderlessButton } from "react-native-gesture-handler";
import { useTheme } from "@/shared/libs/utils";
interface Props {
  color?: string;
  onPress: () => void;
}
export const BackButton = ({ color, onPress, ...rest }: Props) => {
  const theme = useTheme();
  return (
    <BorderlessButton onPress={onPress} {...rest}>
      <MaterialIcon
        name="chevron-left"
        size={32}
        color={color ? color : theme.colors.text}
      />
    </BorderlessButton>
  );
};
