import { useId } from 'react';

import type { Status } from '../../types';
import { classList } from '../../utils/class-list';
import styles from './alert.module.scss';

export interface AlertProps {
    status?: Status;
    heading?: string;
    description?: string;
    onClose?: () => void;
}

export const Alert = ({
    status = 'info',
    heading,
    description,
    onClose,
}: AlertProps) => {
    const headingId = useId();

    const isError = status === 'error';
    const hasContent = heading || description;

    return (
        <div
            role={isError ? 'alert' : undefined}
            className={classList(styles.alert, styles[status])}
            aria-labelledby={hasContent ? headingId : undefined}
        >
            {hasContent ? (
                <>
                    {heading && (
                        <span id={headingId} className={styles.heading}>
                            {heading}
                        </span>
                    )}
                    {description && (
                        <span className={styles.description}>
                            {description}
                        </span>
                    )}

                    {onClose && (
                        <button
                            className={styles.close}
                            onClick={onClose}
                            aria-label="Close alert"
                        >
                            &times;
                        </button>
                    )}
                </>
            ) : null}
        </div>
    );
};
