import {
  TouchableOpacity,
  Image,
  Text,
  View,
  type TouchableOpacityProps,
} from "react-native";
import { IconTicket } from "@tabler/icons-react-native";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
type PlaceProps = {
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
  return <></>;
}

const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    height: 36,
    backgroundColor: theme.colors.gray[100],
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    flexDirection: "row",
    gap: 10,
  },
  name: {
    fontSize: 14,
    color: theme.colors.gray[700],
    fontFamily: fonts.primary_400,
  },
  containerSelected: {
    backgroundColor: theme.colors.primary[500],
    borderColor: theme.colors.primary[500],
  },
  nameSelected: { color: theme.colors.grey[100] },
}));
