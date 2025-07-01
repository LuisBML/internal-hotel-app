import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking() {
    // query client instance
    const myQueryClient = useQueryClient();

    // For deleting a booking and re fetching the data
    const { isLoading: isDeletingBooking, mutate: mutationDeleteBooking } = useMutation({
        // mutationFn: (id) => deleteBooking(id) or this:
        mutationFn: deleteBooking,
        onSuccess: () => {
            toast.success('Booking successfully deleted');
            // To cause a re fetch of the data after successfully deleting a booking
            myQueryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
        // gets access to the error thrown by the mutationFn (deleteBooking)
        onError: (err) => toast.error(err.message),
    });

    return { isDeletingBooking, mutationDeleteBooking }
}
