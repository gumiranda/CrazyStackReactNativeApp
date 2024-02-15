import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
import { ScrollView, View } from "react-native";
import appMetrics from "@/shared/libs/functions/metrics";
import { Button, RetangleBorded, TextAtom } from "../../atoms";
import { StepView } from "../../molecules";
import { RFValue } from "react-native-responsive-fontsize";

export const Stepper = ({ steps, nextStep, activeStep, onStepPress }) => {
  const theme = useTheme();

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
      <ScrollView contentContainerStyle={{ paddingVertical: 0, paddingHorizontal: 16 }}>
        <TextAtom>STEP {activeStep}</TextAtom>
      </ScrollView>
      <Button
        style={styles.button}
        onPress={() => nextStep()}
        title={steps[activeStep]?.buttonTitle || "PRÓXIMO"}
        backgroundColor={theme.colors.tertiary[300]}
        color={theme.colors.black}
      />
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
