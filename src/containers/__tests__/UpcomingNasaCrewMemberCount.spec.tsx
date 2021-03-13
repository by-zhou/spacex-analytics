import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import React from 'react';

import { ERROR_MESSAGE, LOADING_MESSAGE } from '../messages';
import { UpcomingNasaCrewMemberCount } from '../UpcomingNasaCrewMemberCount';
import { useUsecases } from '../../useUsecases';

jest.mock('../../useUsecases', () => ({
  useUsecases: jest.fn(),
}));

export const mockUsecases = (usecases: Partial<ReturnType<typeof useUsecases>>) => {
  (useUsecases as jest.Mock<Partial<ReturnType<typeof useUsecases>>>).mockImplementation(() => usecases)
};

describe('<UpcomingNasaCrewMemberCount />', () => {
  it('should first render loading message and then the count', async () => {
    mockUsecases({
      getUpcomingNasaCrewMemberCount: () => Promise.resolve(8),
    });
    render(<UpcomingNasaCrewMemberCount />);
    expect(screen.getByText(LOADING_MESSAGE)).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByText(LOADING_MESSAGE));

    expect(screen.getByText(/: 8/)).toBeInTheDocument();
  });

  it('should render error message', async () => {
    mockUsecases({
      getUpcomingNasaCrewMemberCount: () => Promise.reject(new Error()),
    });
    render(<UpcomingNasaCrewMemberCount />);
    await waitForElementToBeRemoved(() => screen.queryByText(LOADING_MESSAGE));

    expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
  });
});