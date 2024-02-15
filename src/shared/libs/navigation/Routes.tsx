import { Initial } from "@/screens/Initial";
import { RegisterPage } from "@/screens/auth/RegisterPage";
import { SignInPage } from "@/screens/auth/SignInPage";
import { HomePage } from "@/screens/home";
import { MyRequestsDetailsOwner } from "@/screens/request/MyRequestsDetailsOwner";

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
