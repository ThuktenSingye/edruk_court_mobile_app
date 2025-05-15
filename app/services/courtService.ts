import {CourtResponse} from '../types/court';
import {getToken} from '../utils/token';
import API_HOST from '../utils/ip.ts';
export const fetchCourts = async (): Promise<CourtResponse> => {
  const token = await getToken();
  const response = await fetch(`${API_HOST}/api/v1/courts`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`,
    );
  }

  const result = await response.json();
  return result as CourtResponse;
};
