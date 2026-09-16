import { createFileRoute } from '@tanstack/react-router'
import {RouteDetailsPage} from "../../../../../pages/route-details/ui/RouteDetailsPage";
import type {RouteDetailsTab} from "../../../../../pages/route-details/model/types";

interface RouteDetailsSearch {
    tab?: Exclude<RouteDetailsTab, 'overview'>;
}


export const Route = createFileRoute(
    '/_app/routes/$routeId/',
)({
    validateSearch: (search): RouteDetailsSearch => ({
        tab:
            search.tab === 'photos' ||
            search.tab === 'comments'
                ? search.tab
                : undefined,
    }),
    component: RouteDetailsRoute,
});

function RouteDetailsRoute() {
    const { routeId } = Route.useParams();

    const {tab} = Route.useSearch();
    const navigate = Route.useNavigate();

    const activeTab = tab ?? 'overview';

    const handleTabChange = (tab: RouteDetailsTab) => {
        navigate({
            search:
                tab === 'overview'
                    ? {}
                    : {tab},
            replace: true,
            resetScroll: false
        });
    };

    return (
        <RouteDetailsPage
            routeId={Number(routeId)}
            activeTab={activeTab}
            onTabChange={handleTabChange}
        />
    );
}