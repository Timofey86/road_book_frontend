import { createFileRoute } from '@tanstack/react-router'
import {CreateRoutePage} from "../../../../../pages/create-route/ui/CreateRoutePage.tsx";

export const Route = createFileRoute(
    '/_app/_authenticated/routes/create',
)({
    component: CreateRoutePage,
});
