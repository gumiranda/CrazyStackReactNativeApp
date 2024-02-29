import React from "react";
import { SignIn } from "./SignIn";
import { KeyboardAvoidingView } from "@/shared/ui";

export const SignInPage = () => {
  return (
    <KeyboardAvoidingView>
      <SignIn
        title={`Estamos${"\n"}quase lá.`}
        subtitle={` Faça seu login para começar${"\n"} uma experiência incrível.`}
      />
    </KeyboardAvoidingView>
  );
};
