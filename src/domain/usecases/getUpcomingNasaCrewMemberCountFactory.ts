import { GetUpcomingLaunches } from '../entities/launchRepository';
import { GetCrewMember } from '../entities/crewMemberRepository';

export type GetUpcomingNasaCrewMemberCount = () => Promise<number>;

export const createGetUpcomingNasaCrewMemberCount = (getUpcomingLaunches: GetUpcomingLaunches, getCrewMember: GetCrewMember): GetUpcomingNasaCrewMemberCount =>
  async () => {
    const upcomingLaunches = await getUpcomingLaunches();
    const crewMembers = await Promise.all(upcomingLaunches.map(pastLaunch => pastLaunch.crew).flat().map(getCrewMember));
    return crewMembers.filter(crewMember => crewMember.agency === 'NASA').length;
  };
