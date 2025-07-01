import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings';

export function useRecentStays() {
  // URL param
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'));

  // Get past date. Last 7, 30 or 90 days
  // subDays(): Subtract the specified number of days from the given date.
  const queryDate = subDays(new Date(), numDays).toISOString();

  // QUERY
  // fetch and store data in the cache
  // - queryKey will be store in the cache and identifies stays data 
  // - whenever the queryKey changes (e.g. last-${numDays}) React Query will re-fetch the data
  const { isLoading: isLoadingStays, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ['stays', `last-${numDays}`],
  });

  const confirmedStays = stays?.filter(stay => stay.status === 'checked-in' || stay.status === 'checked-out');

  return { isLoadingStays, stays, confirmedStays, numDays };
}
