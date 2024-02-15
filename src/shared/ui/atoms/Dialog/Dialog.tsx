import { useEffect } from "react";
import { Alert } from "react-native";
export const Dialog = ({
  mainButton,
  colorScheme,
  isOpen,
  setIsOpen,
  title,
  dismissButton,
  body,
  onPress,
}) => {
  useEffect(() => {
    if (isOpen) {
      showConfirmationDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const showConfirmationDialog = () => {
    Alert.alert(
      title,
      body,
      [
        {
          text: dismissButton,
          onPress: () => setIsOpen(false),
          style: "cancel",
        },
        {
          text: mainButton,
          onPress: () => {
            setIsOpen(false);
            onPress?.();
          },
          style: colorScheme ? colorScheme : "default",
        },
      ],
      { cancelable: false }
    );
  };

  return null;
};
