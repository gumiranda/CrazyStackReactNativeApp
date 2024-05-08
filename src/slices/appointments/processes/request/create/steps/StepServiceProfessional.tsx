import { DynamicStyleSheet } from "@/shared/libs/utils";
import { SelectHookForm } from "@/shared/ui";
import { ScrollView } from "react-native";
import { useCreateRequest } from "../context/CreateRequest.context";
import { ServiceProfessionalSelect } from "@/slices/appointments/features/request/select/service-professional";

export const StepServiceProfessional = ({ ownerSelectedUserId, nextStep }) => {
  const { propsProfessional } = useCreateRequest();

  return (
    <>
      <ScrollView style={styles.container}>
        <ServiceProfessionalSelect
          propsProfessional={propsProfessional}
          ownerSelectedUserId={undefined}
          externalOnSubmit={undefined}
        />
      </ScrollView>
    </>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
}));
