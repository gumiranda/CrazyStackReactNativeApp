import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, View, Text } from "react-native";
import { Categories, type CategoryProps } from "./components/organisms/categories";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Places } from "./components/organisms/places";

export const HomeClient = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [category, setCategory] = useState<string>("");
  const [places, setPlaces] = useState<any[]>([]);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const token = " ";
  async function getCurrentLocation() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        Alert.alert("Permissão negada", "Você precisa permitir o acesso à localização");
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync();
      setCurrentLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível obter a localização atual");
    }
  }
  useEffect(() => {
    getCurrentLocation();
  }, []);
  return (
    <View style={styles.container}>
      <Categories
        data={categories}
        selected={category}
        onSelect={(id) => setCategory(id)}
      />
      {currentLocation && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            identifier="current"
            coordinate={currentLocation}
            image={require("@/assets/location.png")}
          />
          {places?.map?.((place) => (
            <Marker
              key={place?._id}
              identifier={place?._id}
              coordinate={{
                latitude: place?.coord?.coordinates?.[0],
                longitude: place?.coord?.coordinates?.[1],
              }}
              image={require("@/assets/pin.png")}
            >
              <Callout
                onPress={() => {
                  navigation.navigate("PlaceDetails", { place, name: place?.name });
                }}
              >
                <View>
                  <Text style={styles.placeName}>{place?.name}</Text>
                  <Text style={styles.placeAddress}>{place?.address}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
      <Places data={places} />
    </View>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  placeName: {
    fontSize: 14,
    color: theme.colors.gray[600],
    fontFamily: fonts.poppins_500,
  },
  placeAddress: {
    fontSize: 14,
    color: theme.colors.gray[600],
    fontFamily: fonts.poppins_400,
  },
}));
