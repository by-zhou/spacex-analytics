import { Launch } from '../entities/launch';
import { Payload } from '../entities/payload';
import { Launchpad } from '../entities/launchpad';
import { CrewMember } from '../entities/crewMember';

export const mockLaunch = (launch: Partial<Launch> = {}) => {
  const defaultLaunch: Launch = {
    id: 'launch-id-1',
    flightNumber: 23,
    name: 'test-launch-1',
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
    launchpad: 'launchpad-id-1'
  };
  return { ...defaultLaunch, ...launch }
};

export const mockLaunchpad = (launchpad: Partial<Launchpad> = {}) => {
  const defaultLaunchpad: Launchpad = {
    id: 'launchpad-id-1',
    name: 'test-launchpad-1',
    fullName: 'full-test-launchpad-1',
  };
  return { ...defaultLaunchpad, ...launchpad }
};

export const mockCrewMember = (crew: Partial<CrewMember> = {}) => {
  const defaultCrewMember: CrewMember = {
    id: 'crew-member-id-1',
    agency: 'ESA',
  };
  return { ...defaultCrewMember, ...crew }
};

export const mockPayload = (payload: Partial<Payload> = {}) => {
  const defaultPayload: Payload = {
    id: 'payload-id-1',
    name: 'test-payload-1',
    type: 'Dragon 1.0',
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
