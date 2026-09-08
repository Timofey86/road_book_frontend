import {useState} from "react";
import {useLoginMutation} from "../../../features/auth";
import {useNavigate} from "@tanstack/react-router";

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginMutation = useLoginMutation()
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        loginMutation.mutate({
            email,
            password
        },
            {
                onSuccess: () => {
                    navigate({ to: '/' });
                },
            },
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
            />

            <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
            />

            <button
                type="submit"
                disabled={loginMutation.isPending}
            >
                {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
            </button>

            {loginMutation.isError && (
                <p>Login failed</p>
            )}
        </form>
    )
}