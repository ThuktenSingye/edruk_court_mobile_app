import {useQuery} from '@tanstack/react-query';
import {profileService} from '../services/profileService';
import {ProfileData} from '../types/profile';

export const useProfile = (userId: string) => {
  return useQuery<ProfileData>({
    queryKey: ['profile', userId],
    queryFn: async () => {
      try {
        const response = await profileService.getProfile(userId);
        return response.data;
      } catch (error) {
        console.error('Error in useProfile:', error);
        throw error;
      }
    },
    retry: 1,
  });
};
