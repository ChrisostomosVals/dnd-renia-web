import { theme } from '../theme';

export type Theme = typeof theme;

export type ExtendedTheme<T> = T & {
  theme: Theme;
};
