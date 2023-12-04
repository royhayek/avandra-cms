// Interfaces

declare module '@mui/material/styles' {
  interface Theme {
    isRTL: boolean;
    colors: {
      primary: string;
      secondary: string;
      textPrimary: string;
      background: string;
      divider: string;
      paper: string;
      green: string;
      white: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    isRTL?: boolean;
    colors?: {
      primary: string;
      secondary: string;
      textPrimary: string;
      background: string;
      divider: string;
      paper: string;
      green: string;
      white: string;
    };
  }
}

// Colors

export const light_colors = {
  primary: '#33B37D',
  secondary: '#949494',
  textPrimary: '#2C384AF2',
  background: '#F8F8F8',
  divider: '#F7F7F7',
  paper: '#FFFFFF',
  green: '#0B5563',
  white: '#FFFFFF'
};

export const dark_colors = {
  primary: '#33B37D',
  secondary: '#9F9FA0',
  textPrimary: '#FFFFFF',
  background: '#20222A',
  divider: '#272930',
  paper: '#181A21',
  green: '#0b5563',
  white: '#FFFFFF'
};
