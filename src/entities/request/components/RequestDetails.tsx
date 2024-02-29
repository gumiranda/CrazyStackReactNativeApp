import { View } from "react-native";
import { DateDetails, ViewField } from "@/shared/ui";

export const RequestDetails = ({
  props: { requestCreated, currentService, clientCreated },
}) => {
  const { initDate, endDate } = requestCreated;
  const duration = `${currentService?.duration} min`;
  return (
    <View>
      <DateDetails initDate={initDate} endDate={endDate} />
      <ViewField>
        <ViewField.Label>Cliente:</ViewField.Label>
        <ViewField.Description>{clientCreated?.name}</ViewField.Description>
      </ViewField>
      <ViewField>
        <ViewField.Label>Serviço:</ViewField.Label>
        <ViewField.Description>{currentService?.name}</ViewField.Description>
      </ViewField>
      <ViewField>
        <ViewField.Label>Duração:</ViewField.Label>
        <ViewField.Description>{duration}</ViewField.Description>
      </ViewField>
      <ViewField>
        <ViewField.Label>Preço:</ViewField.Label>
        <ViewField.PriceText>{currentService?.price}</ViewField.PriceText>
      </ViewField>
    </View>
  );
};
