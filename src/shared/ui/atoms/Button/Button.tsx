import React from "react";
import { ActivityIndicator, type TextProps } from "react-native";
import { TextAtom } from "@/shared/ui/atoms/TextAtom";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButtonProps, RectButton } from "react-native-gesture-handler";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
import type { IconProps as TablerIconProps } from "@tabler/icons-react-native";

export interface ButtonProps extends RectButtonProps {
  loading?: boolean;
  enabled?: boolean;
  onPress: () => void;
  backgroundColor?: string;
  style?: any;
}
export const Button = ({
  backgroundColor,
  onPress,
  enabled = true,
  loading = false,
  style,
  children,
}: ButtonProps) => {
  const theme = useTheme();
  return (
    <RectButton
      onPress={onPress}
      enabled={enabled}
      style={[
        { opacity: enabled === false || loading === true ? 0.5 : 1 },
        styles.container,
        { backgroundColor: backgroundColor ?? theme.colors.primary[500], ...style },
      ]}
    >
      {loading ? <ActivityIndicator color={theme.colors.primary[500]} /> : children}
    </RectButton>
  );
};
function Title({ children, color = "#fff", style }: TextProps & { color?: string }) {
  return <TextAtom style={[styles.title, { color }, style]}>{children}</TextAtom>;
}
function Icon({ icon: Icon }: IconProps) {
  const theme = useTheme();
  return <Icon size={24} color={theme.colors.grey[100]} />;
}
Button.Title = Title;
Button.Icon = Icon;
type IconProps = {
  icon: React.ComponentType<TablerIconProps>;
};
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    height: 56,
    maxHeight: 56,
    backgroundColor: theme.colors.primary[500],
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
  },
  title: {
    fontFamily: fonts.secondary_600,
    fontSize: RFValue(15),
    color: theme.colors.white,
  },
}));
