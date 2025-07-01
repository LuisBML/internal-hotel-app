import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { ELEMENTS_PER_PAGE } from '../../utils/constants';

export function useBookings() {
    // get current query client
    const queryClient = useQueryClient();

    // URL params
    const [searchParams] = useSearchParams();

    // FILTER
    const filterParam = searchParams.get('status');
    const filterObj = !filterParam || filterParam === 'all' ? null : { field: 'status', value: filterParam }
    // const filter = !filterValue || filterValue === 'all' ? null : { field: 'totalPrice', value: filterValue, method: 'gte' }

    // SORT
    const sortParam = searchParams.get('sortBy') || 'startDate-desc';
    const [field, direction] = sortParam.split('-');
    const sortObj = { field, direction };

    // PAGINATION
    // URL param
    const page = !searchParams.get('page')
        ? 1
        : Number(searchParams.get('page'));

    // QUERY
    // fetch and store data in the cache
    // - queryKey will be store in the cache and identifies bookings data 
    // - whenever the queryKey changes (e.g. page) React Query will re-fetch the data
    const {
        isLoading,
        data: { data: bookings, count: numBookings } = {},
        error,
    } = useQuery({
        queryKey: ['bookings', filterObj, sortObj, page],
        queryFn: () => getBookings({ filterObj, sortObj, page })
    });

    // From above
    // data = {data: {..}, count: ..} destructuring
    // destructuring -> data: { data: bookings, count: numBookings }
    // defaul value = {}

    // PRE-FETCH 
    const pageCount = Math.ceil(numBookings / ELEMENTS_PER_PAGE)

    // getting the next page data for pagination
    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ['bookings', filterObj, sortObj, page + 1],
            queryFn: () => getBookings({ filterObj, sortObj, page: page + 1 })
        });
    }

    // getting the previous page data for pagination
    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ['bookings', filterObj, sortObj, page - 1],
            queryFn: () => getBookings({ filterObj, sortObj, page: page - 1 })
        });
    }

    return {
        isLoading,
        bookings,
        numBookings,
        error
    }
}