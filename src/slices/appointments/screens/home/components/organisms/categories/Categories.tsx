import { FlatList } from "react-native";
import { Category } from "../../molecules/category";
import { DynamicStyleSheet } from "@/shared/libs/utils";
export const Categories = ({ data, selected, onSelect }: CategoriesProps) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item?._id}
      renderItem={({ item }) => (
        <Category
          data={item}
          isSelected={selected === item?._id}
          onPress={() => onSelect(item?._id)}
          iconId={item?._id}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      style={styles.container}
    />
  );
};

const styles = DynamicStyleSheet.create(() => ({
  container: {
    maxHeight: 36,
    position: "absolute",
    zIndex: 1,
    top: 64,
  },
  content: {
    gap: 8,
    paddingHorizontal: 24,
  },
}));
export interface CategoriesProps {
  data: CategoryProps[];
  selected: string;
  onSelect: (id: string) => void;
}
export type CategoryProps = {
  _id: string;
  name: string;
};
