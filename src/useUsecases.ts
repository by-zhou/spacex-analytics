import { getPastLaunches, getUpcomingLaunches } from './infrastructure/launchRepositoryImpl';
import { getPayload } from './infrastructure/payloadRepositoryImpl';
import { createGetSuccessfulLaunchCount } from './domain/usecases/getSuccessfulLaunchCountFactory';
import { createGetTotalDragon2FlightTime } from './domain/usecases/getTotalDragon2FlightTimeFactory';
import { createGetKscRocketCountWithRecoveredFairings } from './domain/usecases/getKscRocketCountWithRecoveredFairingsFactory';
import { getLaunchpad } from './infrastructure/launchpadRepositoryImpl';
import { createGetUpcomingNasaCrewMemberCount } from './domain/usecases/getUpcomingNasaCrewMemberCountFactory';
import { getCrewMember } from './infrastructure/crewMemberRepositoryImpl';

const usecases = {
  getKscRocketCountWithRecoveredFairings: createGetKscRocketCountWithRecoveredFairings(getPastLaunches, getLaunchpad),
  getSuccessfulLaunchCount: createGetSuccessfulLaunchCount(getPastLaunches),
  getTotalDragon2FlightTime: createGetTotalDragon2FlightTime(getPastLaunches, getPayload),
  getUpcomingNasaCrewMemberCount: createGetUpcomingNasaCrewMemberCount(getUpcomingLaunches, getCrewMember),
};

export const useUsecases = () => usecases;
