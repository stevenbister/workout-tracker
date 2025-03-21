import { render, screen, waitFor } from '../../tests/utils';
import type { TimerProps } from './timer';
import { Timer } from './timer';

const defaultProps: TimerProps = {};

const setup = (props?: Partial<TimerProps>) =>
    render(<Timer {...defaultProps} {...props} />);

describe('Timer component', () => {
    it('renders the initial time', () => {
        setup();
        expect(screen.getByText('0m 0s')).toBeInTheDocument();
    });

    it('starts ticking when status is "ticking"', () => {
        setup({
            status: 'ticking',
        });

        expect(screen.getByText('0m 0s')).toBeInTheDocument();
        waitFor(() => expect(screen.getByText('0m 1s')).toBeInTheDocument());
    });
});
