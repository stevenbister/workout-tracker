import { Icon, type IconProps } from '../icon/icon';
import styles from './icon-text.module.scss';

export interface IconTextProps extends Pick<IconProps, 'spriteId'> {
    text: string;
}

export const IconText = ({ spriteId, text }: IconTextProps) => {
    return (
        <span className={styles['icon-text']}>
            <Icon spriteId={spriteId} className={styles.icon} />
            {text}
        </span>
    );
};
