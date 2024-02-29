import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "@react-navigation/native";
import { Controller } from "react-hook-form";
import { DynamicStyleSheet } from "@/shared/libs/utils";
import { Input, MaterialIcon, PasswordInput, TextAtom, TextInput } from "../../atoms";

export const FormControl = ({
  control,
  name,
  iconName,
  label,
  error = null,
  inputProps,
  defaultFormControl = true,
  password = false,
  ...extraProps
}) => {
  const theme = useTheme();
  return (
    <>
      {!!label && <TextAtom style={styles.label}>{label}</TextAtom>}
      <Animated.View
        entering={FadeInDown.delay(200).duration(1000).springify()}
        style={styles.inputView}
      >
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => {
            if (defaultFormControl) {
              return (
                <TextInput
                  {...inputProps}
                  {...extraProps}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  defaultValue={value}
                  value={value}
                  ref={ref}
                  style={styles.input}
                />
              );
            } else if (password === true) {
              return (
                <PasswordInput
                  {...inputProps}
                  {...extraProps}
                  onBlur={onBlur}
                  iconName={iconName}
                  onChangeText={(value) => onChange(value)}
                  defaultValue={value}
                  value={value}
                  ref={ref}
                />
              );
            }
            return (
              <Input
                {...inputProps}
                {...extraProps}
                onBlur={onBlur}
                iconName={iconName}
                onChangeText={(value) => onChange(value)}
                defaultValue={value}
                value={value}
                ref={ref}
              />
            );
          }}
          name={name}
        />
        {defaultFormControl && (
          <MaterialIcon
            type="MaterialIcons"
            name={iconName}
            size={24}
            color={theme.colors.text}
            style={styles.inputIcon}
          />
        )}

        {!!error && <TextAtom style={styles.errorMessage}>{error?.message}</TextAtom>}
      </Animated.View>
    </>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  label: {
    color: theme.colors.text,
    fontSize: 14,
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: -2,
  },
  errorMessage: {
    color: theme.colors.error[500],
    fontSize: 14,
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  inputView: { position: "relative", width: "100%" },
  input: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.text,
    paddingLeft: 48,
    paddingRight: 12,
    height: 48,
    borderRadius: 12,
    backgroundColor: theme.colors.grey[300],
    width: "100%",
  },
  inputIcon: {
    position: "absolute",
    left: 12,
    top: 12,
    opacity: 0.5,
  },
}));
