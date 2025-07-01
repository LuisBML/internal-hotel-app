import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
    // URL param
    const [searchParams] = useSearchParams();

    const numDays = !searchParams.get('last') ? 7 : Number(searchParams.get('last'));

    // Get past date. Last 7, 30 or 90 days
    // subDays(): Subtract the specified number of days from the given date.
    const queryDate = subDays(new Date(), numDays).toISOString();

    // QUERY
    // fetch and store data in the cache
    // - queryKey will be store in the cache and identifies bookings data 
    // - whenever the queryKey changes (e.g. last-${numDays}) React Query will re-fetch the data
    const { isLoading: isLoadingBookings, data: recentBookings } = useQuery({
        queryFn: () => getBookingsAfterDate(queryDate),
        queryKey: ['bookings', `last-${numDays}`]
    });

    return { isLoadingBookings, recentBookings }

}