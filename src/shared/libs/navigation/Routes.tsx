import { SignInPage } from "@/slices/general/screens/auth/signIn";
import { SignUpPage } from "@/slices/general/screens/auth/signUp";
import { HomeClient } from "@/slices/appointments/screens/home/HomeClient";
import { HomePage } from "@/slices/appointments/screens/home/HomePage";
import { Initial } from "@/slices/appointments/screens/Initial";
import { GetStarted } from "@/slices/appointments/screens/getStarted";
import { CreateRequestOwner } from "@/slices/appointments/screens/request/create/CreateRequestOwner";
import { ConfirmRequestOwner } from "@/slices/appointments/processes/request/ConfirmRequestOwner";
import { MyRequestsDetailsOwner } from "@/slices/appointments/screens/request/details/MyRequestsDetailsOwner";
import { EditRequest } from "@/slices/appointments/processes/request/edit/EditRequest";

export const stackRoutes = [
  { name: "GetStarted", component: GetStarted, title: "Início" },
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
    title: "Início",
  },
  {
    name: "MyRequestsDetailsOwner",
    component: MyRequestsDetailsOwner,
    title: "Detalhes",
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
  {
    name: "ConfirmRequestOwner",
    component: ConfirmRequestOwner,
    title: "Confirmar agendamento",
  },
  {
    name: "EditRequest",
    component: EditRequest,
    title: "Editar agendamento",
  },
];
export const routesWithoutHeader = ["GetStarted", "Initial", "SignUpPage", "SignInPage"];
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
