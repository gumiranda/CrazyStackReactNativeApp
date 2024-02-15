import React from "react";
import { render } from "@testing-library/react-native";
import { Footer } from "./Footer";
import { View } from "react-native";

test("Footer", () => {
  // it("should render footer", () => {
  // });
  const { debug } = render(
    <Footer>
      <View></View>
    </Footer>
  );
  debug();
});
