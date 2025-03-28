import { DynamicStyleSheet } from "@/shared/libs/utils";
import { Button } from "@/shared/ui";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Welcome } from "./components/Welcome";
import { Steps } from "./components/Steps";
import { StatusBar } from "expo-status-bar";

export const GetStarted = () => {
  const navigation = useNavigation();
  function handleNextGetStarted() {
    navigation.navigate("HomeClient");
  }
  return (
    <View style={styles.container}>
      <Welcome />
      <Steps />
      <Button onPress={handleNextGetStarted}>
        <Button.Title>Começar</Button.Title>
      </Button>
      <StatusBar style="auto" />
    </View>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  container: { flex: 1, padding: 40, gap: 40, backgroundColor: theme.colors.background },
}));
