import { SignInPage } from "@/screens/auth/signIn";
import { SignUpPage } from "@/screens/auth/signUp";
import { HomeClient } from "@/screens/home/HomeClient";
import { HomePage } from "@/screens/home/HomePage";
import { Initial } from "@/screens/Initial";

export const stackRoutes = [
  { name: "Initial", component: Initial, title: "Início" },
  { name: "SignUpPage", component: SignUpPage, title: "SignUpPage" },
  {
    name: "SignInPage",
    component: SignInPage,
    title: "SignInPage",
  },
  {
    name: "HomePage",
    component: HomePage,
    title: "HomePage",
  },
  {
    name: "HomeClient",
    component: HomeClient,
    title: "HomeClient",
  },
];
export const routesWithoutHeader = ["Initial", "SignUpPage", "SignInPage"];
export const drawerRoutes = [{ name: "Logout", component: null, title: "Sair" }];
