import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useUpdateSetting() {
    const myQueryClient = useQueryClient();

    // For updating a setting and re fetching the data
    const { isLoading: isUpdating, mutate: mutationUpdateSetting } = useMutation({
        // mutationFn only accepts one argument
        mutationFn: updateSetting,
        onSuccess: () => {
            toast.success('Setting successfully updated');
            // To cause a re fetch of the data after successfully updating a setting
            myQueryClient.invalidateQueries({ queryKey: ['settings'] });
        },
        // gets access to the error thrown by the mutationFn (updateSetting)
        onError: (err) => toast.error(err.message),
    });

    return { isUpdating, mutationUpdateSetting }
}