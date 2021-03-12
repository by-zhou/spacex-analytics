import { useUsecases } from '../../useUsecases';

jest.mock('../../useUsecases', () => ({
  useUsecases: jest.fn(),
}));

export const mockUsecases = (usecases: Partial<ReturnType<typeof useUsecases>>) => {
  (useUsecases as jest.Mock<Partial<ReturnType<typeof useUsecases>>>).mockImplementation(() => usecases)
};
