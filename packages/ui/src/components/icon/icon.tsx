import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { createContext, useContext } from 'react';

import { classList } from '@/utils/class-list';

import styles from './icon.module.scss';

export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
    spriteId: string;
    width?: number;
    height?: number;
    title?: string;
}

export const Icon = ({
    spriteId,
    width = 100,
    height = 100,
    className,
    title,
    ...rest
}: IconProps) => {
    const { spriteSheetPath } = useSpritesheetContext();

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className={classList(styles.icon, className)}
            fill="currentColor"
            {...rest}
        >
            {title ? <title>{title}</title> : null}
            <use href={`${spriteSheetPath}#${spriteId}`} />
        </svg>
    );
};

const SpritesheetContext = createContext<
    | {
          spriteSheetPath: string | undefined;
      }
    | undefined
>(undefined);

const useSpritesheetContext = () => {
    const context = useContext(SpritesheetContext);

    if (context === undefined) {
        throw new Error(
            'useSpritesheetContext was used outside of its provider'
        );
    }

    return context;
};

export interface SpritesheetProviderProps {
    children?: ReactNode;
    spriteSheetPath?: string;
}
export const SpritesheetProvider = (props: SpritesheetProviderProps) => {
    const { children, spriteSheetPath = './spritesheet.svg' } = props;

    return (
        <SpritesheetContext.Provider
            value={{
                spriteSheetPath,
            }}
        >
            {children}
        </SpritesheetContext.Provider>
    );
};
