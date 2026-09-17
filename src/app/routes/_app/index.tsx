import {createFileRoute} from "@tanstack/react-router";
import {ExplorePage} from "../../../pages/explore/ui/ExplorePage.tsx";
import type {RouteSortBy, SortOrder} from "../../../entities/route";
import {parseNonNegativeNumber} from "../../../shared/lib/parseNonNegativeNumbers.ts";


interface ExploreSearch {
    page?: number;
    search?: string;
    sortBy?: RouteSortBy;
    sortOrder?: SortOrder;
    minDistance?: number;
    maxDistance?: number;
    tags?: string;
}

interface RouteFilters {
    minDistance?: number;
    maxDistance?: number;
    tags?: string;
}

export const Route = createFileRoute('/_app/')({
    validateSearch: (search): ExploreSearch => {
        const page = Number(search.page);

        const routeSearch =
            typeof search.search === 'string'
                ? search.search.trim()
                : '';

        const sortBy =
            search.sortBy === 'createdAt' ||
            search.sortBy === 'likes' ||
            search.sortBy === 'distance'
                ? search.sortBy
                : undefined;

        const sortOrder =
            search.sortOrder === 'asc' ||
            search.sortOrder === 'desc'
                ? search.sortOrder
                : undefined;

        return {
            page:
                Number.isInteger(page) && page > 1
                    ? page
                    : undefined,

            search: routeSearch || undefined,
            sortBy,
            sortOrder,

            minDistance: parseNonNegativeNumber(search.minDistance),
            maxDistance: parseNonNegativeNumber(search.maxDistance),
            tags:
                typeof search.tags === 'string' && search.tags.trim()
                    ? search.tags
                    : undefined,
        };
    },
    component: ExploreRoute,
});


function ExploreRoute() {
    const {page = 1, search, sortBy, sortOrder, minDistance, maxDistance, tags} = Route.useSearch();
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

    const handleFiltersChange = (filters: RouteFilters) => {
        navigate({
            to: '.',
            search: (prev) => ({
                ...prev,
                page: undefined,
                minDistance: filters.minDistance,
                maxDistance: filters.maxDistance,
                tags: filters.tags,
            }),
        });
    };

    const handleSearchChange = (value: string) => {
        navigate({
            to: '.',
            search: (prev) => ({
                ...prev,
                page: undefined,
                search: value.trim() || undefined,
            }),
            replace: true,
        });
    };

    const handleSortChange = (
        newSortBy: RouteSortBy,
        newSortOrder: SortOrder,
    ) => {
        navigate({
            to: '.',
            search: (prev) => ({
                ...prev,
                page: undefined,
                sortBy:
                    newSortBy === 'createdAt' &&
                    newSortOrder === 'desc'
                        ? undefined
                        : newSortBy,
                sortOrder:
                    newSortBy === 'createdAt' &&
                    newSortOrder === 'desc'
                        ? undefined
                        : newSortOrder,
            }),
        });
    };

    return (
        <ExplorePage
            page={page}
            search={search ?? ''}
            sortBy={sortBy ?? 'createdAt'}
            sortOrder={sortOrder ?? 'desc'}
            minDistance={minDistance}
            maxDistance={maxDistance}
            tags={tags}
            onPageChange={handlePageChange}
            onSearchChange={handleSearchChange}
            onSortChange={handleSortChange}
            onFiltersChange={handleFiltersChange}
        />
    );
}

