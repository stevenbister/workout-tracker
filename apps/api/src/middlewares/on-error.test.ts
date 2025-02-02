/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIError } from 'better-auth/api';
import { Context } from 'hono';

import { STATUS } from '@/lib/constants/http-status-codes';

import { onError } from './on-error';

type MockError = {
    status?: number;
    message?: string;
    stack?: string;
} & Error;

const mockContext = (env: string) =>
    ({
        env: { NODE_ENV: env },
        newResponse: vi.fn().mockReturnValue({
            status: STATUS.INTERNAL_SERVER_ERROR.CODE,
        }),
        json: vi.fn(),
    }) as unknown as Context<any, any, object>;

const defaultMockError: MockError = {
    name: 'Mock error',
    status: STATUS.BAD_GATEWAY.CODE,
    message: STATUS.BAD_GATEWAY.MESSAGE,
    stack: 'stack trace',
};

const setup = (options?: { env?: string; err?: MockError | APIError }) => {
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
        message: STATUS.INTERNAL_SERVER_ERROR.MESSAGE,
        stack: 'stack trace',
    } as MockError;

    const { c } = setup({ err });

    expect(c.json).toHaveBeenCalledWith(
        {
            message: err.message,
            stack: err.stack,
        },
        STATUS.INTERNAL_SERVER_ERROR.CODE
    );
});

it('does not include stack trace in production', () => {
    const err = {
        status: STATUS.BAD_REQUEST.CODE,
        message: STATUS.BAD_REQUEST.MESSAGE,
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
        status: STATUS.OK.CODE,
        message: STATUS.OK.MESSAGE,
        stack: 'stack trace',
    } as MockError;

    const { c } = setup({ err });

    expect(c.json).toHaveBeenCalledWith(
        {
            message: err.message,
            stack: err.stack,
        },
        STATUS.INTERNAL_SERVER_ERROR.CODE
    );
});

it('returns 500 if error is instance of APIError', () => {
    const err = {
        status: 'UNPROCESSABLE_ENTITY',
        body: {
            message: 'User already exists',
            code: 'USER_ALREADY_EXISTS',
        },
    };

    const { c } = setup({
        err: new APIError('UNPROCESSABLE_ENTITY', err.body),
    });

    expect(c.json).toHaveBeenCalledWith(
        {
            message: err.body.message,
            stack: expect.objectContaining({
                body: err.body,
            }),
        },
        STATUS.INTERNAL_SERVER_ERROR.CODE
    );
});
