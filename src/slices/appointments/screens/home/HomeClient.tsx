import { api } from "@/shared/api";
import { useEffect, useState } from "react";
import { Alert, View, Text } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { fonts, useTheme } from "@/shared/libs/utils";
import { Categories } from "./components/organisms/categories";

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
  const theme = useTheme();
  const [categories, setCategories] = useState<CategoryProps>([]);
  const [category, setCategory] = useState<string>("");
  const [markets, setMarkets] = useState<any[]>([]);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  async function fetchCategories() {
    try {
      const { data } = await api.get(
        "/categoryPlace/loadByPage?page=1&sortBy=name&typeSort=asc"
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
    fetchMarkets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
  async function fetchMarkets() {
    try {
      if (!category) return;
      const { data } = await api.get(
        `/place/loadByPage?page=1&categoryPlaceId=${category}`
      );
      setMarkets(data?.places);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar os mercados");
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#cecece" }}>
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
          {markets?.map?.((market) => (
            <Marker
              key={market?._id}
              identifier={market?._id}
              coordinate={{
                latitude: market?.coord?.coordinates?.[0],
                longitude: market?.coord?.coordinates?.[1],
              }}
              image={require("@/assets/pin.png")}
            >
              <Callout
                onPress={() => {
                  // @ts-ignore
                  //router.navigate(`market/${market._id}`);
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: theme.colors.gray[600],
                      fontFamily: fonts.poppins_500,
                    }}
                  >
                    {market?.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: theme.colors.gray[600],
                      fontFamily: fonts.poppins_400,
                    }}
                  >
                    {market?.address}
                  </Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
      {/* <Places data={markets} /> */}
    </View>
  );
};
