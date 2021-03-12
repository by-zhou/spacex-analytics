import { SPACEX_BASE_URL } from './spacexConfig';
import { Payload } from '../domain/entities/payload';
import { GetPayload } from '../domain/entities/payloadRepository';

export interface PayloadDto {
  id: string;
  name: string;
  type: string | null;
  reused: boolean;
  launch: string | null;
  nationalities: string[];
  dragon: {
    capsule: string | null;
    flight_time_sec: number | null;
    water_landing: boolean | null;
    land_landing: boolean | null;
  };
}

const mapPayload = (payloadDto: PayloadDto): Payload => ({
  id: payloadDto.id,
  name: payloadDto.name,
  type: payloadDto.type,
  reused: payloadDto.reused,
  launch: payloadDto.launch,
  nationalities: payloadDto.nationalities,
  dragon: {
    capsule: payloadDto.dragon.capsule,
    flightTimeSec: payloadDto.dragon.flight_time_sec,
    waterLanding: payloadDto.dragon.water_landing,
    landLanding: payloadDto.dragon.land_landing,
  },
});

export const getPayload: GetPayload = async (id: string) => {
  return fetch(`${SPACEX_BASE_URL}/payloads/${id}`)
    .then(response => {
      return response.json() as Promise<PayloadDto>;
    })
    .then(mapPayload);
}
