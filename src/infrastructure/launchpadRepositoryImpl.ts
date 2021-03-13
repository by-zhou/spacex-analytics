import { SPACEX_BASE_URL } from './spacexConfig';
import { Launchpad } from '../domain/entities/launchpad';
import { GetLaunchpad } from '../domain/entities/launchpadRepository';

export interface LaunchpadDto {
  id: string;
  name: string | null;
  full_name: string | null;
}

const mapLaunchpad = (launchpadDto: LaunchpadDto): Launchpad => ({
  id: launchpadDto.id,
  name: launchpadDto.name,
  fullName: launchpadDto.full_name,
});

export const getLaunchpad: GetLaunchpad = async (id: string) => {
  return fetch(`${SPACEX_BASE_URL}/launchpads/${id}`)
    .then(response => {
      return response.json() as Promise<LaunchpadDto>;
    })
    .then(mapLaunchpad);
}
