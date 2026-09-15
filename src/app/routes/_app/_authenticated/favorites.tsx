import { createFileRoute } from '@tanstack/react-router'
import {FavoritesPage} from "../../../../pages/favorites/ui/FavoritesPage.tsx";

interface FavoritesSearch {
    page: number;
}

export const Route = createFileRoute('/_app/_authenticated/favorites')({
    validateSearch: (search): FavoritesSearch => ({
        page: Math.max(1, Number(search.page) || 1),
    }),
    component: FavoritesRoute,
});

function FavoritesRoute() {
    const {page} = Route.useSearch();
    const navigate = Route.useNavigate();

    const handlePageChange = (newPage: number) => {
        navigate({
            to: '.',
            search: {
                page: newPage,
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
