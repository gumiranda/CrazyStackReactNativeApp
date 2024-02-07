/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HeaderRegister } from "./components";
import { useNavigation } from "@react-navigation/native";
import { RegisterFormStep2 } from "@/features/signup/by-email/ui/RegisterFormStep2";
import { RegisterFormStep1 } from "@/features/signup/by-email/ui/RegisterFormStep1";
import { DynamicStyleSheet } from "@/shared/libs/utils";
import { useSignUp } from "@/app/providers";

export const Register = ({ title, subtitle }) => {
  const [step, setStep] = useState(1);
  const navigation = useNavigation();
  const { setEmail, setName, setPhone } = useSignUp();

  const goToLogin = () => {
    navigation.navigate("SignInPage");
  };

  const nextStep = () => {
    setStep(step + 1);
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return <RegisterFormStep1 nextStep={nextStep} goToLogin={goToLogin} />;
      case 2:
        return <RegisterFormStep2 goToLogin={goToLogin} />;
      default:
        return null;
    }
  };
  useEffect(() => {
    return () => {
      setEmail("");
      setName("");
      setPhone("");
    };
  }, []);
  return (
    <ScrollView style={styles.container}>
      <HeaderRegister
        headerText={title}
        subtitle={subtitle}
        handleBack={() => {
          if (step === 1) {
            navigation.goBack();
            return;
          }
          setStep((step) => step - 1);
        }}
      />
      {renderStep()}
      <StatusBar style={"inverted"} />
    </ScrollView>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background_secondary,
    paddingVertical: 0,
    paddingHorizontal: 24,
    height: "100%",
  },
}));
