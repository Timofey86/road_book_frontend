import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'

import {currentUserQueryOptions} from "../../../entities/user";

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: async ({context}) => {
            const user = await context.queryClient.ensureQueryData(
                currentUserQueryOptions
            )

           if (!user) {
               throw redirect({
               to: '/login'
           })
        }
    },
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
    return <Outlet />;
}
