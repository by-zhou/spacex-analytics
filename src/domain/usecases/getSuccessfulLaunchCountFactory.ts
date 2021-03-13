import { GetPastLaunches } from '../entities/launchRepository';

export interface SuccessfulCount {
  successCount: number;
  totalCount: number;
}

export type GetSuccessfulLaunchCount = () => Promise<SuccessfulCount>;

export const createGetSuccessfulLaunchCount = (getPastLaunches: GetPastLaunches): GetSuccessfulLaunchCount =>
  async () => {
    const pastLaunches = await getPastLaunches();
    return  {
      successCount: pastLaunches.filter(launch => launch.success === true).length,
      totalCount: pastLaunches.length,
    };
  };
