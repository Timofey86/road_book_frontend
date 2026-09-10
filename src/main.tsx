import {createRoot} from 'react-dom/client'
import './app/styles/index.css'
import './shared/i18n/config';
import {RouterProvider} from "@tanstack/react-router";
import {router} from './app/router';
import {AppProviders} from "./app/providers/AppProviders.tsx";

createRoot(document.getElementById('root')!).render(
    <AppProviders>
        <RouterProvider router={router}/>
    </AppProviders>
)
