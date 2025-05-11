import {useQuery} from '@tanstack/react-query';
import {fetchActiveCases} from '../services/caseService';
import {Case} from '../types/case';

export function useActiveCase() {
  return useQuery<Case[]>({
    queryKey: ['activeCases'],
    queryFn: async () => {
      const response = await fetchActiveCases();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}
