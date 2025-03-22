import { DynamicStyleSheet } from "@/shared/libs/utils";
import { categoriesIcons } from "@/shared/utils/categories-icons";
import { IconBalloon } from "@tabler/icons-react-native";
import { Pressable } from "react-native";

export const Category = ({ data, isSelected, onPress, iconId }: CategoryProps) => {
  const Icon = categoriesIcons[iconId] || IconBalloon;
  return (
    <Pressable
      style={[styles.container, isSelected && styles.selected]}
      onPress={onPress}
    >
      <Icon size={16} />
    </Pressable>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: theme.colors.background,
  },
  selected: {
    backgroundColor: theme.colors.primary[500],
  },
}));

export interface CategoryProps {
  data: {
    _id: string;
    name: string;
  };
  isSelected: boolean;
  onPress: () => void;
  iconId: string;
}
