import { type ComponentPropsWithoutRef, useId } from 'react';

import { classList } from '../../utils/class-list';
import styles from './input.module.scss';

export interface InputProps
    extends Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'type'> {
    label: string;
    type?: 'text' | 'email' | 'password';
    state?: 'default' | 'invalid';
    validationMessage?: string;
}

export const Input = ({
    label,
    type = 'text',
    state = 'default',
    validationMessage,
    ...rest
}: InputProps) => {
    const inputId = useId();
    const validationMessageId = useId();

    return (
        <div className={styles.container}>
            <label className={classList(styles.input, styles[state])}>
                <span>{label}</span>
                <input
                    {...rest}
                    id={inputId}
                    type={type}
                    aria-describedby={validationMessageId}
                />
            </label>
            <div
                id={validationMessageId}
                className={styles['validation-message']}
            >
                {validationMessage}
            </div>
        </div>
    );
};
