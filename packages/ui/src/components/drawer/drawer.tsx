import type { ReactNode } from 'react';
import type { DialogProps as VaulDialogProps } from 'vaul';
import { Drawer as VaulDrawer } from 'vaul';

import styles from './drawer.module.scss';

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
                <VaulDrawer.Overlay className={styles.overlay} />
                <VaulDrawer.Content className={styles.content}>
                    <VaulDrawer.Handle className={styles.handle} />
                    <VaulDrawer.Title>{title}</VaulDrawer.Title>

                    {children}
                </VaulDrawer.Content>
            </VaulDrawer.Portal>
        </VaulDrawer.Root>
    );
};
