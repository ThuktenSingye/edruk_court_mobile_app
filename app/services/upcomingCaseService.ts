import {getToken} from '../utils/token';
import {UpcomingCasesResponse} from '../types/upcomingcases';

const API_BASE_URL = 'http://10.2.5.80:3001/api/v1';

export async function fetchUpcomingCases(): Promise<UpcomingCasesResponse> {
  try {
    const token = await getToken();
    if (!token) {
      console.error('No authentication token found');
      throw new Error('No authentication token found');
    }

    console.log(
      'Fetching upcoming cases with token:',
      token.substring(0, 10) + '...',
    );

    const response = await fetch(
      `${API_BASE_URL}/user/hearing_schedules/reminders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error Response:', errorData);
      throw new Error(
        `Failed to fetch upcoming cases: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log('Successfully fetched upcoming cases:', data);
    return data;
  } catch (error) {
    console.error('Error in fetchUpcomingCases:', error);
    throw error;
  }
}
