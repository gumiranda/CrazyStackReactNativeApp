import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native";
import { View, Text } from "react-native";
import { Info } from "../info";
import { RFValue } from "react-native-responsive-fontsize";

export const Details = ({ place }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{place.name}</Text>
      <Text style={styles.description}>{place.description}</Text>
      <View style={styles.group}>
        <Text style={styles.groupTitle}>Informações</Text>
        <Info
          icon={IconTicket}
          description={`${place?.coupons ?? 0} cupons disponíveis`}
        />
        <Info icon={IconMapPin} description={place.address} />
        <Info icon={IconPhone} description={place.phone} />
      </View>
    </View>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    padding: 32,
    paddingBottom: 0,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: theme.colors.gray[100],
  },
  name: {
    fontSize: RFValue(22),
    fontFamily: fonts.primary_600,
    color: theme.colors.gray[700],
  },
  description: {
    fontSize: RFValue(14),
    fontFamily: fonts.primary_400,
    color: theme.colors.gray[600],
    marginTop: 12,
    marginBottom: 24,
    lineHeight: RFValue(22),
  },
  group: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
    paddingBottom: 16,
    marginBottom: 16,
  },
  groupTitle: {
    fontSize: RFValue(16),
    fontFamily: fonts.primary_600,
    color: theme.colors.gray[600],
    marginBottom: 12,
  },
}));
