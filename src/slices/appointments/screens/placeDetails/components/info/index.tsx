import { IconProps } from "@tabler/icons-react-native";
import { View, Text } from "react-native";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";

type Props = {
  description: string;
  icon: React.ComponentType<IconProps>;
};

export function Info({ icon: Icon, description }: Props) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Icon size={20} color={theme.colors.gray[600]} />
      <Text style={styles.text}>{description}</Text>
    </View>
  );
}
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    color: theme.colors.gray[600],
    fontFamily: fonts.primary_400,
    fontSize: 14,
    lineHeight: 22.4,
    flex: 1,
  },
}));
