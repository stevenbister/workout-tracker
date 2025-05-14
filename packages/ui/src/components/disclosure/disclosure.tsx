import type { MouseEvent, ReactNode } from 'react';
import { useState } from 'react';

import { classList } from '../../utils/class-list';
import { Icon } from '../icon/icon';

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
            <summary
                onClick={handleClick}
                className="inline-flex cursor-pointer items-center gap-1 pb-3 text-base font-semibold marker:hidden marker:content-none"
            >
                <Icon
                    spriteId="chevron-right"
                    className={classList(
                        'stroke-3 transition-transform ease-in',
                        _isOpen ? 'rotate-90' : ''
                    )}
                />
                {label}
            </summary>

            {_isOpen && children}
        </details>
    );
};
