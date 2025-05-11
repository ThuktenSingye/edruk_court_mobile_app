export interface Avatar {
  avatar: string;
}

export interface ProfileData {
  id: number;
  avatar: Avatar;
  first_name: string;
  last_name: string;
  cid_no: string;
  phone_number: string;
  house_no: string | null;
  thram_no: string | null;
  age: number | null;
  gender: string;
}

export interface ProfileResponse {
  status: string;
  message: string;
  data: ProfileData;
}
