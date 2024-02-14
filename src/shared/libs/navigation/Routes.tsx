import { Initial } from "@/screens/Initial";
import { RegisterPage } from "@/screens/auth/RegisterPage";
import { SignInPage } from "@/screens/auth/SignInPage";
import { HomePage } from "@/screens/home";

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
  {
    name: "RegisterPage",
    component: RegisterPage,
    title: "RegisterPage",
  },
  {
    name: "HomePage",
    component: HomePage,
    title: "Início",
  },
];
export const routesWithoutHeader = ["Initial", "SignInPage", "RegisterPage"];
