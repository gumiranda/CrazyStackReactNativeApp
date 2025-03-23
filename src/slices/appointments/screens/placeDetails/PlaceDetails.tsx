//import { useRoute } from "@react-navigation/native";
import { Text, Alert, Modal, ScrollView, StatusBar, View } from "react-native";
import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { useRef, useState } from "react";
import { Button, Loading } from "@/shared/ui";
import { Cover } from "./components/cover";
import { Details } from "./components/details";
import { Coupon } from "./components/coupon";
import { CameraView, useCameraPermissions } from "expo-camera";

export const PlaceDetails = ({ route }) => {
  const place = route?.params?.place;
  const [coupon, setCoupon] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);
  const [couponIsFetching, setCouponIsFetching] = useState(false);
  const qrLock = useRef(false);
  const [_, requestPermission] = useCameraPermissions();
  const handleUseCoupon = (data) => {
    console.log(data);
  };
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
            // place?.cover ??
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
