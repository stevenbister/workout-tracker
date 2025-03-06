import { render, screen } from '@repo/ui/tests/utils';

import { Layout } from './layout';

it('renders the layout with children', () => {
    render(
        <Layout>
            <div>Test</div>
        </Layout>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
});
