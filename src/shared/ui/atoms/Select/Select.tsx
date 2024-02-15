import { DynamicStyleSheet } from "@/shared/libs/utils";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";

export const Select = ({ options, onSelect, placeholder }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectButton}>
        <Text style={styles.selectButtonText}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.option}
                onPress={() => handleSelect(option)}
              >
                <Text>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  selectButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.grey[300],
  },
  selectButtonText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
