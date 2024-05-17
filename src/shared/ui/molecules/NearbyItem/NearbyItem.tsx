import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { TextAtom } from "../../atoms";
import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { RFValue } from "react-native-responsive-fontsize";

const NearbyItem = ({ name, distance, rating, image }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.info}>
        <TextAtom style={styles.name}>{name}</TextAtom>
        <TextAtom style={styles.details}>{distance}</TextAtom>
      </View>
      <TextAtom style={styles.rating}>{rating}★</TextAtom>
    </TouchableOpacity>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: RFValue(14),
    fontFamily: fonts.primary_600,
    color: theme.colors.text,
  },
  details: {
    fontSize: RFValue(12),
    fontFamily: fonts.primary_400,
    color: theme.colors.text,
  },
  rating: {
    fontSize: RFValue(12),
    fontFamily: fonts.primary_500,
    color: theme.colors.primary[500],
  },
}));

export default NearbyItem;
