export interface Launch {
  id: string;
  flightNumber: number;
  name: string;
  date: Date;
  datePrecision: 'half' | 'quarter' | 'year' | 'month' | 'day' | 'hour';
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
}
