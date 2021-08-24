// eslint-disable-next-line import/prefer-default-export
export const mockFetchWithJsonValue = (value: any) => {
  // @ts-ignore
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(value),
  }));
};
