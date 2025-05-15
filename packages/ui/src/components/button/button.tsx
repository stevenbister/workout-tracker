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
import { Spinner } from '../spinner/spinner';

type Variant = 'default' | 'outline' | 'ghost';

export type ButtonProps = {
    variant?: Variant;
    isLoading?: boolean;
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
    (
        { as: Element = 'button', variant = 'default', isLoading, ...rest },
        forwardedRef
    ) => {
        const variantStyles: Record<Variant, string> = {
            default:
                'bg-gray-800 text-gray-50 hover:bg-gray-600 active:bg-gray-600',
            outline:
                'border-1 border-[currentcolor] bg-transparent text-gray-800 hover:bg-gray-800 hover:text-gray-50 active:bg-gray-800 active:text-gray-50',
            ghost: 'bg-transparent text-gray-800 hover:bg-transparent active:transparent',
        };

        return (
            <Element
                {...rest}
                disabled={isLoading}
                className={classList(
                    'inline-flex cursor-pointer items-center justify-center gap-8 rounded-lg px-8 py-2 disabled:pointer-events-none disabled:opacity-75',
                    variant && variantStyles[variant],
                    rest.className
                )}
                ref={forwardedRef}
            >
                {isLoading ? (
                    <>
                        <Spinner height="small" />
                        <span className="sr-only">Loading</span>
                    </>
                ) : (
                    rest.children
                )}
            </Element>
        );
    }
) as ForwardRefComponent<'button'>;

Button.displayName = 'Button';
