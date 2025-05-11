import {Document} from './document';

export interface Hearing {
  id: number;
  hearing_type: string;
  hearing_status: string;
}

export interface Case {
  id: number;
  case_number: string | null;
  registration_number: string;
  judgement_number: string;
  title: string;
  summary: string;
  case_status: string;
  case_priority: string | null;
  documents: Document[];
  hearings: Hearing[];
}

export interface ActiveCasesResponse {
  data: Case[];
}
