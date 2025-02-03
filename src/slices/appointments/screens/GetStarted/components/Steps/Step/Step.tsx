import { Text, View } from "react-native";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
import { RFValue } from "react-native-responsive-fontsize";
import { IconProps } from "@tabler/icons-react-native";
interface StepProps {
  title: string;
  description: string;
  icon?: React.ComponentType<IconProps>;
}
export function Step({ title, description, icon: Icon }: StepProps) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      {Icon && <Icon size={32} color={theme.colors.primary[500]} />}
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    width: "100%",
    gap: 16,
    flexDirection: "row",
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: RFValue(14),
    fontFamily: fonts.poppins_500,
    color: theme.colors.gray[700],
  },
  description: {
    fontSize: RFValue(12),
    fontFamily: fonts.poppins_400,
    color: theme.colors.gray[600],
    marginTop: 4,
  },
}));
