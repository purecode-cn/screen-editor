import { BoundSettings, FontSettings } from '../../declare';

export type GeneralTextProps = {
  bound: BoundSettings;
  font: FontSettings;
  text: string;
  margin: string | [string, string, string, string];
};
