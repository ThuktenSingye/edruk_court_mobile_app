export type LoginParams = {
  email: string;
  password: string;
};

export type LoginResponse = {
  status: number;
  message: string;
  data: {
    id: number;
    email: string;
    court_id: number | null;
    roles: string[];
    profile: {
      id: number;
      first_name: string;
      last_name: string;
      avatar: string;
    };
  };
};
