import { KeyboardAvoidingView } from "@/shared/ui";
import { SignIn } from "./templates/SignIn";
import { ScrollView } from "react-native";
import { DynamicStyleSheet } from "@/shared/libs/utils";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export const SignInPage = () => {
  const navigation = useNavigation();

  const goToHome = ({ role }) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: role === "owner" ? "HomePage" : "HomeClient",
          },
        ],
      })
    );
  };

  return (
    <>
      <KeyboardAvoidingView>
        <ScrollView style={styles.container}>
          <SignIn.Header
            props={{
              title: `Estamos${"\n"}quase lá.`,
              subtitle: ` Faça seu login para começar${"\n"} uma experiência incrível.`,
              handleBack: () => {
                navigation.goBack();
              },
            }}
          />
          <SignIn
            props={{
              goToHome,
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style={"auto"} />
    </>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 24,
    backgroundColor: theme.colors.background,
    height: "100%",
  },
}));
