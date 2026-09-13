import { createFileRoute } from '@tanstack/react-router'
import {RouteDetailsPage} from "../../../../../pages/route-details/ui/RouteDetailsPage.tsx";

export const Route = createFileRoute(
    '/_app/routes/$routeId/',
)({
    component: RouteDetailsRoute,
});

function RouteDetailsRoute() {
    const { routeId } = Route.useParams();

    return (
        <RouteDetailsPage
            routeId={Number(routeId)}
        />
    );
}