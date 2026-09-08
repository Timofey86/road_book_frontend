import { createFileRoute, Outlet } from '@tanstack/react-router';

import { AppLayout } from '../../../widgets/app-layout';

export const Route = createFileRoute('/_app')({
    component: AppRoute,
});

function AppRoute() {
    return (
        <AppLayout>
            <Outlet />
        </AppLayout>
    );
}