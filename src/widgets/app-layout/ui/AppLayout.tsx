import type {PropsWithChildren} from "react";
import styles from './AppLayout.module.css';
import {Sidebar} from "../../sidebar";
import {Header} from "../../header";


export function AppLayout({ children }: PropsWithChildren) {
    return (
        <div className={styles.layout}>
            <Sidebar />

            <div className={styles.content}>
                <Header />

                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </div>
    );
}