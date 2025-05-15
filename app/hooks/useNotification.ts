import {useQuery} from '@tanstack/react-query';
import {fetchNotification} from '../services/notificationService';

export function useNotifications() {
  return useQuery<any[]>({
    queryKey: ['cases'],
    queryFn: async () => {
      const response = await fetchNotification();
      return response.data;
    },
  });
}
