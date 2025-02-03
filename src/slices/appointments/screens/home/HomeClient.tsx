import { api2 } from "@/shared/api";
import { useEffect, useState } from "react";
import { Alert, View, Text } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";

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
  return <></>;
};
