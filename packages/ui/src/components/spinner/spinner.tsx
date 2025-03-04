import { classList } from '../../utils/class-list';
import styles from './spinner.module.scss';

export interface SpinnerProps {
    className?: string;
}

export const Spinner = ({ className }: SpinnerProps) => {
    return (
        <span
            className={classList(styles.spinner, className)}
            aria-live="polite"
            role="status"
        />
    );
};
