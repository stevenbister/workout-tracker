import { Toaster as SonnerToaster, toast as sonnerToast } from 'sonner';

import type { Status } from '../../types';
import { classList } from '../../utils/class-list';
import { Button } from '../button/button';
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
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.icon}
        aria-hidden="true"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
    </svg>
);

const ToastStatusIcon = ({ status }: { status: Status }) =>
    status === 'error' ? (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={classList(styles.icon, styles['status-icon'])}
            aria-hidden="true"
        >
            <title>error</title>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336m-5 11.66a1 1 0 0 0 -1 1v.01a1 1 0 0 0 2 0v-.01a1 1 0 0 0 -1 -1m0 -7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0 -1 -1" />
        </svg>
    ) : (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={classList(styles.icon, styles['status-icon'])}
            aria-hidden="true"
        >
            <title>success</title>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
        </svg>
    );
