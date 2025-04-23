const mockJson = {
    appName: 'Mock App Name',
    separator: '|',
    routes: {
        workouts: [
            {
                title: 'Workouts',
            },
            {
                name: 'description',
                content: 'My App is a web application',
            },
        ],
    },
};

beforeAll(() => {
    vi.doMock('@/content/metadata.json', () => ({
        default: mockJson,
    }));
});

it('returns default metadata if no route is passed', async () => {
    const { getMetadata } = await import('./get-metadata');
    expect(getMetadata()).toEqual([{ title: mockJson.appName }]);
});

it('returns metadata for the specified route', async () => {
    const { getMetadata } = await import('./get-metadata');
    expect(getMetadata('workouts')).toEqual([
        {
            title: `${mockJson.routes.workouts[0]!.title} ${mockJson.separator} ${mockJson.appName}`,
        },
        ...mockJson.routes.workouts.slice(1),
    ]);
});

it('returns default metadata if route does not match key in metadata.json', async () => {
    const consoleErrorMock = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {});

    const { getMetadata } = await import('./get-metadata');
    // @ts-expect-error -- don't expect this route to exist
    expect(getMetadata('invalid-route')).toEqual([{ title: mockJson.appName }]);

    consoleErrorMock.mockRestore();
});
