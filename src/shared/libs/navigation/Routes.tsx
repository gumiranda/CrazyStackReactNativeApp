import { SignUpPage } from "@/screens/auth/signUp";
import { Initial } from "@/screens/Initial";

export const stackRoutes = [
  { name: "Initial", component: Initial, title: "Início" },
  { name: "SignUpPage", component: SignUpPage, title: "SignUpPage" },
];
export const routesWithoutHeader = ["Initial", "SignUpPage"];
export const drawerRoutes = [{ name: "Logout", component: null, title: "Sair" }];
