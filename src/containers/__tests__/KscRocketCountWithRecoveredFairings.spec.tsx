import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import React from 'react';

import { ERROR_MESSAGE, LOADING_MESSAGE } from '../messages';
import { KscRocketCountWithRecoveredFairings } from '../KscRocketCountWithRecoveredFairings';
import { useUsecases } from '../../useUsecases';

jest.mock('../../useUsecases', () => ({
  useUsecases: jest.fn(),
}));

export const mockUsecases = (usecases: Partial<ReturnType<typeof useUsecases>>) => {
  (useUsecases as jest.Mock<Partial<ReturnType<typeof useUsecases>>>).mockImplementation(() => usecases)
};

describe('<KscRocketCountWithRecoveredFairings />', () => {
  it('should first render loading message and then the count', async () => {
    mockUsecases({
      getKscRocketCountWithRecoveredFairings: () => Promise.resolve(2),
    });
    render(<KscRocketCountWithRecoveredFairings />);
    expect(screen.getByText(LOADING_MESSAGE)).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByText(LOADING_MESSAGE));

    expect(screen.getByText(/: 2/)).toBeInTheDocument();
  });

  it('should render error message', async () => {
    mockUsecases({
      getKscRocketCountWithRecoveredFairings: () => Promise.reject(new Error()),
    });
    render(<KscRocketCountWithRecoveredFairings />);
    await waitForElementToBeRemoved(() => screen.queryByText(LOADING_MESSAGE));

    expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
  });
});