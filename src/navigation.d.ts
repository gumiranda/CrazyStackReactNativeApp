export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      SignInPage: undefined;
      SignUpPage: any;
      Initial: undefined;
      HomePage: undefined;
      MyRequestsDetailsOwner: any;
      EditRequest: any;
      CreateRequestOwner: undefined;
      RegisterPage: {
        name: string;
        role: string;
      };
      ConfirmRequestOwner: { request: any };
      HomeClient: undefined;
      PlaceDetails: { place: any; name: string };
    }
  }
}
