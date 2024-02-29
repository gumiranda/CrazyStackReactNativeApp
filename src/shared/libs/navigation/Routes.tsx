import { ConfirmRequestOwner } from "@/processes/full-create-request/steps/ConfirmRequestOwner";
import { Initial } from "@/screens/Initial";
import { RegisterPage } from "@/screens/auth/RegisterPage";
import { SignInPage } from "@/screens/auth/SignInPage";
import { HomePage } from "@/screens/home";
import { CreateRequestOwner } from "@/screens/request/create/CreateRequestOwner";
import { MyRequestsDetailsOwner } from "@/screens/request/details/MyRequestsDetailsOwner";

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
  {
    name: "MyRequestsDetailsOwner",
    component: MyRequestsDetailsOwner,
    title: "Detalhes",
  },
  {
    name: "CreateRequestOwner",
    component: CreateRequestOwner,
    title: "Novo agendamento",
  },
  {
    name: "ConfirmRequestOwner",
    component: ConfirmRequestOwner,
    title: "Confirmar agendamento",
  },
];
export const routesWithoutHeader = ["Initial", "SignInPage", "RegisterPage"];
export const drawerRoutes = [
  {
    name: "HomePage",
    component: HomePage,
    title: "Início",
  },
  { name: "Logout", component: null, title: "Sair" },
];
