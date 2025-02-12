import {
  TouchableOpacity,
  Image,
  Text,
  View,
  type TouchableOpacityProps,
} from "react-native";
import { IconTicket } from "@tabler/icons-react-native";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
export type PlaceProps = {
  _id: string;
  name: string;
  description: string;
  coupons: number;
  cover: string;
  address: string;
};
type Props = TouchableOpacityProps & {
  data: PlaceProps;
};

export function Place({ data, ...rest }: Props) {
  const theme = useTheme();
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Image style={styles.image} source={{ uri: data.cover }} />
      <View style={styles.content}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {data.description}
        </Text>
        <View style={styles.footer}>
          <IconTicket size={16} color={theme.colors.error[500]} />
          <Text style={styles.tickets}>{data?.coupons ?? 0} cupons disponíveis</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    height: 120,
    backgroundColor: theme.colors.gray[100],
    width: "100%",
    padding: 8,
    borderwidth: 1,
    borderColor: theme.colors.gray[200],
    borderRadius: 12,
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  image: {
    width: 116,
    height: 104,
    backgroundColor: theme.colors.gray[200],
    borderRadius: 8,
  },
  content: { flex: 1, gap: 4 },
  name: {
    fontSize: 14,
    fontFamily: fonts.primary_500,
    color: theme.colors.gray[700],
  },
  description: {
    fontSize: 12,
    fontFamily: fonts.primary_400,
    color: theme.colors.gray[600],
  },
  footer: { flexDirection: "row", gap: 8, marginTop: 10 },
  tickets: {
    fontSize: 12,
    fontFamily: fonts.primary_400,
    color: theme.colors.gray[600],
  },
}));
