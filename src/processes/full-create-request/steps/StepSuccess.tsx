//  import { useStepRequest } from "../context/StepRequest.context";
// import { format, startOfDay } from "date-fns";
// import { ptBR } from "date-fns/locale";
// import { editRequestMutation } from "@/features/request/edit/editRequest.hook";
// import { useUi } from "@/app/providers";

export const StepSuccess = ({ title, content }) => {
  // const { request } = useStepRequest() || {};
  // const { showModal } = useUi();
  // const confirmAppointment = async () => {
  //   await editRequest.mutateAsync({
  //     ...request?.requestToSend,
  //     date: startOfDay(request?.requestToSend.initDate),
  //     status: 1,
  //   } as any);
  // };
  // const editRequest = editRequestMutation({
  //   currentRequest: request?.requestCreated,
  //   showModal,
  //   routeRedirect: "/requests/list",
  //   content: "Agendamento confirmado com sucesso, já pode ser visualizado na agenda.",
  // });

  return (
    <></>
    // <Box textAlign={"center"} py={4} px={2}>
    //   <CheckCircleIcon boxSize="50px" color="tertiary.500" />
    //   {title && (
    //     <Heading as="h2" size="xl" mt={6} mb={2} color="gray.500">
    //       {title}
    //     </Heading>
    //   )}
    //   {content && (
    //     <Text color="gray.500" mt={4} fontSize={"xl"}>
    //       {content}
    //     </Text>
    //   )}
    //   {request?.requestCreated && (
    //     <>
    //       <Text color="gray.500" mt={4} fontSize={"2xl"}>
    //         {formatDate(request?.requestCreated?.initDate)}
    //       </Text>
    //       <Text color="gray.500" mt={4} fontWeight={"bold"} fontSize={"2xl"}>
    //         {format(request?.requestCreated?.initDate, "HH:mm", {
    //           locale: ptBR,
    //         })}
    //         ....................
    //         {format(request?.requestCreated?.endDate, "HH:mm", {
    //           locale: ptBR,
    //         })}
    //       </Text>
    //       <Text color="purple.500" mt={4} fontWeight={"bold"} fontSize={"3xl"}>
    //         {request?.name}
    //       </Text>
    //       <Text color="gray.500" mt={4} fontSize={"xl"}>
    //         {request?.currentService?.name} -{" "}
    //         {request?.currentService?.price?.toLocaleString?.("pt-BR", {
    //           style: "currency",
    //           currency: "BRL",
    //         })}{" "}
    //         - {request?.currentService?.duration} min
    //       </Text>
    //       <Button
    //         w={"100%"}
    //         mt={20}
    //         colorScheme={"tertiary"}
    //         onClick={confirmAppointment}
    //       >
    //         Confirmar agendamento
    //       </Button>
    //     </>
    //   )}
    // </Box>
  );
};
const formatDateHours = (date) => {
  return new Date(date).toLocaleDateString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    weekday: "long",
  });
};
