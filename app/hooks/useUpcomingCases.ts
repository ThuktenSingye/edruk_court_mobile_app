import {useQuery} from '@tanstack/react-query';
import {fetchUpcomingCases} from '../services/upcomingCaseService';
import {UpcomingCase} from '../types/upcomingcases';

export function useUpcomingCases() {
  return useQuery<UpcomingCase[]>({
    queryKey: ['upcomingCases'],
    queryFn: async () => {
      const response = await fetchUpcomingCases();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}
