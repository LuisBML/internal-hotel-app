import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
    const myQueryClient = useQueryClient();

    // For editing a cabin and re fetching the data
    const { isLoading: isEditing, mutate: mutationEditCabin } = useMutation({
        // mutationFn only accepts one argument
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success('Cabin successfully edited');
            // To cause a re fetch of the data after successfully editing a cabin
            myQueryClient.invalidateQueries({ queryKey: ['cabins'] });
        },
        // gets access to the error thrown by the mutationFn (createEditCabin)
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, mutationEditCabin }
}