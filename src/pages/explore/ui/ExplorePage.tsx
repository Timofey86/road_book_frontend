import {useQuery} from "@tanstack/react-query";
import {currentUserQueryOptions} from "../../../entities/user";
import {useLogoutMutation} from "../../../features/auth";

export function ExplorePage() {

    const logoutMutation = useLogoutMutation();

    const {
        data: user,
        isPending,
        isError,
        error,
    } = useQuery(currentUserQueryOptions);

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>{error.message}</div>;
    }

    return (
        <div>
            {user ? (
                <>
                    <p>Hello, {user.name}!</p>

                    <button
                        type="button"
                        onClick={() => logoutMutation.mutate()}
                    >
                        Log out
                    </button>
                </>
            ) : (
                <p>Hello, guest!</p>
            )}
        </div>

    );
}