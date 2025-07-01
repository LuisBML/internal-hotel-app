import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
    // QUERY
    // fetch and store data in the cache
    const { isLoading, data: activities } = useQuery({ queryFn: getStaysTodayActivity, queryKey: ['today-activity'] });

    return { isLoading, activities }
}