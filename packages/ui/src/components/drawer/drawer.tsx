import type { ReactNode } from 'react';
import type { DialogProps as VaulDialogProps } from 'vaul';
import { Drawer as VaulDrawer } from 'vaul';

export type DrawerProps = VaulDialogProps & {
    children: ReactNode;
    title: ReactNode;
    trigger: ReactNode;
};

export const Drawer = ({ trigger, children, title, ...rest }: DrawerProps) => {
    return (
        <VaulDrawer.Root {...rest}>
            <VaulDrawer.Trigger asChild>{trigger}</VaulDrawer.Trigger>

            <VaulDrawer.Portal>
                <VaulDrawer.Overlay className="fixed inset-0 bg-gray-700/50" />
                <VaulDrawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex min-h-[30vh] flex-col rounded-lg bg-gray-100">
                    <VaulDrawer.Handle className="m-2" />
                    <VaulDrawer.Title>{title}</VaulDrawer.Title>

                    {children}
                </VaulDrawer.Content>
            </VaulDrawer.Portal>
        </VaulDrawer.Root>
    );
};
