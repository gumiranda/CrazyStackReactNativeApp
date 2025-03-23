import { DynamicStyleSheet } from "@/shared/libs/utils";
import { Button } from "@/shared/ui";
import { useNavigation } from "@react-navigation/native";
import { IconArrowLeft } from "@tabler/icons-react-native";
import { ImageBackground, Platform, View } from "react-native";

export const Cover = ({ uri }) => {
  const navigation = useNavigation();

  return (
    <ImageBackground source={{ uri }} style={styles.container}>
      <View style={styles.header}>
        <Button style={styles.backButton} onPress={() => navigation.goBack()}>
          <Button.Icon icon={IconArrowLeft} />
        </Button>
      </View>
    </ImageBackground>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    width: "100%",
    height: 200,
    backgroundColor: theme.colors.gray[100],
  },
  header: {
    padding: 24,
    paddingTop: Platform.OS === "ios" ? 52 : 32,
  },
  backButton: {
    width: 40,
    height: 40,
  },
}));
