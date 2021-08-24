const mockFetchWithJsonValue = (value: any) => {
  // @ts-ignore
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(value),
  }));
};

export default mockFetchWithJsonValue;
