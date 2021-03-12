import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import React from 'react';

import { ERROR_MESSAGE, LOADING_MESSAGE } from '../messages';
import { TotalDragonFlightTime } from '../TotalDragonFlightTime';
import { useUsecases } from '../../useUsecases';

jest.mock('../../useUsecases', () => ({
  useUsecases: jest.fn(),
}));

export const mockUsecases = (usecases: Partial<ReturnType<typeof useUsecases>>) => {
  (useUsecases as jest.Mock<Partial<ReturnType<typeof useUsecases>>>).mockImplementation(() => usecases)
};

describe('<TotalDragonFlightTime />', () => {
  it('should first render loading message and then the time', async () => {
    mockUsecases({
      getTotalDragonFlightTime: () => Promise.resolve(4567),
    });
    render(<TotalDragonFlightTime />);
    expect(screen.getByText(LOADING_MESSAGE)).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByText(LOADING_MESSAGE));

    expect(screen.getByText(/: 4567/)).toBeInTheDocument();
  });

  it('should render error message', async () => {
    mockUsecases({
      getTotalDragonFlightTime: () => Promise.reject(new Error()),
    });
    render(<TotalDragonFlightTime />);
    await waitForElementToBeRemoved(() => screen.queryByText(LOADING_MESSAGE));

    expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
  });
});
