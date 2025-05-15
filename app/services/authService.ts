import type {LoginParams} from '../types/auth';
import {ApiError} from '../types/error';
import {User} from '../types/user';
import {extractAndStoreToken} from '../utils/token.ts';
import API_HOST from '../utils/ip.ts';

const API_URL = `${API_HOST}/api/v1/auth/sign_in`;

export const loginUser = async ({
  email,
  password,
}: LoginParams): Promise<User> => {
  console.log('login Credential:', email, password);
  const response = await fetch(API_URL, {
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


export const signUpService = async (formData: FormData): Promise<User> => {
  const response = await fetch(`${API_HOST}/api/v1/auth`, {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      // 'Content-Type' should NOT be set manually when sending FormData
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new ApiError(errorData.message || 'Signup failed', response.status);
  }

  const data = await response.json();
  return data.user as User;
};
