import { useQuery } from "@tanstack/react-query";
import { getSettings } from '../../services/apiSettings';

export function useSettings() {
    // fetch and store data in the cache
    const { isLoading, error, data: settings } = useQuery({ queryKey: ['settings'], queryFn: getSettings });

    return { isLoading, error, settings }
}