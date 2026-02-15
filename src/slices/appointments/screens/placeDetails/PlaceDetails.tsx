//import { useRoute } from "@react-navigation/native";
import { Alert, Modal, ScrollView, StatusBar, View } from "react-native";
import { DynamicStyleSheet } from "@/shared/libs/utils";
import { useRef, useState } from "react";
import { Button, Loading } from "@/shared/ui";
import { Cover } from "./components/cover";
import { Details } from "./components/details";
import { Coupon } from "./components/coupon";
import { CameraView, useCameraPermissions } from "expo-camera";
import { api } from "@/shared/api";

export const PlaceDetails = ({ route }) => {
  const place = route?.params?.place;
  const [coupon, setCoupon] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);
  const [couponIsFetching, setCouponIsFetching] = useState(false);
  const qrLock = useRef(false);
  const [_, requestPermission] = useCameraPermissions();
  const [scannedQRCode, setScannedQRCode] = useState<string | null>(null);

  const handleOpenCamera = async () => {
    try {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert("Permissão necessária", "Permita o acesso à câmera");
        return;
      }
      qrLock.current = false;
      setIsVisibleCameraModal(true);
    } catch (error) {
      Alert.alert("Câmera", "Não foi possível utilizar a câmera");
    }
  };
  async function getCoupon(id: string) {
    const sanitizedId = encodeURIComponent(id);
    try {
      setScannedQRCode(id);
      setCouponIsFetching(true);
      setIsLoading(true);
      const { data } = await api.patch(`/coupons/${sanitizedId}`);

      Alert.alert("Cupom", data.coupon);
      setCoupon(data?.coupon);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível utilizar o cupom");
    } finally {
      setCouponIsFetching(false);
      setIsLoading(false);
    }
  }
  function handleUseCoupon(id: string) {
    setIsVisibleCameraModal(false);
    if (scannedQRCode === id) {
      Alert.alert(
        "Cupom",
        "Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?",
        [
          { style: "cancel", text: "Não" },
          { text: "Sim", onPress: () => getCoupon(id) },
        ]
      );
    } else {
      getCoupon(id);
    }
  }
  if (isLoading) {
    return <Loading />;
  }
  if (!place) return null;
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={isVisibleCameraModal} />
      <ScrollView>
        <Cover
          uri={
            place?.cover ??
            "https://images.unsplash.com/photo-1619367901998-73b3a70b3898?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
        <Details place={place} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>
      <View style={styles.buttonView}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>
      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              setTimeout(() => handleUseCoupon(data), 500);
            }
          }}
        />
        <View style={styles.bottomView}>
          <Button
            onPress={() => setIsVisibleCameraModal(false)}
            loading={couponIsFetching}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[100],
  },
  buttonView: {
    padding: 32,
  },
  bottomView: {
    position: "absolute",
    bottom: 32,
    left: 32,
    right: 32,
  },
}));
