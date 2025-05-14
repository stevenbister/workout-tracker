import { Toaster as SonnerToaster, toast as sonnerToast } from 'sonner';

import type { Status } from '../../types';
import { classList } from '../../utils/class-list';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';

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
    <div
        className={classList(
            'shadow-xs grid min-w-80 grid-cols-[auto_minmax(1rem,1fr)_auto] items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-gray-500'
        )}
    >
        {status === 'error' || status === 'success' ? (
            <ToastStatusIcon status={status} />
        ) : null}

        <div className={classList('col-[1_/_3]', status && 'col-[2_/_3]')}>
            <p className="mb-0 text-sm font-semibold">{title}</p>
            {description ? (
                <p className="mb-0 mt-1 text-sm text-gray-600">{description}</p>
            ) : null}
        </div>

        {button ? (
            <Button
                variant="ghost"
                className="p-4! col-[3_/_-1] self-start"
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
        className="w-5 shrink-0 fill-transparent stroke-[currentcolor]"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    />
);

const ToastStatusIcon = ({ status }: { status: Status }) => {
    const className = 'col-[1_/_2] w-5 shrink-0 self-start';

    return status === 'error' ? (
        <Icon spriteId="error" title="error" className={className} />
    ) : (
        <Icon spriteId="success" title="success" className={className} />
    );
};
