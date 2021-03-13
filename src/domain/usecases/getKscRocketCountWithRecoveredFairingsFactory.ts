import { GetPastLaunches } from '../entities/launchRepository';
import { GetLaunchpad } from '../entities/launchpadRepository';

export type GetKscRocketCountWithRecoveredFairings = () => Promise<number>;

export const createGetKscRocketCountWithRecoveredFairings =
  (getPastLaunches: GetPastLaunches, getLaunchpad: GetLaunchpad): GetKscRocketCountWithRecoveredFairings =>
    async () => {
      const pastLaunches = await getPastLaunches();
      const launchpads = await Promise.all(pastLaunches.map(launch => launch.launchpad ? getLaunchpad(launch.launchpad) : null));
      return launchpads.reduce((launchCount, launchpad, index) => {
        if (
          launchpad?.fullName === 'Kennedy Space Center Historic Launch Complex 39A' &&
          pastLaunches[index].fairings?.recovered
        ) {
          return launchCount + 1;
        }
        return launchCount;
      }, 0);
    };
