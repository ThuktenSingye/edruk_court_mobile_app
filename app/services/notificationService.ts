import {getToken} from '../utils/token';
import API_HOST from '../utils/ip.ts';

const API_BASE_URL = `${API_HOST}/api/v1`;

export async function fetchNotification(): Promise<any> {
  try {
    const token = await getToken();

    if (!token) {
      console.error('No authentication token found');
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(
        `Failed to fetch cases: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchCases:', error);
    throw error;
  }
}
