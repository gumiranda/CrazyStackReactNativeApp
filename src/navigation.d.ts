export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      SignInPage: undefined;
      Initial: undefined;
      HomePage: { user: any };
      RegisterPage: {
        name: string;
        role: string;
      };
    }
  }
}
