import { Image } from "react-native";
import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { ViewField } from "../ViewField";
import { TextAtom } from "../../atoms";
import { RFValue } from "react-native-responsive-fontsize";

export const ProfileHeader = ({ name, address, avatar, style = {}, ...rest }) => (
  <ViewField style={[styles.profileHeader, style]} {...rest}>
    <Image source={avatar} style={styles.avatar} />
    <ViewField style={styles.view}>
      <TextAtom style={styles.name}>{name}</TextAtom>
      <TextAtom style={styles.address}>{address}</TextAtom>
    </ViewField>
  </ViewField>
);
const styles = DynamicStyleSheet.create((theme) => ({
  view: { flexDirection: "column", alignItems: "flex-start" },
  profileHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
    backgroundColor: theme.colors.primary[600],
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    color: theme.colors.white,
    fontSize: RFValue(18),
    fontFamily: fonts.primary_700,
    textAlign: "left",
  },
  address: {
    textAlign: "left",
    color: theme.colors.background,
    fontSize: RFValue(14),
    fontFamily: fonts.primary_400,
  },
}));
