import { SPACEX_BASE_URL } from './spacexConfig';
import { CrewMember } from '../domain/entities/crewMember';
import { GetCrewMember } from '../domain/entities/crewMemberRepository';

export interface CrewMemberDto {
  id: string;
  agency: string | null;
}

const mapCrewMember = (crewMemberDto: CrewMemberDto): CrewMember => ({
  id: crewMemberDto.id,
  agency: crewMemberDto.agency,
});

export const getCrewMember: GetCrewMember = async (id: string) => {
  return fetch(`${SPACEX_BASE_URL}/crew/${id}`)
    .then(response => {
      return response.json() as Promise<CrewMemberDto>;
    })
    .then(mapCrewMember);
}
