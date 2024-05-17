import { TouchableOpacity } from "react-native";
import { DynamicStyleSheet } from "@/shared/libs/utils";

export const IconButton = ({ icon, onPress, style = {}, ...rest }) => (
  <TouchableOpacity {...rest} onPress={onPress} style={[styles.iconButton, style]}>
    {icon}
  </TouchableOpacity>
);
const styles = DynamicStyleSheet.create(() => ({
  iconButton: {
    padding: 10,
  },
}));
