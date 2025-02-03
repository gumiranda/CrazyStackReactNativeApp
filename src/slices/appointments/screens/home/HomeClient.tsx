import { api2 } from "@/shared/api";
import { useEffect, useState } from "react";
import { Alert, View, Text } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { fonts, useTheme } from "@/shared/libs/utils";

export type CategoryProps = {
  id: string;
  name: string;
}[];
export type PlaceProps = {
  id: string;
  name: string;
  description: string;
  coupons: number;
  cover: string;
  address: string;
};
type MarketProps = PlaceProps & {
  latitude: number;
  longitude: number;
};

export const HomeClient = () => {
  const theme = useTheme();
  const [categories, setCategories] = useState<CategoryProps>([]);
  const [category, setCategory] = useState<string>("");
  const [markets, setMarkets] = useState<MarketProps[]>([]);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  async function fetchCategories() {
    try {
      const { data } = await api2.get("/categories");
      setCategories(data);
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
      console.log(location);
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
      const { data } = await api2.get(`/markets/category/${category}`);
      setMarkets(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar os mercados");
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#cecece" }}>
      {/* <Categories
        data={categories}
        selected={category}
        onSelect={(id) => setCategory(id)}
      /> */}
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
          {markets.map((market) => (
            <Marker
              key={market.id}
              identifier={market.id}
              coordinate={{
                latitude: market.latitude,
                longitude: market.longitude,
              }}
              image={require("@/assets/pin.png")}
            >
              <Callout
                onPress={() => {
                  // @ts-ignore
                  router.navigate(`market/${market.id}`);
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
                    {market.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: theme.colors.gray[600],
                      fontFamily: fonts.poppins_400,
                    }}
                  >
                    {market.address}
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
