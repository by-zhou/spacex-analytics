export interface Payload {
  id: string;
  name: string;
  type: string | null;
  reused: boolean;
  launch: string | null;
  nationalities: string[];
  dragon: {
    capsule: string | null;
    flightTimeSec: number | null;
    waterLanding: boolean | null;
    landLanding: boolean | null;
  };
}
