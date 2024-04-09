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
      lightGray: string;
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
      lightGray: string;
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
  white: '#FFFFFF',
  lightGray: '#FBFBFB',
  greenBg: '#EFF9F5',
  dark: {
    1: '#181A20',
    2: '#1E2025',
    3: '#1F222A',
    4: '#262A35',
    5: '#35383F'
  },
  gray: {
    900: '#212121',
    800: '#424242',
    700: '#616161',
    600: '#757575',
    500: '#9E9E9E',
    400: '#BDBDBD',
    300: '#E0E0E0',
    200: '#EEEEEE',
    100: '#F5F5F5',
    50: '#FAFAFA'
  }
};

export const dark_colors = {
  primary: '#33B37D',
  secondary: '#9F9FA0',
  textPrimary: '#FFFFFF',
  background: '#20222A',
  divider: '#272930',
  paper: '#181A21',
  green: '#0B5563',
  white: '#FFFFFF',
  lightGray: '#1C1E24',
  greenBg: '#EFF9F5',
  dark: {
    1: '#181A20',
    2: '#1E2025',
    3: '#1F222A',
    4: '#262A35',
    5: '#35383F'
  },
  gray: {
    900: '#212121',
    800: '#424242',
    700: '#616161',
    600: '#757575',
    500: '#9E9E9E',
    400: '#BDBDBD',
    300: '#E0E0E0',
    200: '#EEEEEE',
    100: '#F5F5F5',
    50: '#FAFAFA'
  }
};
