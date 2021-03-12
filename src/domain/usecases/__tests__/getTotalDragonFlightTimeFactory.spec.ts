import { mockLaunch, mockPayload } from '../../testing/mockModels';
import { createGetTotalDragonFlightTime } from '../getTotalDragonFlightTimeFactory';

describe('getTotalDragonFlightTimeFactory', () => {
  describe('createGetTotalDragonFlightTime', () => {
    const getPastLaunchesMock = jest.fn();
    const getPayloadMock = jest.fn();
    const getTotalDragonFlightTime = createGetTotalDragonFlightTime(getPastLaunchesMock, getPayloadMock);

    it('should return sum of all dragon flight time', async () => {
      getPastLaunchesMock.mockImplementationOnce(() => Promise.resolve([
        mockLaunch(),
        mockLaunch(),
      ]));
      getPayloadMock.mockImplementation((id: string) => Promise.resolve(mockPayload({ id })));
      await expect(getTotalDragonFlightTime()).resolves.toEqual(5600 * 2);
    });

    it('should throw error if fetching fails', async () => {
      const error = new Error();
      getPastLaunchesMock.mockImplementationOnce(() => Promise.resolve([mockLaunch()]));
      getPayloadMock.mockImplementation(() => Promise.reject(error));
      await expect(getTotalDragonFlightTime()).rejects.toEqual(error);
    });
  });
});
