import {FileCasePayload} from '../types/filecase';
import {getToken} from '../utils/token';

const API_URL = 'http://10.2.5.80:3001/api/v1/user/cases';

export async function submitFileCase(payload: FileCasePayload) {
  const token = await getToken();
  if (!token) throw new Error('No auth token found');

  const formData = new FormData();

  // Append case fields
  formData.append('case[title]', payload.case.title);
  formData.append('case[court_id]', String(payload.case.court_id));
  formData.append('case[summary]', payload.case.summary);
  formData.append('case[registration_number]', 'REG-2024-023');
  formData.append('case[judgement_number]', 'JUD-2024-090');
  formData.append('case[case_number]', 'CASE-2024-866');

  // Documents - handle all documents
  payload.case.case_documents_attributes.forEach((doc, index) => {
    formData.append(
      `case[case_documents_attributes][${index}][document]`,
      doc.document,
    );
  });

  // Defendants (assuming only one for now)
  if (payload.case.defendants_attributes[0]) {
    const def = payload.case.defendants_attributes[0];
    formData.append('case[defendants_attributes][first_name]', def.first_name);
    formData.append('case[defendants_attributes][last_name]', def.last_name);
    formData.append('case[defendants_attributes][cid_no]', def.cid_no);
    formData.append(
      'case[defendants_attributes][phone_number]',
      def.phone_number,
    );
    formData.append('case[defendants_attributes][email]', def.email);

    // Address (assuming only one for now)
    if (def.addresses_attributes[0]) {
      const addr = def.addresses_attributes[0];
      formData.append(
        'case[defendants_attributes][addresses_attributes][0][dzongkhag]',
        addr.dzongkhag,
      );
      formData.append(
        'case[defendants_attributes][addresses_attributes][0][gewog]',
        addr.gewog,
      );
      formData.append(
        'case[defendants_attributes][addresses_attributes][0][street_address]',
        addr.street_address,
      );
      formData.append(
        'case[defendants_attributes][addresses_attributes][0][address_type]',
        addr.address_type,
      );
    }
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
}
