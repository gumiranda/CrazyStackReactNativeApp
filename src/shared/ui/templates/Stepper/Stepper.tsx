import { View } from "react-native";
import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { StepView } from "../../molecules";
import { RetangleBorded, TextAtom } from "../../atoms";
import { RFValue } from "react-native-responsive-fontsize";

export const Stepper = ({ steps, activeStep, onStepPress, style = {} }) => {
  return (
    <View style={[styles.baseStyle, style]} data-testid="StepperTestId">
      <RetangleBorded style={styles.image}>
        <StepView
          header={
            <>
              <TextAtom style={styles.title}>{steps[activeStep]?.title}</TextAtom>
              <TextAtom style={styles.subtitle}>
                {steps[activeStep]?.description}
              </TextAtom>
            </>
          }
          currentPosition={activeStep}
          onStepPress={onStepPress}
          stepCount={steps?.length}
        />
      </RetangleBorded>
      {steps[activeStep]?.component || null}
    </View>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  baseStyle: {
    backgroundColor: theme.colors.background,
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 32,
  },
  title: {
    color: theme.colors.white,
    fontFamily: fonts.primary_600,
    fontSize: RFValue(16),
    marginTop: 16,
  },
  subtitle: {
    color: theme.colors.white,
    fontFamily: fonts.primary_400,
    fontSize: RFValue(14),
    marginTop: 4,
  },
  image: { minHeight: 150 },
}));
