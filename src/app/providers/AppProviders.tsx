import type {PropsWithChildren} from "react";
import {QueryProvider} from "./QueryProviders.tsx";
import {LanguageSync} from "../../shared/i18n/LanguageSync.tsx";

export function AppProviders({ children }: PropsWithChildren) {
    return (
        <QueryProvider>
            <LanguageSync />
            {children}
        </QueryProvider>
    );
}