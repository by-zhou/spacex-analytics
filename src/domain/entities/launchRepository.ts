import { Launch } from './launch';

export type GetPastLaunches = () => Promise<Launch[]>;

export type GetUpcomingLaunches = () => Promise<Launch[]>;
