import { GetPastLaunches } from '../entities/launchRepository';
import { GetPayload } from '../entities/payloadRepository';

export type GetTotalDragonFlightTime = () => Promise<number>;

export const createGetTotalDragon2FlightTime = (getPastLaunches: GetPastLaunches, getPayload: GetPayload): GetTotalDragonFlightTime =>
  async () => {
    const pastLaunches = await getPastLaunches();
    const payloads = await Promise.all(pastLaunches.map(pastLaunch => pastLaunch.payloads).flat().map(getPayload));
    return payloads
      .filter(payload => payload.type === 'Dragon 2.0')
      .reduce((totalTime, payload) => totalTime + (payload.dragon.flightTimeSec ?? 0), 0);
  };
