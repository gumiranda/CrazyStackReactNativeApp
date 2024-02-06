import { Initial } from "@/screens/Initial";
import { SignInPage } from "@/screens/auth/SignInPage";

export const stackRoutes = [
  {
    name: "Initial",
    component: Initial,
    title: "Início",
  },
  {
    name: "SignInPage",
    component: SignInPage,
    title: "SignInPage",
  },
];
export const routesWithoutHeader = ["Initial", "SignInPage"];
