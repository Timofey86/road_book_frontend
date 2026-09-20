import {type PropsWithChildren, useState} from "react";
import styles from './AppLayout.module.css';
import {Sidebar} from "../../sidebar";
import {Header} from "../../header";


export function AppLayout({ children }: PropsWithChildren) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = () => {
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className={styles.layout}>
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={closeSidebar}
            />

            {isSidebarOpen && (
                <div
                    className={styles.overlay}
                    onClick={closeSidebar}
                    aria-hidden="true"
                />
            )}

            <div className={styles.content}>
                <Header onMenuClick={openSidebar}/>

                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </div>
    );
}