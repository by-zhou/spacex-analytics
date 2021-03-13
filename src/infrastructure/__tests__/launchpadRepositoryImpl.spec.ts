import fetchMock from 'fetch-mock-jest';

import { mockLaunchpad } from '../../domain/testing/mockModels';
import { getLaunchpad, LaunchpadDto } from '../launchpadRepositoryImpl';

const mockPayloadDto = (launchpadDto: Partial<LaunchpadDto> = {}) => {
  const defaultLaunchpadDto: LaunchpadDto = {
    id: 'launchpad-id-1',
    name: 'test-launchpad-1',
    full_name: 'full-test-launchpad-1',
  };
  return { ...defaultLaunchpadDto, ...launchpadDto };
};

describe('launchpadRepositoryImpl', () => {
  describe('getLaunchpad', () => {
    it('should return requested launchpad', async () => {
      fetchMock.getOnce(/launchpads\/.+/, mockPayloadDto);
      await expect(getLaunchpad('launchpad-id-1')).resolves.toEqual(mockLaunchpad())
    });
  });
});