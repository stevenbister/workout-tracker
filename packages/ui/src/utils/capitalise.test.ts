import { capitalise } from './capitalise';

it('capitalizes a string', () => {
    expect(capitalise('hello')).toBe('Hello');
    expect(capitalise('hello world')).toBe('Hello world');
});
