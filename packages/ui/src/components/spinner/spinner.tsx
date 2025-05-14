import { classList } from '../../utils/class-list';

export interface SpinnerProps {
    height?: 'default' | 'small';
}

export const Spinner = ({ height = 'default' }: SpinnerProps) => {
    return (
        <span
            className={classList(
                'border-box inline-block aspect-square animate-spin rounded-full border-4 border-[currentcolor] border-b-transparent',
                height === 'default' ? 'h-8' : 'h-5'
            )}
            aria-live="polite"
            role="status"
        />
    );
};
