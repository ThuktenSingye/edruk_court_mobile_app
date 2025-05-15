import {getToken} from '../utils/token';
import API_HOST from '../utils/ip.ts';

export const uploadHearingDocument = async (
  caseId: number,
  hearingId: number,
  files: any[], // Expecting array of files from DocumentPicker
) => {
  const formData = new FormData();

  files.forEach((file: any) => {
    formData.append('document[document]', {
      uri: file.uri,
      name: file.name,
      type: file.type,
    } as any); // Required for React Native
  });

  try {
    const token = await getToken();

    if (!token) {
      throw new Error('No token found. Please log in again.');
    }

    const url = `${API_HOST}/api/v1/user/cases/${caseId}/hearings/${hearingId}/documents`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't manually set 'Content-Type' with FormData in React Native
      },
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error('Failed to upload document: ' + errText);
    }

    return await response.json();
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};
