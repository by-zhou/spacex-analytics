import { CrewMember } from './crewMember';

export type GetCrewMember = (id: string) => Promise<CrewMember>;
