import {useQuery} from '@tanstack/react-query';
import {fetchCaseHearings} from '../services/hearingService';
export const useCaseHearings = (caseId: number) => {
  return useQuery({
    queryKey: ['caseHearings', caseId],
    queryFn: () => fetchCaseHearings(caseId),
  });
};
