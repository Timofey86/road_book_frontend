import type {RouteStop} from "../../../entities/route";
import {useSortable} from "@dnd-kit/sortable";
import { GripVertical } from 'lucide-react';
import { CSS } from '@dnd-kit/utilities';
import styles from './SortableStopItem.module.css';

interface SortableStopItemProps {
    stop: RouteStop;
}

export function SortableStopItem({
    stop,
}: SortableStopItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: stop.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`${styles.stop} ${
                isDragging ? styles.dragging : ''
            }`}
        >
            <button
                type="button"
                className={styles.dragHandle}
                {...attributes}
                {...listeners}
                aria-label={`Move ${stop.name}`}
            >
                <GripVertical size={18} />
            </button>

            <div className={styles.content}>
                <strong>
                    {stop.position}. {stop.name}
                </strong>

                {stop.address && (
                    <span>{stop.address}</span>
                )}
            </div>
        </div>
    );
}