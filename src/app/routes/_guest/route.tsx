import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import {currentUserQueryOptions} from "../../../entities/user";
import {GuestLayout} from "../../../widgets/guest-layout";

export const Route = createFileRoute('/_guest')({
    beforeLoad: async ({context}) => {
        const user = await context.queryClient
            .ensureQueryData(currentUserQueryOptions)

        if (user) {
            throw redirect({
                to: '/',
                search: {page: 1}
            });
        }
    },
    component: GuestRoute,
})

function GuestRoute() {
    return (
        <GuestLayout>
            <Outlet/>
        </GuestLayout>
    );
}
