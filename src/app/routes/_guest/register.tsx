import { createFileRoute } from '@tanstack/react-router';
import {RegisterPage} from "../../../pages/register/ui/RegisterPage.tsx";

export const Route = createFileRoute('/_guest/register')({
    component: RegisterPage,
});

