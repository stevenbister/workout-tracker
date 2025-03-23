import {
    ErrorComponent as TSErrorComponent,
    useRouter,
    useRouterState,
} from '@tanstack/react-router';
import { HTTPError } from 'ky';

import { Button } from '@repo/ui/components/button';
import { Disclosure } from '@repo/ui/components/disclosure';

import data from '@/content/error.json';

export interface ErrorComponentProps {
    error: Error | HTTPError;
    title: string;
}

export const ErrorComponent = ({ error, title }: ErrorComponentProps) => {
    const { invalidate } = useRouter();
    const { isLoading } = useRouterState();
    console.error(error);

    if (error instanceof HTTPError) {
        return (
            <div>
                <h1>{title}</h1>

                <div className="stack">
                    <h2>{data.heading}</h2>

                    <Disclosure label={data.more_details}>
                        {error.message}
                    </Disclosure>

                    <Button
                        isLoading={isLoading}
                        onClick={() =>
                            // Invalidate the route to reload the loader, which will also reset the error boundary
                            invalidate()
                        }
                    >
                        {data.cta}
                    </Button>
                </div>
            </div>
        );
    }

    return <TSErrorComponent error={error} />;
};
