import { mockLaunch, mockPayload } from '../../testing/mockModels';
import { createGetTotalDragon2FlightTime } from '../getTotalDragon2FlightTimeFactory';

describe('getTotalDragon2FlightTimeFactory', () => {
  describe('createGetTotalDragon2FlightTime', () => {
    const getPastLaunchesMock = jest.fn();
    const getPayloadMock = jest.fn();
    const getTotalDragonFlightTime = createGetTotalDragon2FlightTime(getPastLaunchesMock, getPayloadMock);

    it('should return sum of all dragon flight time', async () => {
      getPastLaunchesMock.mockImplementationOnce(() => Promise.resolve([
        mockLaunch(),
        mockLaunch({ payloads: ['payload-id-2'] }),
        mockLaunch({ payloads: ['payload-id-3'] }),
        mockLaunch({ payloads: ['payload-id-4'] }),
      ]));
      getPayloadMock
        .mockImplementationOnce((id: string) => Promise.resolve(mockPayload({ id, type: 'Dragon 1.0' })))
        .mockImplementationOnce((id: string) => Promise.resolve(mockPayload({ id, type: 'Dragon 2.0' })))
        .mockImplementationOnce((id: string) => Promise.resolve(mockPayload({ id, type: 'Dragon 2.0' })))
        .mockImplementationOnce((id: string) => Promise.resolve(mockPayload({
          id,
          type: 'Dragon 2.0',
          dragon: {
            capsule: null,
            flightTimeSec: null,
            waterLanding: null,
            landLanding: null,
          }
        })));
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
