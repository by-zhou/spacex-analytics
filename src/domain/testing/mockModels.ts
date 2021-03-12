import { Launch } from '../entities/launch';
import { Payload } from '../entities/payload';

export const mockLaunch = (launch: Partial<Launch> = {}) => {
  const defaultLaunch: Launch = {
    id: 'launch-id-1',
    flightNumber: 23,
    name: 'Launch 1',
    date: new Date(Date.UTC(2021, 2, 12, 0, 0, 0)),
    datePrecision: 'hour',
    tbd: false,
    net: false,
    rocket: null,
    success: true,
    upcoming: false,
    fairings: null,
    crew: [],
    capsules: ['capsule-id-1'],
    payloads: ['payload-id-1'],
  };
  return { ...defaultLaunch, ...launch }
};

export const mockPayload = (payload: Partial<Payload> = {}) => {
  const defaultPayload: Payload = {
    id: 'payload-id-1',
    name: 'test-payload',
    type: 'dragon',
    reused: false,
    launch: 'launch-id-1',
    nationalities: [],
    dragon: {
      capsule: 'capsule-id-1',
      flightTimeSec: 5600,
      waterLanding: false,
      landLanding: true,
    },
  };
  return { ...defaultPayload, ...payload }
};
