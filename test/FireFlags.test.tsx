import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { FireFlags } from '../src';

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve([]),
}));

describe('<FireFlags />', () => {
  it('should call fetch with the defaultUrl and {projectId}', async () => {
    render(<FireFlags projectId="xxx-xxx-xxx" />);
    await waitFor(() => expect(fetch).toHaveBeenCalledWith('https://flags.stackonfire.dev/api/flags/xxx-xxx-xxx'));
  });
  it('should call fetch with the {url} and {projectId}', async () => {
    render(<FireFlags projectId="xxx-xxx-xxx" url="fake-url://test" />);
    await waitFor(() => expect(fetch).toHaveBeenCalledWith('fake-url://test/api/flags/xxx-xxx-xxx'));
  });
});
