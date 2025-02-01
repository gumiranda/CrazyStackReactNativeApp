import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button, ButtonProps } from "./Button";

describe("Button", () => {
  const defaultProps: ButtonProps = {
    title: "Test Button",
    onPress: jest.fn(),
    color: "",
    backgroundColor: "",
  };

  it("renders correctly", () => {
    const { getByText } = render(<Button {...defaultProps} />);
    const buttonElement = getByText("Test Button");
    expect(buttonElement).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const { getByText } = render(<Button {...defaultProps} />);
    const buttonElement = getByText("Test Button");
    fireEvent.press(buttonElement);
    expect(defaultProps.onPress).toHaveBeenCalled();
  });
});
