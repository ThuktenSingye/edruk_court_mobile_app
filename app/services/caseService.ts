import {getToken} from '../utils/token';
import {ActiveCasesResponse, Case} from '../types/case';
import API_HOST from '../utils/ip.ts';
const API_BASE_URL = `${API_HOST}/api/v1`;

export async function fetchActiveCases(): Promise<ActiveCasesResponse> {
  try {
    const token = await getToken();
    if (!token) {
      console.error('No authentication token found');
      throw new Error('No authentication token found');
    }

    console.log(
      'Fetching active cases with token:',
      token.substring(0, 10) + '...',
    );

    const response = await fetch(`${API_BASE_URL}/user/cases/active`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error Response:', errorData);
      throw new Error(
        `Failed to fetch active cases: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log('Successfully fetched cases:', data);
    return data;
  } catch (error) {
    console.error('Error in fetchActiveCases:', error);
    throw error;
  }
}

export async function fetchCaseDetails(caseId: number): Promise<Case> {
  try {
    const token = await getToken();
    if (!token) {
      console.error('No authentication token found');
      throw new Error('No authentication token found');
    }

    console.log(
      'Fetching case details with token:',
      token.substring(0, 10) + '...',
    );

    const response = await fetch(`${API_BASE_URL}/user/cases/${caseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error Response:', errorData);
      throw new Error(
        `Failed to fetch case details: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log('Successfully fetched case details:', data);
    return data.data;
  } catch (error) {
    console.error('Error in fetchCaseDetails:', error);
    throw error;
  }
}
