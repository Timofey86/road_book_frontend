import { createFileRoute } from '@tanstack/react-router'
import {LoginPage} from "../../../pages/login/ui/LoginPage.tsx";

export const Route = createFileRoute('/_guest/login')({
    component: LoginPage,
});
