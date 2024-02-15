import appMetrics from "@/shared/libs/functions/metrics";
import { fonts, useTheme } from "@/shared/libs/utils";

export const useStepView = () => {
  const theme = useTheme();
  const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    stepIndicatorLabelFontSize: appMetrics.FONT_SIZE,
    labelSize: appMetrics.FONT_SIZE,
    currentStepIndicatorLabelFontSize: appMetrics.FONT_SIZE,
    labelColor: theme.colors.white,
    separatorStrokeWidth: 3,
    separatorStrokeUnfinishedWidth: 0,
    currentStepStrokeWidth: 3,
    stepStrokeWidth: 3,
    stepIndicatorUnFinishedColor: theme.colors.white,
    stepIndicatorFinishedColor: theme.colors.tertiary[400],
    stepIndicatorLabelFinishedColor: theme.colors.white,
    stepIndicatorLabelUnFinishedColor: theme.colors.primary[600],
    separatorUnFinishedColor: theme.colors.grey[400],
    stepStrokeUnFinishedColor: theme.colors.white, //borda da bolinha incompleta
    separatorFinishedColor: theme.colors.tertiary[400],
    stepStrokeFinishedColor: theme.colors.tertiary[400],
    stepIndicatorCurrentColor: theme.colors.white,
    stepIndicatorLabelCurrentColor: theme.colors.tertiary[500],
    stepStrokeCurrentColor: theme.colors.tertiary[500],
    currentStepLabelColor: theme.colors.tertiary[500],
    labelFontFamily: fonts.primary_400,
  };

  return { customStyles };
};
