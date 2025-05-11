import {getToken} from '../utils/token';
import {ScheduleResponse} from '../types/schedule';

const API_BASE_URL = 'http://10.2.5.80:3001/api/v1';

export async function getHearingSchedules(): Promise<ScheduleResponse> {
  const token = await getToken();

  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/user/hearing_schedules/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch hearing schedules');
  }

  return response.json();
}
