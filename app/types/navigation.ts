export type MainStackParamList = {
  Tabs: undefined;
  Notification: undefined;
  WithdrawCase: undefined;
  DefendentInfo: undefined;
  CaseProceedingDetail: {title: string};
  FileCase: undefined;
  Login: undefined;
  Signup: undefined;
};

export type TabParamList = {
  Home: undefined;
  Proceeding: undefined;
  Schedule: undefined;
  Profile: undefined;
  Notification: undefined; // ✅ Needed for bell navigation
};

export type RootStackParamList = {
  Tabs: undefined;
  Notification: undefined;
};

export type CaseStackParamList = {
  CaseMain: undefined;
  DefendentInfo: undefined;
  CaseProceeding: undefined;
  FileCase: undefined; // ✅ Required for nested Case navigation
};
