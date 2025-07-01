import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
    // get current query client
    const queryClient = useQueryClient()

    const navigate = useNavigate();

    const { mutate: mutationLogin, isLoading } = useMutation({
        mutationFn: ({ email, password }) => login({ email, password }),
        // onSuccess receives the data (user) return by the mutationFn (login)
        onSuccess: (currentUser) => {
            // manually set some data into the React Query cache
            queryClient.setQueryData(['user'], currentUser.user);
            // redirect 
            // replace: true -> erase the place in the history the user was earlier,
            // enable back action or previous page in the web browser to work properly
            navigate('/dashboard', { replace: true });
        },
        // onError receives the error thrown by the mutationFn (login)
        onError: () => toast.error('Provided email or password are incorrect')
    });

    return { mutationLogin, isLoading };
}