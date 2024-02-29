import { View } from "react-native";
import { DateDetails, ViewField } from "@/shared/ui";

export const RequestDetails = ({ props: { request, service, client } }) => {
  const { initDate, endDate } = request;
  const duration = `${service?.duration} min`;
  return (
    <View>
      <DateDetails initDate={initDate} endDate={endDate} />
      <ViewField>
        <ViewField.Label>Cliente:</ViewField.Label>
        <ViewField.Description>{client?.name}</ViewField.Description>
      </ViewField>
      <ViewField>
        <ViewField.Label>Serviço:</ViewField.Label>
        <ViewField.Description>{service?.name}</ViewField.Description>
      </ViewField>
      <ViewField>
        <ViewField.Label>Duração:</ViewField.Label>
        <ViewField.Description>{duration}</ViewField.Description>
      </ViewField>
      <ViewField>
        <ViewField.Label>Preço:</ViewField.Label>
        <ViewField.PriceText>{service?.price}</ViewField.PriceText>
      </ViewField>
    </View>
  );
};
