import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute('/_app/_authenticated/profile')({
    component: ProfilePage,
});

function ProfilePage() {
    return <h1>Profile</h1>;
}
