export interface ParentCourt {
  id: number | null;
  name: string | null;
  type: string | null;
}

export interface Court {
  id: number;
  name: string;
  email: string;
  contact_no: string;
  subdomain: string;
  domain: string;
  court_type: string;
  parent_court: ParentCourt;
}

export interface CourtResponse {
  status: string;
  message: string | null;
  data: Court[];
}
