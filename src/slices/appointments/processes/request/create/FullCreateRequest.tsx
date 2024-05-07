import { CreateRequestProvider } from "./context/CreateRequest.context";

export const FullCreateRequest = () => {
  return (
    <CreateRequestProvider>
      <FullCreateRequestForm />
    </CreateRequestProvider>
  );
};
export const FullCreateRequestForm = () => {
  return <></>;
};
