import type { LinkComponentProps } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

import { Button } from '../button/button';
import styles from './routine-card.module.scss';

export interface RoutineCardProps {
    heading: string;
    exerciseList: (string | undefined)[];
    link: Omit<LinkComponentProps<'a'>, 'className'>;
    button: {
        label: string;
        onClick: () => void;
    };
}

export const RoutineCard = ({
    heading,
    exerciseList,
    link,
    button: { label, onClick },
}: RoutineCardProps) => (
    <article className={styles.card}>
        <Link {...link} className={styles.link}>
            <span className="sr-only">{heading}</span>
        </Link>

        <div className={styles.inner}>
            <h2 className={styles.heading}>{heading}</h2>

            {exerciseList.length > 0 ? (
                <p className={styles.list}>{exerciseList.join(', ')}</p>
            ) : null}

            <Button onClick={onClick} className={styles.button}>
                {label}
            </Button>
        </div>
    </article>
);
