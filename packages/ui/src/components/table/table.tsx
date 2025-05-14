import { type ComponentPropsWithoutRef, useId } from 'react';

import { classList } from '../../utils/class-list';

export interface TableProps extends ComponentPropsWithoutRef<'table'> {
    caption: string;
}

export const Table = ({ children, caption, ...rest }: TableProps) => {
    const captionId = useId();

    return (
        <div tabIndex={0} role="region" aria-labelledby={captionId}>
            <table
                {...rest}
                className={classList(
                    'w-full table-fixed border-collapse',
                    rest.className
                )}
            >
                <caption id={captionId} className="sr-only">
                    {caption}
                </caption>

                {children}
            </table>
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * THead
 * -----------------------------------------------------------------------------------------------*/
interface TheadProps extends ComponentPropsWithoutRef<'thead'> {}

const Thead = ({ children, ...rest }: TheadProps) => (
    <thead
        {...rest}
        className={classList('border-b-0 bg-transparent', rest.className)}
    >
        {children}
    </thead>
);

/* -------------------------------------------------------------------------------------------------
 * Tbody
 * -----------------------------------------------------------------------------------------------*/
interface TbodyProps extends ComponentPropsWithoutRef<'tbody'> {}

const Tbody = ({ children, ...rest }: TbodyProps) => (
    <tbody {...rest} className={classList('bg-transparent', rest.className)}>
        {children}
    </tbody>
);

/* -------------------------------------------------------------------------------------------------
 * Tfoot
 * -----------------------------------------------------------------------------------------------*/
interface TfootProps extends ComponentPropsWithoutRef<'tfoot'> {}

const Tfoot = ({ children, ...rest }: TfootProps) => (
    <tfoot
        {...rest}
        className={classList('border-y-2 bg-transparent', rest.className)}
    >
        {children}
    </tfoot>
);

/* -------------------------------------------------------------------------------------------------
 * Tr
 * -----------------------------------------------------------------------------------------------*/
interface TrProps extends ComponentPropsWithoutRef<'tr'> {}

const Tr = ({ children, ...rest }: TrProps) => (
    <tr {...rest} className={rest.className}>
        {children}
    </tr>
);

/* -------------------------------------------------------------------------------------------------
 * Th
 * -----------------------------------------------------------------------------------------------*/
interface ThProps extends ComponentPropsWithoutRef<'th'> {}

const Th = ({ children, ...rest }: ThProps) => (
    <th
        {...rest}
        className={classList(
            'bg-transparent py-2 pr-1 text-left align-bottom font-semibold',
            rest.className
        )}
    >
        {children}
    </th>
);

/* -------------------------------------------------------------------------------------------------
 * TD
 * -----------------------------------------------------------------------------------------------*/
interface TdProps extends ComponentPropsWithoutRef<'td'> {}

const Td = ({ children, ...rest }: TdProps) => (
    <td
        {...rest}
        className={classList(
            'border-b border-b-gray-300 bg-transparent py-2 pr-1 text-left align-middle',
            rest.className
        )}
    >
        {children}
    </td>
);

Table.Thead = Thead;
Table.Tbody = Tbody;
Table.Tfoot = Tfoot;
Table.Tr = Tr;
Table.Th = Th;
Table.Td = Td;
