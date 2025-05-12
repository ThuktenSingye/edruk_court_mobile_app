import {Case} from './case';

export type MainStackParamList = {
  Tabs: undefined;
  Notification: undefined;
  WithdrawCase: undefined;
  DefendentInfo: undefined;
  CaseProceedingDetail: {title: string};
  FileCase: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  CaseDetails: {caseId: number};
};

export type TabParamList = {
  Home: undefined;
  Proceeding: undefined;
  Schedule: undefined;
  Profile: undefined;
  Notification: undefined;
};

export type RootStackParamList = {
  Tabs: undefined;
  Notification: undefined;
};

export type CaseStackParamList = {
  CaseMain: undefined;
  CaseDetail: {case: Case};
  DefendentInfo: undefined;
  CaseProceeding: {caseId: number};
  FileCase: undefined;
};
