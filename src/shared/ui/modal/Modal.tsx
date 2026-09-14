import {type PropsWithChildren, useEffect} from 'react';
import styles from './Modal.module.css';

interface ModalProps extends PropsWithChildren {
    open: boolean;
    onClose: () => void;
    title?: string;
}

export function Modal({
    open,
    onClose,
    title,
    children,
}: ModalProps) {

    useEffect(() => {
        if (!open) return;

        document.body.style.overflow = 'hidden';

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener(
                'keydown',
                handleEscape,
            );
        };
    }, [open, onClose]);

    if (!open) {
        return null;
    }

    return (
        <div
            className={styles.backdrop}
            onMouseDown={onClose}
        >
            <div
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >
                {title && (
                    <h2 className={styles.title}>
                        {title}
                    </h2>
                )}

                {children}
            </div>
        </div>
    );
}