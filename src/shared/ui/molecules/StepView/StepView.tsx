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
  stepCount: number;
};

export const StepView = ({
  stepCount,
  header,
  currentPosition,
  onStepPress,
}: StepViewProps) => {
  const { customStyles } = useStepView();
  return (
    <View style={styles.container}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        stepCount={stepCount}
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
    width: appMetrics.SCREEN_WIDTH * 0.9,
    marginTop: 16,
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
