import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
    // get current user and store it in the cache
    const { isLoading: isLoadingUser, data: user } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser
    });

    return { isLoadingUser, user, isAuthenticated: user?.role === 'authenticated' }
}