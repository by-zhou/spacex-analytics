import { mockLaunch } from '../../testing/mockModels';
import { createGetSuccessfulLaunchCount } from '../getSuccessfulLaunchCountFactory';

describe('getSuccessfulLaunchCountFactory', () => {
  describe('createGetSuccessfulCount', () => {
    const getPastLaunchesMock = jest.fn();
    const getSuccessfulLaunchCount = createGetSuccessfulLaunchCount(getPastLaunchesMock);

    it('should return number of all successful launches', async () => {
      getPastLaunchesMock.mockImplementationOnce(() => Promise.resolve([
        mockLaunch({ success: false }),
        mockLaunch(),
        mockLaunch(),
      ]));
      await expect(getSuccessfulLaunchCount()).resolves.toEqual(2);
    });

    it('should throw error if fetching fails', async () => {
      const error = new Error();
      getPastLaunchesMock.mockImplementationOnce(() => Promise.reject(error));
      await expect(getSuccessfulLaunchCount()).rejects.toEqual(error);
    });
  });
});
