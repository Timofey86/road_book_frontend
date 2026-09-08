import type {PropsWithChildren} from "react";
import {QueryProvider} from "./QueryProviders.tsx";

export function AppProviders({ children }: PropsWithChildren) {
    return (
        <QueryProvider>
            {children}
        </QueryProvider>
    );
}