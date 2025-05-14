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
        default: 'border-gray-300',
        invalid: 'border-red-500',
    };

    return (
        <div className="relative">
            <label
                className={classList(
                    'relative mt-2 block rounded-lg border bg-transparent p-3 text-sm text-gray-800 has-[input:focus-visible]:outline',
                    styles[state]
                )}
            >
                <span className="absolute top-[-18px] bg-gray-100 py-1">
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
                className="absolute py-3 pt-2 text-xs text-red-500 empty:hidden"
            >
                {validationMessage}
            </div>
        </div>
    );
};
