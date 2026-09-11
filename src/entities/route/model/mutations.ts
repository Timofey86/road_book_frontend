import {useMutation} from "@tanstack/react-query";
import {createRoute} from "../api/createRoute.ts";

export function useCreateRouteMutation() {
    return useMutation({
        mutationFn: createRoute,
    });
}