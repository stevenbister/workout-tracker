import { AppRouteHandler } from '@/types';

import { SignUpRoute } from './auth.routes';

export const signUp: AppRouteHandler<SignUpRoute> = async (c) => {
    const auth = c.get('authAdapter');
    const { email, password, name } = c.req.valid('json');

    const res = await auth.api.signUpEmail({
        body: {
            email,
            password,
            name,
        },
        asResponse: true,
    });

    return c.json(res);
};

// export const signIn: AppRouteHandler<SignInRoute> = () => {};

// export const signOut: AppRouteHandler<SignOutRoute> = () => {};
