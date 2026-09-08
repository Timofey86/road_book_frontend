import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute('/_authenticated/profile')({
    component: ProfilePage,
});

function ProfilePage() {
    return <h1>Profile</h1>;
}
