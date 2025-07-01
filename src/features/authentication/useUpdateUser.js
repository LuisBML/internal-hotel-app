import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
    // get current query client
    const myQueryClient = useQueryClient();

    // For updating the current user and re fetching the data
    const { isLoading: isUpdatingUser, mutate: mutationUpdateUser } = useMutation({
        // mutationFn only accepts one argument
        // mutationFn: (newUserData) => updateCurrentUser(newUserData)
        mutationFn: updateCurrentUser,
        // onSuccess receives the data (updatedUser) return by the mutationFn (updateCurrentUser)
        // onSuccess: (updatedUser)
        onSuccess: () => {
            toast.success('User successfully updated');
            // manually set some data into the React Query cache
            // myQueryClient.setQueryData(['user'], updatedUser.user);

            // To cause a re fetch of the data after successfully updating the current user
            myQueryClient.invalidateQueries({ queryKey: ['user'] });
        },
        // gets access to the error thrown by the mutationFn (updateCurrentUser)
        onError: (err) => toast.error(err.message),
    });

    return { isUpdatingUser, mutationUpdateUser }
}