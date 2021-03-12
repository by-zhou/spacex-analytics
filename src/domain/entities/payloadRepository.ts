import { Payload } from './payload';

export type GetPayload = (id: string) => Promise<Payload>;
