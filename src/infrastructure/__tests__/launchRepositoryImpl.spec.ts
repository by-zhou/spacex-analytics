import fetchMock from 'fetch-mock-jest';

import { mockLaunch } from '../../domain/testing/mockModels';
import { getPastLaunches, getUpcomingLaunches, LaunchDto } from '../launchRepositoryImpl';

const mockLaunchDto = (lauchDto: Partial<LaunchDto> = {}) => {
  const defaultLaunchDto: LaunchDto = {
      id: 'launch-id-1',
      flight_number: 23,
      name: 'test-launch-1',
      date_utc: new Date(Date.UTC(2021, 2, 12, 0, 0, 0)).toISOString(),
      date_precision: 'hour',
      tbd: false,
      net: false,
      rocket: null,
      success: true,
      upcoming: false,
      fairings: null,
      crew: [],
      capsules: ['capsule-id-1'],
      payloads: ['payload-id-1'],
      launchpad: 'launchpad-id-1',
    };
  return { ...defaultLaunchDto, ...lauchDto };
};

describe('launchRepositoryImpl', () => {
  describe('getPastLaunches', () => {
    it('should return all past launches', async () => {
      fetchMock.getOnce(/launches\/past/, [
        mockLaunchDto(),
        mockLaunchDto({ id: 'launch-id-2' }),
      ]);
      await expect(getPastLaunches()).resolves.toEqual([
        mockLaunch(),
        mockLaunch({ id: 'launch-id-2' })
      ])
    });
  });

  describe('getUpcomingLaunches', () => {
    it('should return all upcoming launches', async () => {
      fetchMock.getOnce(/launches\/upcoming/, [
        mockLaunchDto(),
        mockLaunchDto({ id: 'launch-id-2' }),
      ]);
      await expect(getUpcomingLaunches()).resolves.toEqual([
        mockLaunch(),
        mockLaunch({ id: 'launch-id-2' })
      ])
    });
  });
});
