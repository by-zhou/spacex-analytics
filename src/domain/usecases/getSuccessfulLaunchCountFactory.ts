import { GetPastLaunches } from '../entities/launchRepository';

export type GetSuccessfulLaunchCount = () => Promise<number>;

export const createGetSuccessfulLaunchCount = (getPastLaunches: GetPastLaunches): GetSuccessfulLaunchCount =>
  async () => {
  const pastLaunches = await getPastLaunches();
  return  pastLaunches.filter(launch => launch.success === true).length;
};
