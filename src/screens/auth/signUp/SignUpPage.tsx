import { KeyboardAvoidingView } from "@/shared/ui";
import { SignUp } from "./templates/SignUp";

export const SignUpPage = ({
  route: {
    params: { name, role },
  },
}) => {
  return (
    <KeyboardAvoidingView>
      <SignUp
        props={{
          title: `Crie sua${"\n"}conta`,
          subtitle: `Faça seu cadastro de${"\n"}forma rápida e fácil`,
          name,
          role,
        }}
      />
    </KeyboardAvoidingView>
  );
};
