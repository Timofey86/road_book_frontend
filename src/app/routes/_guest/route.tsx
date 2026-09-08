import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import {currentUserQueryOptions} from "../../../entities/user";

export const Route = createFileRoute('/_guest')({
    beforeLoad: async ({ context }) => {
        const user = await context.queryClient
            .ensureQueryData(currentUserQueryOptions)

        if (user) {
            throw redirect({
                to: '/',
            });
        }
    },
  component: GuestLayout,
})

function GuestLayout() {
    return <Outlet />;
}
