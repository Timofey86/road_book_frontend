import {createFileRoute} from '@tanstack/react-router';
import {ProfilePage} from '../../../../../pages/profile/ui/ProfilePage.tsx';

export const Route = createFileRoute(
    '/_app/_authenticated/profile/',
)({
    component: ProfilePage,
});
