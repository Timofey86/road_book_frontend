import { createRoot } from 'react-dom/client'
import './app/styles/index.css'
import {RouterProvider} from "@tanstack/react-router";
import { router } from './app/router';

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
