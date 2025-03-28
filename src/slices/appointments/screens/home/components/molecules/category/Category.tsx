import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
import { categoriesIcons } from "@/shared/utils/categories-icons";
import { IconBalloon } from "@tabler/icons-react-native";
import { Pressable, Text } from "react-native";

export const Category = ({
  data,
  isSelected = false,
  iconId,
  ...rest
}: CategoryProps) => {
  const Icon = categoriesIcons[iconId] || IconBalloon;
  const theme = useTheme();
  return (
    <Pressable
      style={[styles.container, isSelected && styles.containerSelected]}
      {...rest}
    >
      <Icon size={16} color={theme.colors.grey[isSelected ? 100 : 600]} />
      <Text style={[styles.name, isSelected && styles.nameSelected]}>{data?.name}</Text>
    </Pressable>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    height: 36,
    backgroundColor: theme.colors.gray[100],
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    flexDirection: "row",
    gap: 10,
  },
  name: {
    fontSize: 14,
    color: theme.colors.gray[700],
    fontFamily: fonts.primary_400,
  },
  containerSelected: {
    backgroundColor: theme.colors.primary[500],
    borderColor: theme.colors.primary[500],
  },
  nameSelected: { color: theme.colors.grey[100] },
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
