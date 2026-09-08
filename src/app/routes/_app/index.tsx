import {createFileRoute} from "@tanstack/react-router";
import {ExplorePage} from "../../../pages/explore/ui/ExplorePage.tsx";

export const Route = createFileRoute('/_app/')({
    component: ExplorePage,
});

