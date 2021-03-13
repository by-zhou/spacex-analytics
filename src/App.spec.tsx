import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import fetchMock from 'fetch-mock-jest';
import React from 'react';

import { ERROR_MESSAGE, LOADING_MESSAGE } from './containers/messages';
import App from './App';
import { mockCrewMember, mockLaunch, mockLaunchpad, mockPayload } from './domain/testing/mockModels';

describe('<App />', () => {
  it('should render app without error message', async () => {
    fetchMock.get(/launches\/past/, [mockLaunch()]);
    fetchMock.get(/launches\/upcoming/, [mockLaunch({ upcoming: true, crew: ['crew-member-id-1'] })]);
    fetchMock.get(/crew\/.+/, mockCrewMember());
    fetchMock.get(/launchpads\/.+/, mockLaunchpad());
    fetchMock.get(/payloads\/.+/, mockPayload());

    render(<App />);

    await waitForElementToBeRemoved(() => screen.queryAllByText(LOADING_MESSAGE));

    expect(screen.queryByText(ERROR_MESSAGE)).not.toBeInTheDocument();
  });
});
