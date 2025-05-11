export interface FileCasePayload {
  case: {
    title: string;
    court_id: string | number;
    summary: string;
    case_documents_attributes: {
      document: any;
    }[];
    defendants_attributes: {
      first_name: string;
      last_name: string;
      cid_no: string;
      phone_number: string;
      email: string;
      addresses_attributes: {
        dzongkhag: string;
        gewog: string;
        street_address: string;
        address_type: string;
      }[];
    }[];
  };
}
