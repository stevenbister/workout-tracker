import { render, screen } from '../../tests/utils';
import type { IconTextProps } from './icon-text';
import { IconText } from './icon-text';

const defaultProps: IconTextProps = {
    spriteId: 'barbell',
    text: 'Barbell',
};

const setup = (props?: Partial<IconTextProps>) =>
    render(<IconText {...defaultProps} {...props} />);

it('renders the component', () => {
    setup();

    expect(screen.getByText(defaultProps.text)).toBeInTheDocument();
});
