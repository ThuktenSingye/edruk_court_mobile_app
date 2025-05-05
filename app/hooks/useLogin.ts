import {useMutation} from '@tanstack/react-query';
import type {LoginParams} from '../types/auth';
import {loginUser} from '../services/authService';
import type {ApiError} from '../types/error';
import useUserStore from '../store/useUserStore';
import {User} from '../types/user';
import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';

export const useLogin = () => {
  return useMutation<User, ApiError, LoginParams>({
    mutationFn: loginUser,
    onSuccess: response => {
      useUserStore.getState().setUser(response);
      Toast.show({
        type: 'success',
        text1: 'Login successful',
        position: 'top',
        visibilityTime: 2000,
      });
    },
    onError: error => {
      Alert.alert('Login Failed', error.message);
    },
  });
};
