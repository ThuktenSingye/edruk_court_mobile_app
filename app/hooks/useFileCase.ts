import {useMutation} from '@tanstack/react-query';
import {FileCasePayload} from '../types/filecase';
import {submitFileCase} from '../services/fileCaseService';

export function useFileCase() {
  return useMutation({
    mutationFn: (payload: FileCasePayload) => submitFileCase(payload),
  });
}
