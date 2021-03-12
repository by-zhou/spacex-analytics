import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import React from 'react';

import { ERROR_MESSAGE, LOADING_MESSAGE } from '../messages';
import { SuccessfulLaunchCount } from '../SuccessfulLaunchCount';
import { useUsecases } from '../../useUsecases';

jest.mock('../../useUsecases', () => ({
  useUsecases: jest.fn(),
}));

export const mockUsecases = (usecases: Partial<ReturnType<typeof useUsecases>>) => {
  (useUsecases as jest.Mock<Partial<ReturnType<typeof useUsecases>>>).mockImplementation(() => usecases)
};

describe('<SuccessfulLaunchCount />', () => {
  it('should first render loading message and then the count', async () => {
    mockUsecases({
      getSuccessfulLaunchCount: () => Promise.resolve(3),
    });
    render(<SuccessfulLaunchCount />);
    expect(screen.getByText(LOADING_MESSAGE)).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByText(LOADING_MESSAGE));

    expect(screen.getByText(/: 3/)).toBeInTheDocument();
  });

  it('should render error message', async () => {
    mockUsecases({
      getSuccessfulLaunchCount: () => Promise.reject(new Error()),
    });
    render(<SuccessfulLaunchCount />);
    await waitForElementToBeRemoved(() => screen.queryByText(LOADING_MESSAGE));

    expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
  });
});
