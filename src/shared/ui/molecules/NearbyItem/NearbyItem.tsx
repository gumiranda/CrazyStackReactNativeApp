import React from "react";
import { View, Image } from "react-native";
import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { TextAtom } from "../../atoms";
import { RFValue } from "react-native-responsive-fontsize";

const NearbyItem = ({ name, distance, rating, image }) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.info}>
        <TextAtom style={styles.name}>{name}</TextAtom>
        <TextAtom style={styles.distance}>{distance}</TextAtom>
        <TextAtom style={styles.rating}>Rating: {rating}★</TextAtom>
      </View>
    </View>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: theme.colors.secondary[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
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
  distance: {
    fontSize: RFValue(12),
    fontFamily: fonts.primary_400,
    color: theme.colors.background,
  },
  rating: {
    fontSize: RFValue(12),
    fontFamily: fonts.primary_400,
    color: theme.colors.background,
  },
}));

export default NearbyItem;
