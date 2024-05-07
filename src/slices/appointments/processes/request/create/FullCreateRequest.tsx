import { CreateRequestProvider, useCreateRequest } from "./context/CreateRequest.context";

export const FullCreateRequest = () => {
  return (
    <CreateRequestProvider>
      <FullCreateRequestForm />
    </CreateRequestProvider>
  );
};
export const FullCreateRequestForm = () => {
  const { owner, clients } = useCreateRequest();
  //const stepProps = useSteps();
  return <></>;
};
