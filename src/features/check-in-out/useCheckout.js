import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
    const myQueryClient = useQueryClient();

    // For updating a booking and re fetching the data
    const { isLoading: isCheckingOut, mutate: mutationCheckout } = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId, { status: 'checked-out' }),

        // onSuccess receives the data return by the mutationFn (updateBooking)
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked out`);
            // To cause a re fetch of the data after successfully updating a booking
            myQueryClient.invalidateQueries({ active: true });
        },
        // onError receives the error thrown by the mutationFn (updateBooking)
        onError: (err) => toast.error(err.message)
    });

    return { isCheckingOut, mutationCheckout }
}