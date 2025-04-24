export const getTemporalUnit = (seconds: number) => {
    const sec = Math.floor(seconds % 60);
    const minutes = Math.floor((seconds / 60) % 60);
    const hours = Math.floor((seconds / 60 / 60) % 24);

    return {
        hours,
        minutes,
        seconds: sec,
    };
};
