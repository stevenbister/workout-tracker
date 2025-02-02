import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt);
};

export const verifyPassword = async ({
    hash,
    password,
}: {
    hash: string;
    password: string;
}) => await bcrypt.compare(password, hash);
