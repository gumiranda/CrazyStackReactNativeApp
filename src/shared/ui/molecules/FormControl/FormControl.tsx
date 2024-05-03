import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
import { Input, MaterialIcon, TextAtom, TextInput, PasswordInput } from "../../atoms";
import { Controller } from "react-hook-form";
import { RFValue } from "react-native-responsive-fontsize";
import Animated, { FadeInDown } from "react-native-reanimated";

export const FormControl = ({
  inputProps,
  control,
  name,
  iconName,
  label,
  error = null,
  defaultFormControl,
  password,
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
                  ref={ref}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  defaultValue={value}
                  style={styles.input}
                  value={value}
                  iconName={iconName}
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
                ref={ref}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                defaultValue={value}
                style={styles.input}
                value={value}
                iconName={iconName}
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
  baseStyle: {
    backgroundColor: theme.colors.primary[500],
  },
  input: {
    backgroundColor: theme.colors.grey[300],
    fontSize: RFValue(16),
    fontFamily: fonts.primary_500,
    color: theme.colors.text,
    paddingLeft: RFValue(48),
    paddingRight: RFValue(12),
    height: RFValue(48),
    borderRadius: RFValue(12),
    width: "100%",
  },
  label: {
    color: theme.colors.text,
    fontSize: RFValue(14),
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: -2,
  },
  errorMessage: {
    fontSize: RFValue(14),
    color: theme.colors.error[500],
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  inputView: { position: "relative", width: "100%" },
  inputIcon: {
    position: "absolute",
    left: 12,
    top: 12,
    opacity: 0.5,
  },
}));
