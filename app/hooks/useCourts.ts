import {useQuery} from '@tanstack/react-query';
import {fetchCourts} from '../services/courtService';
import {CourtResponse} from '../types/court';

export const useCourts = () => {
  return useQuery<CourtResponse, Error>({
    queryKey: ['courts'],
    queryFn: fetchCourts,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });
};
