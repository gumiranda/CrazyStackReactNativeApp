import { DynamicStyleSheet } from "@/shared/libs/utils";
import { Select } from "@/shared/ui";
import { ScrollView } from "react-native";

export const StepServiceProfessional = ({ ownerSelectedUserId, nextStep }) => {
  const options = [
    { id: "1", name: "Opção 1" },
    { id: "2", name: "Opção 2" },
    { id: "3", name: "Opção 3" },
  ];

  const handleSelect = (option) => {
    console.log(option);
  };
  return (
    <>
      <ScrollView style={styles.container}>
        <Select
          options={options}
          onSelect={handleSelect}
          placeholder="Selecione uma opção"
          selectedValue={options[0]}
          keyValue="id"
          keyLabel="name"
          label="Meu Select"
          extraOnChange={undefined}
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
