import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Ionicons } from "@expo/vector-icons"; // Importe o ícone do Expo

export const Select = ({
  options,
  onSelect,
  placeholder,
  selectedValue,
  keyValue,
  keyLabel,
  label,
  extraOnChange,
}) => {
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
    <View style={styles.container}>
      <Text style={styles.selectButtonText}>{label}</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectButton}>
        <Text style={styles.selectButtonText}>
          {selectedOption?.[keyLabel] ?? placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            {options?.map?.((option) => (
              <TouchableOpacity
                key={option?.[keyValue]}
                style={styles.option}
                onPress={() => handleSelect(option)}
              >
                <Text style={styles.selectButtonText}>{option?.[keyLabel]}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelect({ [keyValue]: "loadMore" })}
            >
              <Text style={styles.selectButtonText}>Carregar mais...</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    marginVertical: 5,
  },
  selectButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.grey[300],
  },
  selectButtonText: {
    marginVertical: 8,
    fontSize: 16,
    fontFamily: fonts.primary_400,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    marginTop: getStatusBarHeight() + 200,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 10,
    marginTop: 10,
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    padding: 20,
    borderRadius: 5,
  },
  option: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey[300],
  },
}));
