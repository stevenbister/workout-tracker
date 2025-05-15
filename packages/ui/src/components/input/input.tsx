import { type ComponentPropsWithoutRef, useId } from 'react';

import { classList } from '../../utils/class-list';

type State = 'default' | 'invalid';
export interface InputProps
    extends Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'type'> {
    label: string;
    type?: 'text' | 'email' | 'password';
    state?: State;
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

    const styles: Record<State, string> = {
        default: 'border-global-border',
        invalid: 'border-error',
    };

    return (
        <div className="relative">
            <label
                className={classList(
                    'text-global-text relative mt-2 block rounded-lg border bg-transparent p-3 text-sm has-[input:focus-visible]:outline',
                    styles[state]
                )}
            >
                <span className="bg-global-bg absolute top-[-1rem] py-1">
                    {label}
                </span>
                <input
                    {...rest}
                    className="w-full cursor-auto outline-none"
                    id={inputId}
                    type={type}
                    aria-describedby={validationMessageId}
                />
            </label>
            <div
                id={validationMessageId}
                className="text-error absolute py-3 pt-2 text-xs empty:hidden"
            >
                {validationMessage}
            </div>
        </div>
    );
};
