import {useQuery} from '@tanstack/react-query';
import {getHearingSchedules} from '../services/scheduleServices';

import {HearingSchedule} from '../types/schedule';

export function useSchedule() {
  return useQuery<HearingSchedule[]>({
    queryKey: ['hearingSchedules'],
    queryFn: async () => {
      const response = await getHearingSchedules();
      return response.data;
    },
  });
}
