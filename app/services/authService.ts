import type {LoginParams} from '../types/auth';
import {ApiError} from '../types/error';
import {User} from '../types/user';
import {extractAndStoreToken} from '../utils/token.ts';

export const loginUser = async ({
  email,
  password,
}: LoginParams): Promise<User> => {
  console.log('login Credential:', email, password);
  const response = await fetch('http://10.2.35.53:3001/api/v1/auth/sign_in', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({user: {email, password}}),
  });

  const json = await response.json();
  if (json.status !== 200) {
    throw {
      status: json.status,
      message: json.message || 'Login Failed',
      data: json.data,
    } as ApiError;
  }
  await extractAndStoreToken(response);

  return json.data;
};

export const logOutUser = async () => {
  return Promise.resolve();
};
