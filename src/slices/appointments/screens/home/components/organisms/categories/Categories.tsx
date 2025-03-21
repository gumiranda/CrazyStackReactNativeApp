import { View } from "react-native";

export const Categories = ({ data, selected, onSelect }: CategoriesProps) => {
  return <View></View>;
};
export interface CategoriesProps {
  data: CategoryProps[];
  selected: string;
  onSelect: (id: string) => void;
}
export type CategoryProps = {
  _id: string;
  name: string;
}[];
