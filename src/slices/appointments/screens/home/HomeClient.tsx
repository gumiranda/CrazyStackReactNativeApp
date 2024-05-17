import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { NavigationButton, ProfileHeader, TextAtom, ViewField } from "@/shared/ui";
import NearbyItem from "@/shared/ui/molecules/NearbyItem/NearbyItem";
import { ScrollView, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const HomeClient = () => {
  return (
    <View style={styles.container}>
      <ProfileHeader
        name="Olá, Ana 👋"
        address="Rua das Palmeiras, 478"
        avatar={require("@/assets/avatar.png")}
      />
      <ScrollView>
        <View style={styles.navigationSection}>
          <TextAtom style={styles.sectionTitle}>Onde deseja navegar hoje?</TextAtom>
          <ScrollView horizontal contentContainerStyle={styles.navigationButtons}>
            <NavigationButton
              label="Salões de beleza"
              icon={require("@/assets/saloes.png")}
              onPress={() => {}}
            />
            <NavigationButton
              label="Barbearias"
              icon={require("@/assets/barbearias.png")}
              onPress={() => {}}
            />
            <NavigationButton
              label="Clínicas de estética"
              icon={require("@/assets/clinicas.png")}
              onPress={() => {}}
            />
            <NavigationButton
              label="Salões infantis"
              icon={require("@/assets/infantis.png")}
              onPress={() => {}}
            />
          </ScrollView>
        </View>
        <View style={styles.favoritesSection}>
          <TextAtom style={styles.sectionTitle}>Meus favoritos</TextAtom>
          <ScrollView horizontal contentContainerStyle={styles.navigationButtons}>
            <NavigationButton
              label="Salões fulana"
              icon={require("@/assets/saloes.png")}
              onPress={() => {}}
            />
            <NavigationButton
              label="Barbearias medeiros"
              icon={require("@/assets/barbearias.png")}
              onPress={() => {}}
            />
            <NavigationButton
              label="Clínicas de estética tabajaras"
              icon={require("@/assets/clinicas.png")}
              onPress={() => {}}
            />
            <NavigationButton
              label="Salões infantis"
              icon={require("@/assets/infantis.png")}
              onPress={() => {}}
            />
          </ScrollView>
        </View>
        <View style={styles.nearbySection}>
          <TextAtom style={styles.sectionTitle}>Espaços perto de você</TextAtom>
          <NearbyItem
            name="Espaço Bem Me Quero"
            distance="0.5km"
            rating={4.0}
            image={require("@/assets/espaco.png")}
          />
          <NearbyItem
            name="Barbearia do João"
            distance="1.5km"
            rating={3.5}
            image={require("@/assets/barbearia.png")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  navigationSection: {
    padding: 18,
  },
  navigationButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  favoritesSection: {
    padding: 10,
  },
  nearbySection: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: RFValue(13),
    fontFamily: fonts.primary_500,
    color: theme.colors.text,
    marginBottom: 10,
    textAlign: "left",
    marginLeft: 10,
  },
}));

export default HomeClient;
