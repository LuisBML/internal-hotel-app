import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";

export function useDeleteCabin() {
    // query client instance
    const myQueryClient = useQueryClient();

    // For deleting a cabin and re fetching the data
    const { isLoading: isDeleting, mutate: mutationDeleteCabin } = useMutation({
        // mutationFn: (id) => deleteCabin(id) or this:
        mutationFn: deleteCabin,
        onSuccess: () => {
            toast.success('Cabin successfully deleted');
            // To cause a re fetch of the data after successfully deleting a cabin
            myQueryClient.invalidateQueries({ queryKey: ['cabins'] });
        },
        // gets access to the error thrown by the mutationFn (deleteCabin)
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, mutationDeleteCabin }
}
