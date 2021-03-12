import { SPACEX_BASE_URL } from './spacexConfig';
import { Launch } from '../domain/entities/launch';
import { GetPastLaunches } from '../domain/entities/launchRepository';

export interface LaunchDto {
  id: string;
  flight_number: number;
  name: string;
  date_utc: string;
  date_precision: 'half' | 'quarter' | 'year' | 'month' | 'day' | 'hour';
  tbd: boolean;
  net: boolean;
  rocket: string | null;
  success: boolean | null;
  upcoming: boolean;
  fairings: {
    reused: boolean | null;
    recovered: boolean | null;
  } | null;
  crew: string[];
  capsules: string[];
  payloads: string[];

  // Rest of the fields are ignored
}

const mapLaunch = (launchDto: LaunchDto): Launch => ({
  id: launchDto.id,
  flightNumber: launchDto.flight_number,
    name: launchDto.name,
  date: new Date(launchDto.date_utc),
  datePrecision: launchDto.date_precision,
  tbd: launchDto.tbd,
  net: launchDto.net,
  rocket: launchDto.rocket,
  success: launchDto.success,
  upcoming: launchDto.upcoming,
  fairings: launchDto.fairings ? {
    reused: launchDto.fairings.reused,
    recovered: launchDto.fairings.recovered,
  } : null,
  crew: launchDto.crew,
    capsules: launchDto.capsules,
  payloads: launchDto.payloads,
});

export const getPastLaunches: GetPastLaunches = async () => {
  return fetch(`${SPACEX_BASE_URL}/launches/past`)
    .then(response => {
      return response.json() as Promise<LaunchDto[]>;
    })
    .then(launchDtos => launchDtos.map(mapLaunch));
};
