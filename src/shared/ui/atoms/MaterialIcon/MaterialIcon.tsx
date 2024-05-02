import React from "react";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";

const iconComponents = { MaterialIcons, Ionicons, Feather, AntDesign };

export const MaterialIcon = ({
  type = "MaterialCommunityIcons",
  name,
  color,
  size,
  ...rest
}) => {
  const IconComponent = iconComponents[type] || MaterialCommunityIcons;
  return <IconComponent name={name} color={color} size={size} {...rest} />;
};
