import { Toaster as SonnerToaster, toast as sonnerToast } from 'sonner';

import type { Status } from '../../types';
import { classList } from '../../utils/class-list';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import styles from './toast.module.scss';

export interface ToastProps {
    id: string | number;
    title: string;
    description?: string;
    status?: Status;
    button?: {
        onClick?: () => void;
    };
}

type toast = Omit<typeof sonnerToast, 'custom'> & {
    render: (props: Omit<ToastProps, 'id'>) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const toast: toast = {
    ...sonnerToast,
    render: ({ title, description, button, status }) =>
        sonnerToast.custom((id) => (
            <Toast
                id={id}
                title={title}
                description={description}
                button={
                    button && {
                        onClick: button.onClick ?? undefined,
                    }
                }
                status={status}
            />
        )),
};

export const Toaster = () => <SonnerToaster />;

export const Toast = ({
    id,
    title,
    description,
    button,
    status,
}: ToastProps) => (
    <div className={classList(styles.toast, status && styles[status])}>
        {status === 'error' || status === 'success' ? (
            <ToastStatusIcon status={status} />
        ) : null}

        <div className={styles.content}>
            <p className={styles.title}>{title}</p>
            {description ? (
                <p className={styles.description}>{description}</p>
            ) : null}
        </div>

        {button ? (
            <Button
                variant="link"
                className={styles.button}
                onClick={() => {
                    button?.onClick?.();
                    sonnerToast.dismiss(id);
                }}
            >
                <ToastCloseIcon />
                <span className="sr-only">Dismiss toast</span>
            </Button>
        ) : null}
    </div>
);

const ToastCloseIcon = () => (
    <Icon
        spriteId="close"
        className={classList(styles.icon, styles['close-icon'])}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    />
);

const ToastStatusIcon = ({ status }: { status: Status }) =>
    status === 'error' ? (
        <Icon
            spriteId="error"
            title="error"
            className={classList(styles.icon, styles['status-icon'])}
        />
    ) : (
        <Icon
            spriteId="success"
            title="success"
            className={classList(styles.icon, styles['status-icon'])}
        />
    );
