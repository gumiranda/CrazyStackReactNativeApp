import { View } from "react-native";
import { DynamicStyleSheet } from "@/shared/libs/utils";
import { useStepView } from "./StepView.hook";
import StepIndicator from "react-native-step-indicator";
import appMetrics from "@/shared/libs/functions/metrics";
type StepViewProps = {
  header?: React.ReactNode;
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
    <View style={styles.baseStyle} data-testid="StepViewTestId">
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        labels={null}
        stepCount={stepCount}
        onPress={onStepPress}
      />
      {header}
    </View>
  );
};
const styles = DynamicStyleSheet.create(() => ({
  baseStyle: {
    flex: 1,
    width: appMetrics.SCREEN_WIDTH * 0.9,
    marginTop: 16,
  },
}));
