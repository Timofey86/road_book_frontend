import {createFileRoute} from '@tanstack/react-router';
import {EditProfilePage} from "../../../../../pages/edit-profile/ui/EditProfilePage.tsx";

export const Route = createFileRoute(
    '/_app/_authenticated/profile/edit',
)({
    component: EditProfilePage,
});
