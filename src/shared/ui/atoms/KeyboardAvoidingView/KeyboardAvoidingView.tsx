import { DynamicStyleSheet } from "@/shared/libs/utils";
import React from "react";
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  Keyboard,
} from "react-native";
export const KeyboardAvoidingView = ({ children }) => {
  return (
    <RNKeyboardAvoidingView style={styles.container} behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
      </TouchableWithoutFeedback>
    </RNKeyboardAvoidingView>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  container: { backgroundColor: theme.colors.background },
}));
