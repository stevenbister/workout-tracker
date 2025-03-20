import type { MouseEvent, ReactNode } from 'react';
import { useState } from 'react';

import { classList } from '../../utils/class-list';
import { Icon } from '../icon/icon';
import styles from './disclosure.module.scss';

export interface DisclosureProps {
    label: string;
    children: ReactNode;
    isOpen?: boolean;
    onToggle?: (isOpen?: boolean) => void;
}

export const Disclosure = ({
    label,
    children,
    isOpen,
    onToggle,
}: DisclosureProps) => {
    const [_isOpen, setIsOpen] = useState(!!isOpen);

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setIsOpen(!_isOpen);
        onToggle?.(_isOpen);
    };

    return (
        <details open={_isOpen}>
            <summary onClick={handleClick} className={styles.summary}>
                <Icon
                    spriteId="chevron-right"
                    className={classList(
                        styles.icon,
                        styles[_isOpen ? 'open' : 'closed']
                    )}
                />
                {label}
            </summary>

            {_isOpen && children}
        </details>
    );
};
