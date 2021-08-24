import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { FireFlags, Flag } from '../src';
import FlagsContext from '../src/context';
import mockFetchWithJsonValue from './utils/mockFetchWithJsonValue';

describe('<FireFlags />', () => {
  it('should throw if {projectId} is missing', async () => {
    expect(() => render(<FireFlags projectId={undefined} />)).toThrowError('FireFlags expects project id');
  });
  it('should call fetch with the defaultUrl and {projectId}', async () => {
    mockFetchWithJsonValue([]);
    render(<FireFlags projectId="xxx-xxx-xxx" />);
    await waitFor(() => expect(fetch).toHaveBeenCalledWith('https://flags.stackonfire.dev/api/flags/xxx-xxx-xxx'));
  });
  it('should call fetch with the {url} and {projectId}', async () => {
    mockFetchWithJsonValue([]);
    render(<FireFlags projectId="xxx-xxx-xxx" url="fake-url://test" />);
    await waitFor(() => expect(fetch).toHaveBeenCalledWith('fake-url://test/api/flags/xxx-xxx-xxx'));
  });
  it('should render the {children}', async () => {
    mockFetchWithJsonValue([]);
    render(
      <FireFlags projectId="xxx-xxx-xxx">
        Hello World
      </FireFlags>
    );
    const element = await waitFor(() => screen.findByText('Hello World'));
    expect(element).toHaveTextContent('Hello World');
  });
  it('should set the return of the fetch as the context value', async () => {
    const flags = [{
      id: 'test',
      projectId: 'test',
      name: 'test',
      description: 'test',
      isActive: true,
      isArchived: false,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    }];
    mockFetchWithJsonValue(flags as Flag[]);
    let value: Flag[] = null;
    render(
      <FireFlags projectId="xxx-xxx-xxx">
        <FlagsContext.Consumer>
          {(contextValue) => {
            value = contextValue;
            return <></>;
          }}
        </FlagsContext.Consumer>
      </FireFlags>
    );
    await waitFor(() => expect(value).toEqual(flags));
  });
});
