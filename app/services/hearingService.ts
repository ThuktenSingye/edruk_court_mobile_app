import {getToken} from '../utils/token';
import API_HOST from '../utils/ip.ts';
export const fetchCaseHearings = async (caseId: number) => {
  const token = await getToken();
  if (!token) {
    throw new Error('Authorization token not found');
  }

  const response = await fetch(
    `${API_HOST}/api/v1/user/cases/${caseId}/hearings`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message || 'Failed to fetch hearings');
  }

  return json.data;
};
