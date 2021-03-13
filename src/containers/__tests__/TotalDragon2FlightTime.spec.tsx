import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import React from 'react';

import { ERROR_MESSAGE, LOADING_MESSAGE } from '../messages';
import { TotalDragon2FlightTime } from '../TotalDragon2FlightTime';
import { useUsecases } from '../../useUsecases';

jest.mock('../../useUsecases', () => ({
  useUsecases: jest.fn(),
}));

export const mockUsecases = (usecases: Partial<ReturnType<typeof useUsecases>>) => {
  (useUsecases as jest.Mock<Partial<ReturnType<typeof useUsecases>>>).mockImplementation(() => usecases)
};

describe('<TotalDragon2FlightTime />', () => {
  it('should first render loading message and then the time', async () => {
    mockUsecases({
      getTotalDragon2FlightTime: () => Promise.resolve(4567),
    });
    render(<TotalDragon2FlightTime />);
    expect(screen.getByText(LOADING_MESSAGE)).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByText(LOADING_MESSAGE));

    expect(screen.getByText(/: 4567/)).toBeInTheDocument();
  });

  it('should render error message', async () => {
    mockUsecases({
      getTotalDragon2FlightTime: () => Promise.reject(new Error()),
    });
    render(<TotalDragon2FlightTime />);
    await waitForElementToBeRemoved(() => screen.queryByText(LOADING_MESSAGE));

    expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
  });
});
