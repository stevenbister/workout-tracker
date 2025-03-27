import { useSearch } from '@tanstack/react-router';
import { type FormEvent, useState } from 'react';

import { authClient } from '@repo/core/auth/client';

import { Button } from '@repo/ui/components/button';
import { Input, type InputProps } from '@repo/ui/components/input';
import { toast } from '@repo/ui/components/toast';

import { ROUTES } from '@/constants';
import content from '@/content/validation.json';
import { validateEmail } from '@/utils/validate-email';

import styles from './login-form.module.scss';

type FormFields = {
    email?: string | undefined;
    password?: string | undefined;
};

export const LoginForm = () => {
    const [email, setEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [validationMessage, setValidationMessage] = useState<
        FormFields | undefined
    >(undefined);

    const redirectTo = useSearch({
        from: ROUTES.LOGIN,
        select: (s) => (s as { redirect: string }).redirect,
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const entries = Object.fromEntries(formData.entries()) as FormFields;

        if (!entries?.email || !entries?.password) {
            setValidationMessage({
                email: content.email.empty,
                password: content.password.empty,
            });
            return;
        }

        // Validate email field, we'll let the response from the server check the password for us
        const validEmail = validateEmail(entries?.email);
        if (!validEmail) {
            setValidationMessage({
                ...validationMessage,
                email: content.email.invalid,
            });
            return;
        }

        void authClient.signIn.email({
            email: entries.email,
            password: entries.password,
            callbackURL: redirectTo || ROUTES.ROOT,
            fetchOptions: {
                onRequest: () => setIsLoading(true),
                onError: (e) => {
                    console.error(e);
                    toast.render({
                        title: 'Oops, something went wrong',
                        description:
                            e.error.message ?? 'Please try again later',
                        status: 'error',
                        button: {},
                    });

                    setIsLoading(false);
                },
                onSuccess: () => {
                    setIsLoading(false);
                    setValidationMessage(undefined);
                },
            },
        });
    };

    const formFields: InputProps[] = [
        {
            label: 'Email',
            type: 'email',
            name: 'email',
            value: email,
            onChange: (e) => setEmail(e.target.value),
            onBlur: () => {
                const validEmail = validateEmail(email);
                if (validEmail)
                    setValidationMessage({
                        ...validationMessage,
                        email: undefined,
                    });
            },
            state: validationMessage?.email ? 'invalid' : 'default',
            validationMessage: validationMessage?.email,
        },
        {
            label: 'Password',
            type: 'password',
            name: 'password',
            onBlur: (e) => {
                if (e.target.value)
                    setValidationMessage({
                        ...validationMessage,
                        password: undefined,
                    });
            },
            state: validationMessage?.password ? 'invalid' : 'default',
            validationMessage: validationMessage?.password,
        },
    ];

    return (
        <form
            method="post"
            onSubmit={handleSubmit}
            noValidate
            className={styles.form}
        >
            {formFields.map((field) => (
                <Input key={field.name} {...field} />
            ))}

            <Button isLoading={isLoading}>Log in</Button>
        </form>
    );
};
