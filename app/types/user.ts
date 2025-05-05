export interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface User {
  id: number;
  email: string;
  court_id: number | null; // Use `| null` if it can be null
  roles: string[];
  profile: UserProfile;
}

export interface UserStore {
  user: User | null;
  setUser: (userData: User) => void;
  clearUser: () => void;
}
