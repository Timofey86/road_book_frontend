import { queryOptions } from '@tanstack/react-query';
import { getRoute } from '../api/getRoute';

export function routeDetailsQueryOptions(routeId: number) {
    return queryOptions({
        queryKey: ['route', routeId],
        queryFn: () => getRoute(routeId),
    });
}