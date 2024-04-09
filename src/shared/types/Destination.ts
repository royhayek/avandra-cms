import { LanguageProps } from './Language';

export interface DestinationProps {
  _id: string;
  name: object;
  country: object;
  enabled: boolean;
  image: File | null;
  flag: File | null;
  gallery: File[] | null;
  language: LanguageProps;
}
