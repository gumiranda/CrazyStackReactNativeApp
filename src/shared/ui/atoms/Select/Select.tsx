import { Modal, ScrollView, TouchableOpacity, View } from "react-native";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
import { useState } from "react";
import { TextAtom } from "../TextAtom";
import { Ionicons } from "@expo/vector-icons"; // Importe o ícone do Expo
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";

export const Select = ({
  options,
  onSelect,
  placeholder,
  selectedValue,
  keyValue,
  keyLabel,
  label,
  extraOnChange,
  haveLoadMore = true,
}) => {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selectedValue);
  const handleSelect = (option) => {
    extraOnChange?.(option);
    if (option?.[keyValue] === "loadMore") {
      return;
    }
    setSelectedOption(option);
    onSelect(option);
    setModalVisible(false);
  };
  return (
    <View style={styles.baseStyle} data-testid="SelectTestId">
      <TextAtom style={styles.selectButtonText}>{label}</TextAtom>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectButton}>
        <TextAtom style={styles.selectButtonText}>
          {selectedOption?.[keyLabel] ?? placeholder}
        </TextAtom>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            {options?.map?.((option) => (
              <TouchableOpacity
                key={option?.[keyValue]}
                onPress={() => {
                  handleSelect(option);
                }}
              >
                <TextAtom style={styles.selectButtonText}>{option?.[keyLabel]}</TextAtom>
              </TouchableOpacity>
            ))}
            {haveLoadMore === true && (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect({ [keyValue]: "loadMore" })}
              >
                <TextAtom style={styles.selectButtonText}>Carregar mais...</TextAtom>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  baseStyle: {
    backgroundColor: theme.colors.background,
    marginVertical: 5,
  },
  selectButtonText: {
    marginVertical: 8,
    fontSize: RFValue(16),
    fontFamily: fonts.primary_400,
    color: theme.colors.text,
  },
  selectButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: theme.colors.grey[300],
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    marginTop: getStatusBarHeight(),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
    marginTop: 4,
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    padding: 20,
    borderRadius: 4,
  },
  option: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey[300],
  },
}));
