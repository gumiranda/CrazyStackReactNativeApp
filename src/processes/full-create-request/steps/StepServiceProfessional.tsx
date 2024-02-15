import { useUsersSelect } from "@/features/user/userList.hook";
import { useServicesSelect } from "@/features/service/serviceList.hook";
import { useStepRequest } from "../context/StepRequest.context";
export const StepServiceProfessional = ({
  ownerSelected,
  ownerSelectedUserId,
  nextStep,
}) => {
  // const { setRequest } = useStepRequest();

  // const { userSelected, handleChangeUserSelected, users } = useUsersSelect({
  //   ownerSelected,
  // });
  // const { serviceSelected, handleChangeServiceSelected, services } = useServicesSelect({
  //   ownerSelected: ownerSelectedUserId,
  //   userSelected,
  //   users,
  // });
  // const onSubmit = () => {
  //   const payload = {
  //     serviceId: serviceSelected,
  //     professionalId: userSelected,
  //     services,
  //   };
  //   setRequest((prev) => ({ ...prev, ...payload, users }));
  //   nextStep();
  // };
  return (
    <>
      {/* <Select
        bg="gray.100"
        labelColor="black"
        name="userList"
        label="Profissional prestador"
        list={users}
        value={userSelected}
        onChange={handleChangeUserSelected}
        keyValue="_id"
        keyLabel="name"
      >
        <option style={{ backgroundColor: "#7159c1" }} value="loadMore">
          Carregar mais
        </option>
      </Select>
      <Select
        bg="gray.100"
        labelColor="black"
        name="serviceList"
        label="Serviço"
        list={services}
        value={serviceSelected}
        onChange={handleChangeServiceSelected}
        keyValue="_id"
        keyLabel="name"
      >
        <option style={{ backgroundColor: "#7159c1" }} value="loadMore">
          Carregar mais
        </option>
      </Select> */}
    </>
  );
};
