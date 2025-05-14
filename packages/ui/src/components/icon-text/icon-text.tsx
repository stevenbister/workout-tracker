import { Icon, type IconProps } from '../icon/icon';

export interface IconTextProps extends Pick<IconProps, 'spriteId'> {
    text: string;
}

export const IconText = ({ spriteId, text }: IconTextProps) => {
    return (
        <span className="flex items-center gap-1.5">
            <Icon spriteId={spriteId} className="shrink-[0]" />
            {text}
        </span>
    );
};
