import { SignUpFormStep1 } from "@/features/signup/by-email/ui";
import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { BackButton, TextAtom } from "@/shared/ui";
import { View } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";

export const SignUp = ({ props: { name, role, goToLogin, nextStep } }) => {
  return (
    <>
      <SignUpFormStep1
        name={name}
        role={role}
        goToLogin={goToLogin}
        nextStep={nextStep}
      />
    </>
  );
};
const Header = ({ props: { handleBack, title, subtitle, children = null } }) => {
  return (
    <View style={styles.header}>
      <BackButton onPress={handleBack} />
      <TextAtom style={styles.title}>{title}</TextAtom>
      <TextAtom style={styles.subtitle}>{subtitle}</TextAtom>
      {children}
    </View>
  );
};
SignUp.Header = Header;
const styles = DynamicStyleSheet.create((theme) => ({
  header: {
    width: "100%",
    marginTop: getStatusBarHeight() + 105,
  },
  title: {
    color: theme.colors.text,
    fontFamily: fonts.secondary_600,
    fontSize: RFValue(40),
    marginTop: 16,
  },
  subtitle: {
    color: theme.colors.text,
    fontFamily: fonts.primary_400,
    fontSize: RFValue(15),
    marginTop: 16,
  },
}));
