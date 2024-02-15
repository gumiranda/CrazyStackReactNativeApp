import appMetrics from "@/shared/libs/functions/metrics";
import { useTheme } from "@/shared/libs/utils";

export const useStepView = () => {
  const theme = useTheme();
  const customStyles = {
    stepIndicatorSize: 20,
    currentStepIndicatorSize: 25,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: theme.colors.tertiary[300],
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: theme.colors.tertiary[300],
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: theme.colors.tertiary[300],
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: theme.colors.tertiary[300],
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: appMetrics.FONT_SIZE * 0.6,
    currentStepIndicatorLabelFontSize: appMetrics.FONT_SIZE * 0.6,
    stepIndicatorLabelCurrentColor: theme.colors.tertiary[300],
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: theme.colors.tertiary[300],
  };

  return { customStyles };
};
