import { useUsersSelect } from "@/features/user/userList.hook";
import { useServicesSelect } from "@/features/service/serviceList.hook";
import { useStepRequest } from "../context/StepRequest.context";
import { View, Text } from "react-native";
import { Select } from "@/shared/ui";
import { useState } from "react";
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
      <MyComponent />
    </>
  );
};
const MyComponent = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: 1, label: "Option 1" },
    { value: 2, label: "Option 2" },
    { value: 3, label: "Option 3" },
  ];

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <View>
      <Text>Selected Option: {selectedOption ? selectedOption.label : "None"}</Text>
      <Select options={options} onSelect={handleSelect} placeholder="Select an option" />
    </View>
  );
};
