import React, { ReactNode } from "react";
import { View } from "react-native";
import { useStepView } from "./StepView.hook";
import StepIndicator from "react-native-step-indicator";
import appMetrics from "@/shared/libs/functions/metrics";
import { DynamicStyleSheet } from "@/shared/libs/utils";

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

const styles = DynamicStyleSheet.create(() => ({
  container: {
    flex: 1,
    width: appMetrics.SCREEN_WIDTH * 0.9,
    marginTop: 16,
  },
}));
