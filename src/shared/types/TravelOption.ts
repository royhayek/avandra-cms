import { LanguageProps } from './Language';

export interface TravelOptionProps {
  _id: string;
  icon: string;
  enabled: boolean;
  title: string;
  description: string;
  language: LanguageProps;
}
