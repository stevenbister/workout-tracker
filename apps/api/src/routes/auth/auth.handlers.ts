import { AppRouteHandler } from '@/types';

import { SignInRoute, SignOutRoute, SignUpRoute } from './auth.routes';

export const signUp: AppRouteHandler<SignUpRoute> = () => {};
export const signIn: AppRouteHandler<SignInRoute> = () => {};
export const signOut: AppRouteHandler<SignOutRoute> = () => {};
