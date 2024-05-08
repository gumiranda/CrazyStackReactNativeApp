import { DynamicStyleSheet } from "@/shared/libs/utils";
import { ScrollView } from "react-native";
import { useCreateRequest } from "../context/CreateRequest.context";
import { ServiceProfessionalSelect } from "@/slices/appointments/features/request/select/service-professional";

export const StepServiceProfessional = ({ ownerSelectedUserId, nextStep }) => {
  const { setRequest, propsProfessional } = useCreateRequest();

  const onSubmit = (payload) => {
    setRequest((prev) => ({ ...prev, ...payload }));
    nextStep();
  };
  return (
    <>
      <ScrollView style={styles.container}>
        <ServiceProfessionalSelect
          propsProfessional={propsProfessional}
          ownerSelectedUserId={ownerSelectedUserId}
          externalOnSubmit={onSubmit}
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
