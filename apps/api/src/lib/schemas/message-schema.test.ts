import { messageSchema } from './message-schema';

it('returns the expected json with the default message', () => {
    const defaultMessage = 'Hello world';
    const schema = messageSchema();

    expect(schema.parse({ message: defaultMessage })).toEqual({
        message: defaultMessage,
    });
});

it('returns the expected json with a custom message', () => {
    const customMessage = 'Custom message';
    const schema = messageSchema(customMessage);

    expect(schema.parse({ message: customMessage })).toEqual({
        message: customMessage,
    });
});
