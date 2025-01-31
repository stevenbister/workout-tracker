/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'hono';

import { STATUS_CODES } from '@/lib/constants/http-status-codes';

import { onError } from './on-error';

type MockError = {
    status?: number;
    message?: string;
    stack?: string;
} & Error;

const mockContext = (env: string) =>
    ({
        env: { NODE_ENV: env },
        newResponse: vi
            .fn()
            .mockReturnValue({ status: STATUS_CODES.INTERNAL_SERVER_ERROR }),
        json: vi.fn(),
    }) as unknown as Context<any, any, object>;

const defaultMockError: MockError = {
    name: 'Mock error',
    status: STATUS_CODES.BAD_GATEWAY,
    message: 'Bad Gateway',
    stack: 'stack trace',
};

const setup = (options?: { env?: string; err?: MockError }) => {
    const c = mockContext(options?.env ?? 'development');

    onError(options?.err ?? defaultMockError, c);

    return { c };
};

beforeEach(() => vi.clearAllMocks());

it('returns the error status if present', () => {
    const { message, stack, status } = defaultMockError;

    const { c } = setup();

    expect(c.json).toHaveBeenCalledWith(
        {
            message,
            stack,
        },
        status
    );
});

it('returns 500 if error status is not present', () => {
    const err = {
        message: 'Internal Server Error',
        stack: 'stack trace',
    } as MockError;

    const { c } = setup({ err });

    expect(c.json).toHaveBeenCalledWith(
        {
            message: err.message,
            stack: err.stack,
        },
        STATUS_CODES.INTERNAL_SERVER_ERROR
    );
});

it('does not include stack trace in production', () => {
    const err = {
        status: STATUS_CODES.BAD_REQUEST,
        message: 'Bad Request',
        stack: 'stack trace',
    } as MockError;

    const { c } = setup({
        env: 'production',
        err,
    });

    expect(c.json).toHaveBeenCalledWith(
        {
            message: err.message,
            stack: undefined,
        },
        err.status
    );
});

it('returns 500 if currentStatus is OK', () => {
    const err = {
        status: STATUS_CODES.OK,
        message: 'OK',
        stack: 'stack trace',
    } as MockError;

    const { c } = setup({ err });

    expect(c.json).toHaveBeenCalledWith(
        {
            message: err.message,
            stack: err.stack,
        },
        STATUS_CODES.INTERNAL_SERVER_ERROR
    );
});
