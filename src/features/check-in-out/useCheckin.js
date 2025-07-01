import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
    const myQueryClient = useQueryClient();
    const navigate = useNavigate();

    // For updating a booking and re fetching the data
    const { isLoading: isCheckingIn, mutate: mutationCheckin } = useMutation({
        mutationFn: ({ bookingId, breakfastValues }) => updateBooking(bookingId, { status: 'checked-in', isPaid: true, ...breakfastValues }),

        // onSuccess receives the data return by the mutationFn (updateBooking)
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked in`);
            // To cause a re fetch of the data after successfully updating a booking
            myQueryClient.invalidateQueries({ active: true });
            // Navigate to homepage(dashboard)
            navigate('/');
        },
        // onError receives the error thrown by the mutationFn (updateBooking)
        onError: (err) => toast.error(err.message)
    });

    return { isCheckingIn, mutationCheckin }
}