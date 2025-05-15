import {useMutation} from '@tanstack/react-query';
import {signUpService} from '../services/authService';
import {User} from '../types/user';
import {ApiError} from '../types/error';

export const useSignUp = () =>
  useMutation<User, ApiError, FormData>({
    mutationFn: signUpService,
  });
