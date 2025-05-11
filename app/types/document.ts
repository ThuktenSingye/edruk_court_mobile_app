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
