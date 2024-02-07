import React from "react";
import { Register } from "./Register";
import { KeyboardAvoidingView } from "@/shared/ui";
export const RegisterPage = ({
  route: {
    params: { name, role },
  },
}: any) => {
  return (
    <KeyboardAvoidingView>
      <Register
        title={`Crie sua${"\n"}conta`}
        subtitle={`Faça seu cadastro de${"\n"}forma rápida e fácil`}
        name={name}
        role={role}
      />
    </KeyboardAvoidingView>
  );
};
