import { View, Text } from "react-native";
import { IconPhone, IconMapPin, IconTicket } from "@tabler/icons-react-native";

import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { Info } from "../info";

export type PropsDetails = {
  name: string;
  description: string;
  address: string;
  phone: string;
  coupons: number;
  rules: {
    id: string;
    description: string;
  }[];
};

type Props = {
  data: PropsDetails;
};

export function Details({ data }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.description}>{data.description}</Text>
      <View style={styles.group}>
        <Text style={styles.title}>Informações</Text>
        <Info
          icon={IconTicket}
          description={`${data?.coupons ?? 0} cupons disponíveis`}
        />
        <Info icon={IconMapPin} description={data.address} />
        <Info icon={IconPhone} description={data.phone} />
      </View>
      {data?.rules?.length > 0 && (
        <View style={styles.group}>
          <Text style={styles.title}>Regras</Text>
          {data?.rules?.map?.((rule) => (
            <Text key={rule.id} style={styles.rule}>
              {`\u2022 ${rule.description}`}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    padding: 32,
    paddingBottom: 0,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: theme.colors.gray[100],
  },
  name: { fontFamily: fonts.primary_700, fontSize: 20, color: theme.colors.gray[700] },
  description: {
    fontSize: 16,
    fontFamily: fonts.primary_400,
    color: theme.colors.gray[600],
    marginTop: 12,
    marginBottom: 32,
    lineHeight: 22,
  },
  group: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
    paddingBottom: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.primary_500,
    color: theme.colors.gray[600],
    marginBottom: 12,
  },
  rule: {},
}));
