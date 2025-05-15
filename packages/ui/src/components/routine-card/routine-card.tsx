import type { LinkComponentProps } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';

import { classList } from '../../utils/class-list';
import styles from './routine-card.module.css';

export interface RoutineCardProps {
    heading: string;
    exerciseList: (string | undefined)[];
    link: Omit<LinkComponentProps<'a'>, 'className'>;
    button: ReactNode;
}

export const RoutineCard = ({
    heading,
    exerciseList,
    link,
    button,
}: RoutineCardProps) => (
    <article
        className={classList(
            styles.card,
            'bg-global-bg-light rounded-lg p-3 transition-transform ease-in has-[.link:active]:scale-[0.97]'
        )}
    >
        <Link {...link} className="link z-1">
            <span className="sr-only">{heading}</span>
        </Link>

        <div className="flex flex-col">
            <h2 className="mb-1.5 max-w-[20ch] text-pretty text-base">
                {heading}
            </h2>

            {exerciseList.length > 0 ? (
                <p className="text-global-text-light max-w-[30ch] text-sm">
                    {exerciseList.join(', ')}
                </p>
            ) : null}

            <div className="mt-2 flex flex-col">{button}</div>
        </div>
    </article>
);
