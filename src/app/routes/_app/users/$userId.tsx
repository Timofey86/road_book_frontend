import {createFileRoute} from '@tanstack/react-router';
import {PublicProfilePage} from '../../../../pages/public-profile/ui/PublicProfilePage';

export const Route = createFileRoute('/_app/users/$userId')({
    component: PublicProfileRoute,
});

function PublicProfileRoute() {
    const {userId} = Route.useParams();

    return (
        <PublicProfilePage
            userId={Number(userId)}
        />
    );
}