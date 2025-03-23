import { IconTicket } from "@tabler/icons-react-native";
import { View, Text } from "react-native";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";

type Props = {
  code: string;
};

export function Coupon({ code }: Props) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cupom de desconto</Text>
      <View style={styles.content}>
        <IconTicket size={24} color={theme.colors.primary[300]} />
        <Text style={styles.code}>{code}</Text>
      </View>
    </View>
  );
}
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    paddingHorizontal: 32,
  },
  title: {
    color: theme.colors.gray[700],
    fontFamily: fonts.primary_500,
    marginBottom: 12,
    fontSize: 14,
  },
  content: {
    flexDirection: "row",
    backgroundColor: theme.colors.primary[600],
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    gap: 10,
  },
  code: {
    color: theme.colors.grey[100],
    fontSize: 16,
    fontFamily: fonts.primary_600,
    textTransform: "uppercase",
  },
}));
