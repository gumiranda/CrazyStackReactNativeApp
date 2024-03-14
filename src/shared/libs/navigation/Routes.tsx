import { ConfirmRequestOwner } from "@/processes/request/ConfirmRequestOwner";
import { EditRequest } from "@/processes/request/edit/EditRequest";
import { Initial } from "@/screens/Initial";
import { RegisterPage } from "@/screens/auth/RegisterPage";
import { SignInPage } from "@/screens/auth/SignInPage";
import { HomePage } from "@/screens/home";
import { HomeClient } from "@/screens/home/HomeClient";
import { CreateRequestOwner } from "@/screens/request/create/CreateRequestOwner";
import { MyRequestsDetailsOwner } from "@/screens/request/details/MyRequestsDetailsOwner";

import { ListService } from "@/screens/service/list/ListService";

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
  {
    name: "EditRequest",
    component: EditRequest,
    title: "Editar agendamento",
  },
  {
    name: "ListService",
    component: ListService,
    title: "Serviços",
  },
  {
    name: "HomeClient",
    component: HomeClient,
    title: "Belezix",
  },
];
export const routesWithoutHeader = ["Initial", "SignInPage", "RegisterPage"];
export const drawerRoutes = [
  {
    name: "HomePage",
    component: HomePage,
    title: "Início",
  },
  {
    name: "ListService",
    component: ListService,
    title: "Serviços",
  },
  { name: "Logout", component: null, title: "Sair" },
];
