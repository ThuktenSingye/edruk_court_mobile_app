import {useQuery} from '@tanstack/react-query';
import {fetchCases} from '../services/caseListService';
import {Case} from '../types/case';

export function useCaseList() {
  return useQuery<Case[]>({
    queryKey: ['cases'],
    queryFn: async () => {
      const response = await fetchCases();
      return response.data;
    },
  });
}
