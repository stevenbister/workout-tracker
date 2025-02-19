import { headersSchema, headersSchemaWithCookie } from './headers-schema';

it('returns the expected json with x-api-key header', () => {
    const mockHeaders = {
        'x-api-key': 'mock-api-key',
    };

    expect(headersSchema.headers.parse(mockHeaders)).toEqual(mockHeaders);
});

it('returns the expected json with cookie header', () => {
    const mockHeaders = {
        Cookie: 'mock-cookie',
        'x-api-key': 'mock-api-key',
    };

    expect(headersSchemaWithCookie.headers.parse(mockHeaders)).toEqual(
        mockHeaders
    );
});
