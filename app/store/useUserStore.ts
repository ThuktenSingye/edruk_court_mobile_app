import {create} from 'zustand';
import type {UserStore} from '../types/user';

const useUserStore = create<UserStore>(set => ({
  user: null,
  setUser: userData => set({user: userData}),
  clearUser: () => set({user: null}),
}));

export default useUserStore;
