export interface File {
  url: string;
  filename: string;
  content_type: string;
  byte_size: number;
}

export interface Document {
  id: number;
  verified_at: string | null;
  verified_by_judge: boolean;
  document_status: string;
  file: File;
}

export interface Hearing {
  id: number;
  hearing_type: string;
  hearing_status: string;
}

export interface Case {
  id: number;
  case_number: string | null;
  registration_number: string;
  judgement_number: string | null;
  title: string;
  summary: string;
  case_status: string;
  case_priority: string | null;
  documents: Document[];
  hearings: Hearing[];
}

export interface CaseListResponse {
  status: string;
  message: string | null;
  data: Case[];
}
