export interface TripProps {
  _id: string;
  payload: {
    name: string;
    country: string;
  };
  enabled: boolean;
  image: File | null;
  flag: File | null;
}
