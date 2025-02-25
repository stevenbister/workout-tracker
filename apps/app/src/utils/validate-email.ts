export const validateEmail = (email: string | undefined) => {
    if (typeof email !== 'string') return false;

    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
};
