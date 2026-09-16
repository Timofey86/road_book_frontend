import {createFileRoute} from '@tanstack/react-router';
import {MyRoutesPage} from '../../../../pages/my-routes/ui/MyRoutesPage.tsx';

interface MyRoutesSearch {
    page?: number;
}

export const Route = createFileRoute(
    '/_app/_authenticated/my-routes',
)({
    validateSearch: (search): MyRoutesSearch => {
        const page = Number(search.page);

        return {
            page:
                Number.isInteger(page) && page > 1
                    ? page
                    : undefined,
        };
    },
    component: MyRoutesRoute,
});

function MyRoutesRoute() {
    const {page = 1} = Route.useSearch();
    const navigate = Route.useNavigate();

    const handlePageChange = (
        newPage: number,
    ) => {
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
        <MyRoutesPage
            page={page}
            onPageChange={handlePageChange}
        />
    );
}