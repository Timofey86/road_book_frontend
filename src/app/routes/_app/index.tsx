import {createFileRoute} from "@tanstack/react-router";
import {ExplorePage} from "../../../pages/explore/ui/ExplorePage.tsx";

interface ExploreSearch {
    page?: number;
}

export const Route = createFileRoute('/_app/')({
    validateSearch: (search): ExploreSearch => {
        const page = Number(search.page);

        return {
            page:
                Number.isInteger(page) && page > 1
                    ? page
                    : undefined,
        };
    },
    component: ExploreRoute,
});


function ExploreRoute() {
    const {page = 1} = Route.useSearch();
    const navigate = Route.useNavigate();

    const handlePageChange = (newPage: number) => {
        navigate({
            to: '.',
            search: {
                page: newPage > 1
                    ? newPage
                    : undefined,
            },
        });
    };

    return (
        <ExplorePage
            page={page}
            onPageChange={handlePageChange}
        />
    );
}

