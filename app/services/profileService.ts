import {ProfileResponse} from '../types/profile';
import {getToken} from '../utils/token';
import API_HOST from '../utils/ip.ts';

const API_BASE_URL = `${API_HOST}/api/v1`;

export const profileService = {
  getProfile: async (userId: string): Promise<ProfileResponse> => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/users/${userId}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },
};
