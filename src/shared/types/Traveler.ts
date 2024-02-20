export interface TravelOptionProps {
  _id: string;
  icon: string;
  enabled: boolean;
  title: { [key: string]: string };
  description: { [key: string]: string };
}
