import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
    // URL param
    const { bookingId } = useParams()

    // fetch and store data in the cache
    // - queryKey will be store in the cache and identifies a booking 
    // - whenever the queryKey changes React Query will re-fetch the data
    const {
        isLoading,
        data: booking,
        error,
    } = useQuery({
        queryKey: ['booking', bookingId],
        queryFn: () => getBooking(bookingId)
    });

    return {
        isLoading,
        booking,
        error
    }
}