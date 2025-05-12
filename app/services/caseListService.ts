import {getToken} from '../utils/token';
import {CaseListResponse} from '../types/caselist';

const API_BASE_URL = 'http://10.2.35.53:3001/api/v1';

export async function fetchCases(): Promise<CaseListResponse> {
  try {
    const token = await getToken();

    if (!token) {
      console.error('No authentication token found');
      throw new Error('No authentication token found');
    }

    console.log('Fetching cases from:', `${API_BASE_URL}/user/cases`);
    console.log('Using token:', token.substring(0, 10) + '...');

    const response = await fetch(`${API_BASE_URL}/user/cases`, {
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
