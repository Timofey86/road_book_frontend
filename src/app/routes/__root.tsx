import {createRootRouteWithContext, Outlet} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import type {QueryClient} from "@tanstack/react-query";
import {NotFoundPage} from "../../pages/not-found/ui/NotFoundPage.tsx";

interface RouterContext {
    queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootComponent,
    notFoundComponent: NotFoundPage,
});

function RootComponent() {
    return (
        <>
            <Outlet />
            {import.meta.env.DEV && (
                <TanStackRouterDevtools />
            )}
        </>
    );
}