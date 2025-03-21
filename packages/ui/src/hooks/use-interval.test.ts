import { act, renderHook } from '../tests/utils';
import { useInterval } from './use-interval';

const mockCallback = vi.fn();

const defaultTime = 1000;

interface Params {
    cb: () => void;
    delay: number | null;
}

const defaultParams: Params = {
    cb: mockCallback,
    delay: defaultTime,
};

const setup = (params?: Partial<Params>) => ({
    ...renderHook<void, Partial<Params>>(
        () =>
            useInterval(
                params?.cb ?? defaultParams.cb,
                params?.delay !== undefined
                    ? params?.delay
                    : defaultParams.delay
            ),
        {
            initialProps: {
                cb: params?.cb,
                delay: params?.delay,
            },
        }
    ),
});

beforeAll(() => vi.useFakeTimers());
afterAll(() => vi.useRealTimers());

beforeEach(() => vi.resetAllMocks());

it('calls the callback function repeatedly with the specified delay', async () => {
    setup();

    act(() => vi.advanceTimersByTime(defaultTime));

    expect(mockCallback).toHaveBeenCalledTimes(1);
});

it('stops the interval when the delay is set to null', async () => {
    setup({ delay: null });

    act(() => vi.advanceTimersByTime(defaultTime));

    expect(mockCallback).not.toHaveBeenCalled();
});

it('updates the interval delay when it changes', () => {
    const { rerender } = setup();

    act(() => vi.advanceTimersByTime(defaultTime));
    expect(mockCallback).toHaveBeenCalledTimes(1);

    rerender({ delay: defaultTime * 0.5 });

    act(() => vi.advanceTimersByTime(defaultTime * 1.5));
    expect(mockCallback).toHaveBeenCalledTimes(2);
});

it('stops the interval when unmounted', () => {
    const { unmount } = setup();

    act(() => vi.advanceTimersByTime(defaultTime));
    expect(mockCallback).toHaveBeenCalledTimes(1);

    unmount();

    act(() => vi.advanceTimersByTime(defaultTime * 2));
    expect(mockCallback).toHaveBeenCalledTimes(1);
});
