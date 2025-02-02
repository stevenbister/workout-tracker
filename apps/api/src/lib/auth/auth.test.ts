import { hashPassword, verifyPassword } from './auth';

const mockPassword = 'password1234';

it('hashes the password', async () => {
    const hashedPassword = await hashPassword(mockPassword);

    expect(hashedPassword).not.toBe(mockPassword);
    expect(typeof hashedPassword).toBe('string');
    expect(hashedPassword.length).toBeGreaterThan(0);
});

it('returns true when passwords match', async () => {
    const hashedPassword = await hashPassword(mockPassword);
    const verifiedPassword = await verifyPassword({
        hash: hashedPassword,
        password: mockPassword,
    });

    expect(verifiedPassword).toBe(true);
});
