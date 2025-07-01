import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
    const myQueryClient = useQueryClient();

    // For creating a cabin and re fetching the data
    const { isLoading: isCreating, mutate: mutationCreateCabin } = useMutation({
        // mutationFn: (newCabin) => createEditCabin(newCabin) or this:
        mutationFn: createEditCabin,
        onSuccess: () => {
            toast.success('New Cabin successfully created');
            // To cause a re fetch of the data after successfully creating a cabin
            myQueryClient.invalidateQueries({ queryKey: ['cabins'] });
        },
        // onError receives the error thrown by the mutationFn (createEditCabin)
        onError: (err) => toast.error(err.message),
    });

    return { isCreating, mutationCreateCabin }
}
