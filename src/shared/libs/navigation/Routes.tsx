import { SignInPage } from "@/slices/general/screens/auth/signIn";
import { SignUpPage } from "@/slices/general/screens/auth/signUp";
import { HomeClient } from "@/slices/appointments/screens/home/HomeClient";
import { HomePage } from "@/slices/appointments/screens/home/HomePage";
import { Initial } from "@/slices/appointments/screens/Initial";
import { CreateRequestOwner } from "@/slices/appointments/screens/request/create/CreateRequestOwner";

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
  {
    name: "CreateRequestOwner",
    component: CreateRequestOwner,
    title: "Criar agendamento",
  },
];
export const routesWithoutHeader = ["Initial", "SignUpPage", "SignInPage"];
export const drawerRoutes = [
  {
    name: "HomePage",
    component: HomePage,
    title: "Início",
  },
  {
    name: "CreateRequestOwner",
    component: CreateRequestOwner,
    title: "Criar agendamento",
  },
  { name: "Logout", component: null, title: "Sair" },
];
