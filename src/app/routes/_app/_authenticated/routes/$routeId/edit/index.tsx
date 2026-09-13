import { createFileRoute } from '@tanstack/react-router'
import {EditRoutePage} from "../../../../../../../pages/edit-route/ui/EditRoutePage.tsx";

export const Route = createFileRoute(
    '/_app/_authenticated/routes/$routeId/edit/',
)({
    component: EditRoute,
});

function EditRoute() {
    const {routeId} = Route.useParams();

    return (
        <EditRoutePage routeId={Number(routeId)} />
    );
}
