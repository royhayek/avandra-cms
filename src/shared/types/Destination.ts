import { LanguageProps } from './Language';

export interface DestinationProps {
  _id: string;
  name: object;
  country: object;
  enabled: boolean;
  image: File | null;
  bestTime: string;
  spokenLang: string;
  flag: File | null;
  gallery: File[] | null;
  language: LanguageProps;
}
