import { mockLaunch, mockLaunchpad } from '../../testing/mockModels';
import { createGetKscRocketCountWithRecoveredFairings } from '../getKscRocketCountWithRecoveredFairingsFactory';

describe('getKscRocketCountWithRecoveredFairingsFactory', () => {
  describe('createGetRocketCountWithRecoveredFairingsLaunchedFromKsc', () => {
    const getPastLaunchesMock = jest.fn();
    const getLaunchpadMock = jest.fn();
    const getKscRocketCountWithRecoveredFairings =
      createGetKscRocketCountWithRecoveredFairings(getPastLaunchesMock, getLaunchpadMock);

    it('should return KSC-launched rocket count with recovered fairings', async () => {
      const ksc = 'Kennedy Space Center Historic Launch Complex 39A';
      getPastLaunchesMock.mockImplementationOnce(() => Promise.resolve([
        mockLaunch(),
        mockLaunch({ launchpad: 'launchpad-id-2', fairings: { recovered: true, reused: false } }),
        mockLaunch({ launchpad: 'launchpad-id-3', fairings: { recovered: false, reused: false } }),
        mockLaunch({ launchpad: 'launchpad-id-2', fairings: { recovered: false, reused: false } }),
        mockLaunch({ launchpad: null }),
      ]));
      getLaunchpadMock
        .mockImplementationOnce((id: string) => Promise.resolve(mockLaunchpad({ id, fullName: 'a' })))
        .mockImplementationOnce((id: string) => Promise.resolve(mockLaunchpad({ id, fullName: ksc })))
        .mockImplementationOnce((id: string) => Promise.resolve(mockLaunchpad({ id, fullName: 'b' })))
        .mockImplementationOnce((id: string) => Promise.resolve(mockLaunchpad({ id, fullName: ksc })));
      await expect(getKscRocketCountWithRecoveredFairings()).resolves.toEqual(1);
    });

    it('should throw error if fetching fails', async () => {
      const error = new Error();
      getPastLaunchesMock.mockImplementationOnce(() => Promise.resolve([mockLaunch()]));
      getLaunchpadMock.mockImplementation(() => Promise.reject(error));
      await expect(getKscRocketCountWithRecoveredFairings()).rejects.toEqual(error);
    });
  });
});