import React, { ReactNode } from "react";
import { View } from "react-native";
import { useStepView } from "./StepView.hook";
import StepIndicator from "react-native-step-indicator";
import appMetrics from "@/shared/libs/functions/metrics";
import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { TextAtom } from "../../atoms/TextAtom";
import { RFValue } from "react-native-responsive-fontsize";

type StepViewProps = {
  header?: ReactNode;
  currentPosition: number;
  onStepPress: (position: number) => void;
};

export const StepView = ({ header, currentPosition, onStepPress }: StepViewProps) => {
  const { customStyles } = useStepView();
  return (
    <View style={styles.container}>
      <TextAtom style={styles.title}>Belezix</TextAtom>
      <TextAtom style={styles.subtitle}>agendamentos online</TextAtom>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        stepCount={4}
        labels={null}
        onPress={onStepPress}
      />
      {header}
    </View>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    flex: 1,
    padding: appMetrics.PADDING,
    width: appMetrics.SCREEN_WIDTH * 0.9,
    backgroundColor: theme.colors.background,
  },
  subtitle: {
    color: "white",
    textAlign: "center",
    fontFamily: fonts.primary_400,
    fontSize: RFValue(15),
    marginBottom: 15,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: fonts.primary_400,
    fontSize: RFValue(22),
  },
  text: {
    color: "white",
    textAlign: "center",
    fontFamily: fonts.primary_400,
    fontSize: RFValue(15),
  },
  button: {
    width: appMetrics.SCREEN_WIDTH * 0.9,
    alignSelf: "center",
  },
}));
