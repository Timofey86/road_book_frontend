import styles from './CreateRoutePage.module.css';
import {CreateRouteForm} from "../../../features/create-route";

export function CreateRoutePage() {
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Create a new route</h1>
                <p>
                    Add the basic information first. You can configure stops
                    and build the route on the next step.
                </p>
            </div>

            <CreateRouteForm />
        </div>
    );
}