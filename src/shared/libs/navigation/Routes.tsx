import { SignInPage } from "@/screens/auth/signIn";
import { SignUpPage } from "@/screens/auth/signUp";
import { Initial } from "@/screens/Initial";

export const stackRoutes = [
  { name: "Initial", component: Initial, title: "Início" },
  { name: "SignUpPage", component: SignUpPage, title: "SignUpPage" },
  {
    name: "SignInPage",
    component: SignInPage,
    title: "SignInPage",
  },
];
export const routesWithoutHeader = ["Initial", "SignUpPage", "SignInPage"];
export const drawerRoutes = [{ name: "Logout", component: null, title: "Sair" }];
