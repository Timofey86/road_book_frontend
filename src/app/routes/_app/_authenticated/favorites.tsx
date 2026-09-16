import { createFileRoute } from '@tanstack/react-router'
import {FavoritesPage} from "../../../../pages/favorites/ui/FavoritesPage.tsx";

interface FavoritesSearch {
    page?: number;
}

export const Route = createFileRoute('/_app/_authenticated/favorites')({
    validateSearch: (search): FavoritesSearch => {
        const page = Number(search.page);

        return {
            page:
                Number.isInteger(page) && page > 1
                    ? page
                    : undefined,
        };
    },
    component: FavoritesRoute,
});

function FavoritesRoute() {
    const {page = 1} = Route.useSearch();
    const navigate = Route.useNavigate();

    const handlePageChange = (newPage: number) => {
        navigate({
            to: '.',
            search: {
                page:
                    newPage > 1
                        ? newPage
                        : undefined,
            },
        });
    };

    return (
        <FavoritesPage
            page={page}
            onPageChange={handlePageChange}
        />
    );
}
