import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
    const navigate = useNavigate();
    // get current query client
    const queryClient = useQueryClient();

    const { mutate: mutationLogout, isLoading: isLogginOut } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            // empty React Query cache (delete user related data)
            queryClient.removeQueries();

            // redirect
            // replace: true -> erase the place in the history the user was earlier,
            // enable back action or previous page in the web browser to work properly
            navigate('/login', { replace: true });
        }
    })

    return { mutationLogout, isLogginOut }
}