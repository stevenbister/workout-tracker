import { validateEmail } from './validate-email';

it('returns true when email is valid', () => {
    expect(validateEmail('test@example.com')).toBe(true);
});

it.each(['invalid-string', 2])(
    'returns false when email is invalid',
    (input) => {
        expect(validateEmail(input as string)).toBe(false);
    }
);
