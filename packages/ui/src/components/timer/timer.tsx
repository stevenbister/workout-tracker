import { useEffect, useState } from 'react';

import { useInterval } from '../../hooks/use-interval';

export type TimerStatus = 'idle' | 'ticking';

export interface TimerProps {
    status?: TimerStatus;
}

export const Timer = ({ status = 'idle' }: TimerProps) => {
    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    const [isTicking, setIsTicking] = useState<boolean>(status === 'idle');

    useEffect(() => {
        setIsTicking(status === 'ticking');
    }, [status]);

    const seconds = Math.floor(timeElapsed % 60);
    const minutes = Math.floor((timeElapsed / 60) % 60);
    const hours = Math.floor((timeElapsed / 60 / 60) % 24);

    useInterval(
        () => {
            setTimeElapsed((timeElapsed) => timeElapsed + 1);
        },
        isTicking ? 1000 : null
    );

    return (
        <span className="fs--1">
            {hours > 0 && `${hours}h`} {minutes}m {seconds}s
        </span>
    );
};
