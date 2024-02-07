import React from "react";
import { ActivityIndicator } from "react-native";
import { TextAtom } from "@/shared/ui/atoms/TextAtom";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButtonProps, RectButton } from "react-native-gesture-handler";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
export interface ButtonProps extends RectButtonProps {
  title: string;
  color: string;
  loading?: boolean;
  enabled?: boolean;
  onPress: () => void;
  backgroundColor: string;
  style?: any;
}
export const Button = ({
  title,
  backgroundColor,
  color,
  onPress,
  enabled = true,
  loading = false,
  style,
}: ButtonProps) => {
  const theme = useTheme();
  return (
    <RectButton
      onPress={onPress}
      enabled={enabled}
      style={[
        { opacity: enabled === false || loading === true ? 0.5 : 1 },
        styles.container,
        { backgroundColor, ...style },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.primary[500]} />
      ) : (
        <TextAtom style={[styles.title, { color }]}>{title}</TextAtom>
      )}
    </RectButton>
  );
};

const styles = DynamicStyleSheet.create(() => ({
  container: {
    marginBottom: 8,
    width: "100%",
    padding: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: fonts.secondary_600,
    fontSize: RFValue(15),
  },
}));
