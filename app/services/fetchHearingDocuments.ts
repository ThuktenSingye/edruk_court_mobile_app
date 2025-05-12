import {getToken} from '../utils/token';

export const fetchHearingDocuments = async (
  caseId: number,
  hearingId: number,
) => {
  const token = await getToken();
  if (!token) {
    throw new Error('Authorization token not found');
  }

  const response = await fetch(
    `http://10.2.35.53:3001/api/v1/user/cases/${caseId}/hearings/${hearingId}/documents`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  const json = await response.json();
  console.log('API Response:', json);
  console.log('Documents Data:', json.data);

  if (!response.ok) {
    throw new Error(json.message || 'Failed to fetch hearing documents');
  }

  return json.data; // Adjust depending on your API's response structure
};
