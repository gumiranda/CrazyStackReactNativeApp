import {
  TouchableOpacity,
  Image,
  Text,
  View,
  type TouchableOpacityProps,
} from "react-native";
import { IconTicket } from "@tabler/icons-react-native";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
import type { PlaceProps } from "../../organisms/places";
import { RFValue } from "react-native-responsive-fontsize";

type Props = TouchableOpacityProps & {
  data: PlaceProps;
};

export function Place({ data, ...rest }: Props) {
  const theme = useTheme();
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Image style={styles.image} source={{ uri: data?.cover }} />
      <View style={styles.content}>
        <Text style={styles.name}>{data?.name}</Text>
        <Text style={styles.description}>{data?.description}</Text>
        <View style={styles.footer}>
          <IconTicket size={24} color={theme.colors.gray[700]} />
          <Text style={styles.footerText}>{data?.coupons ?? 0} disponíveis</Text>
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
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    borderRadius: 12,
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 116,
    height: 104,
    borderRadius: 8,
    backgroundColor: theme.colors.gray[200],
  },
  name: {
    fontSize: RFValue(13),
    fontFamily: fonts.primary_500,
    color: theme.colors.gray[700],
  },
  description: {
    fontSize: RFValue(11),
    fontFamily: fonts.primary_400,
    color: theme.colors.gray[600],
  },
  footer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  footerText: {
    fontSize: RFValue(10),
    fontFamily: fonts.primary_400,
    color: theme.colors.gray[600],
  },
  content: { flex: 1, gap: 4 },
}));
