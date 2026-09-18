import styles from './EditRoutePage.module.css';
import {routeDetailsQueryOptions} from "../../../entities/route";
import {useQuery} from "@tanstack/react-query";
import {Navigate} from "@tanstack/react-router";
import {appRoutes} from "../../../shared/lib/routes.ts";
import {currentUserQueryOptions} from '../../../entities/user';
import {EditRouteForm} from "./EditRouteForm.tsx";
import {useTranslation} from 'react-i18next';

interface EditRoutePageProps {
    routeId: number;
}
export function EditRoutePage({routeId}: EditRoutePageProps) {
    const {t} = useTranslation();
    const {
        data: route,
        isPending,
        isError,
    } = useQuery(
        routeDetailsQueryOptions(routeId),
    );

    const {
        data: currentUser,
        isPending: isCurrentUserPending,
    } = useQuery(currentUserQueryOptions);


    if (isPending || isCurrentUserPending) {
        return (
            <div className={styles.page}>
                {t('editRoute.loading')}
            </div>
        );
    }

    if (isError || !route) {
        return (
            <div className={styles.page}>
                {t('editRoute.loadError')}
            </div>
        );
    }

    if (!currentUser || route.userId !== currentUser.id) {
        return (
            <Navigate
                to={appRoutes.routeDetails}
                params={{
                    routeId: String(route.id),
                }}
            />
        );
    }

    return (
        <EditRouteForm
            key={route.id}
            route={route}
        />
    );
}


