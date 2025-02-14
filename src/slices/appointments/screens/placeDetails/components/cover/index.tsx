import { ImageBackground, View } from "react-native";
import { IconArrowLeft } from "@tabler/icons-react-native";
import { Button } from "@/shared/ui";
import { DynamicStyleSheet } from "@/shared/libs/utils";
import { useNavigation } from "@react-navigation/native";

type CoverProps = {
  uri: string;
};

export function Cover({ uri }: CoverProps) {
  const navigation = useNavigation();
  return (
    <ImageBackground source={{ uri }} style={styles.container}>
      <View style={styles.header}>
        <Button
          style={{ width: 40, height: 40 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Button.Icon icon={IconArrowLeft} />
        </Button>
      </View>
    </ImageBackground>
  );
}
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    width: "100%",
    height: 232,
    marginBottom: -32,
    backgroundColor: theme.colors.gray[200],
  },
  header: {
    padding: 24,
    paddingTop: 22,
  },
}));
