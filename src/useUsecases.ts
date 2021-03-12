import { getPastLaunches } from './infrastructure/lauchRepositoryImpl';
import { getPayload } from './infrastructure/payloadRepositoryImpl';
import { createGetSuccessfulLaunchCount } from './domain/usecases/getSuccessfulLaunchCountFactory';
import { createGetTotalDragonFlightTime } from './domain/usecases/getTotalDragonFlightTimeFactory';

const usecases = {
  getSuccessfulLaunchCount: createGetSuccessfulLaunchCount(getPastLaunches),
  getTotalDragonFlightTime: createGetTotalDragonFlightTime(getPastLaunches, getPayload),
};

export const useUsecases = () => usecases;
