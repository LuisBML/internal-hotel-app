import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
    // fetch and store data in the cache
    const {
        isLoading,
        data: cabins,
        error,
    } = useQuery({ queryKey: ['cabins'], queryFn: getCabins });

    return {
        isLoading,
        cabins,
        error
    }
}