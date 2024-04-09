export interface TripProps {
  _id: string;
  name: string;
  country: string;
  enabled: boolean;
  image: File | null;
  flag: File | null;
}
