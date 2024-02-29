import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { View } from "react-native";
import appMetrics from "@/shared/libs/functions/metrics";
import { RetangleBorded, TextAtom } from "../../atoms";
import { StepView } from "../../molecules";
import { RFValue } from "react-native-responsive-fontsize";

export const Stepper = ({ steps, activeStep, onStepPress }) => {
  return (
    <View style={styles.container}>
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
  image: { minHeight: 150 },

  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 32,
  },
  button: {
    width: appMetrics.SCREEN_WIDTH * 0.9,
    alignSelf: "center",
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
    marginTop: 16,
  },
}));
