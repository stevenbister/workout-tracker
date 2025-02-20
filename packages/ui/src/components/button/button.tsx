// Credit: https://github.com/radix-ui/primitives/blob/7101e7d6efb2bff13cc6761023ab85aeec73539e/packages/react/polymorphic/src/forwardRefWithAs.ts
import {
    type ComponentPropsWithRef,
    type ElementType,
    type ForwardRefExoticComponent,
    type JSX,
    type ReactElement,
    forwardRef,
} from 'react';

import { classList } from '../../utils/class-list';
import styles from './button.module.scss';

export type ButtonProps = {
    variant?: 'ghost';
    status?: 'info' | 'success' | 'danger';
};

type Merge<P1 = object, P2 = object> = Omit<P1, keyof P2> & P2;
type MergeProps<E, P = object> = P &
    Merge<E extends ElementType ? ComponentPropsWithRef<E> : never, P>;

interface ForwardRefComponent<IntrinsicElementString, OwnProps = ButtonProps>
    extends ForwardRefExoticComponent<
        MergeProps<
            IntrinsicElementString,
            OwnProps & { as?: IntrinsicElementString }
        >
    > {
    <As extends keyof JSX.IntrinsicElements>(
        props: MergeProps<As, OwnProps & { as: As }>
    ): ReactElement | null;

    <
        As extends ElementType<unknown>,
        _AsWithProps = As extends ElementType<infer P> ? ElementType<P> : never,
    >(
        props: MergeProps<_AsWithProps, OwnProps & { as: _AsWithProps }>
    ): ReactElement | null;
}

export const Button = forwardRef(
    // eslint-disable-next-line react/prop-types
    ({ as: Element = 'button', variant, status, ...rest }, forwardedRef) => (
        <Element
            {...rest}
            className={classList(
                styles.btn,
                variant && styles[variant],
                status && styles[status],
                rest.className
            )}
            ref={forwardedRef}
        />
    )
) as ForwardRefComponent<'button'>;

Button.displayName = 'Button';
