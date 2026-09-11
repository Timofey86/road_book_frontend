import { createFileRoute } from '@tanstack/react-router'
import { EditRouteStopsPage } from "../../../../../../../pages/edit-route-stops/ui/EditRouteStopsPage";

export const Route = createFileRoute(
    '/_app/_authenticated/routes/$routeId/edit/stops',
)({
    component: EditRouteStopsRoute,
});

function EditRouteStopsRoute() {
    const { routeId } = Route.useParams();

    return (
        <EditRouteStopsPage
            routeId={Number(routeId)}
        />
    );
}
