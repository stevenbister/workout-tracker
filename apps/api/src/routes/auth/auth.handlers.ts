import { STATUS } from '@/lib/constants/http-status-codes';
import { AppRouteHandler } from '@/types';

import type { SignUpRoute } from './auth.routes';

export const signUp: AppRouteHandler<SignUpRoute> = async (c) => {
    const auth = c.get('authAdapter');
    const { email, password, name } = c.req.valid('json');

    const user = await auth.api.signUpEmail({
        body: {
            email,
            password,
            name,
        },
    });

    return c.json(user, STATUS.OK.CODE);
};

// export const signIn: AppRouteHandler<SignInRoute> = () => {};

// export const signOut: AppRouteHandler<SignOutRoute> = () => {};
