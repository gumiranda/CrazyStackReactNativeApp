import { api } from "@/shared/api";
import { useEffect, useState } from "react";
import { Alert, View, Text } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { Categories } from "./components/organisms/categories";
import { Places } from "./components/organisms/places";
import { useNavigation } from "@react-navigation/native";

export type CategoryProps = {
  _id: string;
  name: string;
}[];
export type PlaceProps = {
  id: string;
  name: string;
  description: string;
  cover: string;
  address: string;
};

export const HomeClient = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState<CategoryProps>([]);
  const [category, setCategory] = useState<string>("");
  const [places, setPlaces] = useState<any[]>([]);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const token = " ";
  async function fetchCategories() {
    try {
      const { data } = await api.get(
        "/public/categoryPlace/loadByPage?page=1&sortBy=name&typeSort=asc",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(data?.categoryPlaces);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar as categorias");
    }
  }
  async function getCurrentLocation() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        Alert.alert("Permissão negada", "Você precisa permitir o acesso à localização");
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível obter a localização atual");
    }
  }
  useEffect(() => {
    fetchCategories();
    getCurrentLocation();
  }, []);
  useEffect(() => {
    fetchPlaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
  async function fetchPlaces() {
    try {
      if (!category) return;
      const { data } = await api.get(
        `/public/place/loadByPage?page=1&categoryPlaceId=${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPlaces(data?.places);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar os mercados");
    }
  }
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
  container: { flex: 1, backgroundColor: "#cecece" },
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
