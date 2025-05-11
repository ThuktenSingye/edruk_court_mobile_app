import {useQuery} from '@tanstack/react-query';
import {fetchHearingDocuments} from '../services/fetchHearingDocuments';
export const useHearingDocuments = (caseId: number, hearingId: number) => {
  return useQuery({
    queryKey: ['hearingDocuments', caseId, hearingId],
    queryFn: () => fetchHearingDocuments(caseId, hearingId),
    enabled: !!caseId && !!hearingId, // only fetch if both IDs are available
  });
};
