import * as Keychain from 'react-native-keychain';

export async function extractAndStoreToken(response: Response): Promise<boolean> {
  const authHeader =
    response.headers.get('Authorization') || response.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    await Keychain.setGenericPassword('authToken', token);
    return true;
  }
  return false;
}

export async function getToken(): Promise<string | null> {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.error('Failed to get token from Keychain:', error);
    return null;
  }
}
