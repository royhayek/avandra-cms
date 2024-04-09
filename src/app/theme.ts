// Packages
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { PaletteOptions, PaletteMode, createTheme } from '@mui/material';

// Utilities
import { light_colors, dark_colors } from '../shared/assets/theme/colors';

export const getCustomTheme = (isRTL = true, type: PaletteMode = 'light') => {
  const defaultTheme = createTheme(); // Default MUI theme

  const fontFamily = ['Urbanist', 'sans-serif'].join(',');
  const isDark = !!String(type).match(/dark/i);
  const colors = isDark ? dark_colors : light_colors;

  const palette: PaletteOptions = {
    mode: type,
    primary: {
      main: colors.primary
    },
    secondary: {
      main: colors.secondary
    },
    text: {
      primary: colors.textPrimary
    },
    background: {
      default: colors.background,
      paper: colors.paper
    },
    divider: colors.divider
  };

  const typography: TypographyOptions = {
    fontFamily,
    subtitle1: {
      fontWeight: 600,
      fontSize: '1.1rem',
      marginBottom: 16
    },
    subtitle2: {
      fontWeight: 600,
      textTransform: 'none'
    },
    body1: {
      fontWeight: 600
    },
    h5: {
      fontWeight: 600
    },
    caption: {
      textTransform: 'none'
    }
  };

  return createTheme({
    isRTL,
    colors,
    palette,
    typography,
    components: {
      MuiCssBaseline: {
        styleOverrides: `
        body {
          background-color: ${type === 'light' ? light_colors.background : dark_colors.background};
        }
      `
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: colors.secondary
          }
        }
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 36,
            height: 20,
            padding: 0,
            marginRight: 10,
            '& .MuiSwitch-switchBase': {
              padding: 0,
              margin: 2,
              transitionDuration: '300ms',
              '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: light_colors.white,
                '& + .MuiSwitch-track': {
                  border: 0,
                  opacity: 1,
                  backgroundColor: colors.primary
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                  opacity: 0.5
                }
              },
              '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff'
              },
              '&.Mui-disabled .MuiSwitch-thumb': {
                color: palette.mode === 'light' ? colors.secondary[100] : colors.secondary[600]
              },
              '&.Mui-disabled + .MuiSwitch-track': {
                opacity: palette.mode === 'light' ? 0.7 : 0.3
              }
            },
            '& .MuiSwitch-thumb': {
              width: 16,
              height: 16,
              boxSizing: 'border-box'
            },
            '& .MuiSwitch-track': {
              opacity: 1,
              borderRadius: 26 / 2,
              backgroundColor: palette.mode === 'light' ? '#E9E9EA' : '#39393D',
              transition: defaultTheme.transitions.create(['background-color'], {
                duration: 500
              })
            }
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          startIcon: {
            marginLeft: 0,
            marginRight: 0
          }
        }
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            backgroundColor: type === 'light' ? light_colors.background : dark_colors.background
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            color: type === 'light' ? '#8E8E8E' : '#818182'
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-root.Mui-disabled:before': {
              color: 'black',
              fontSize: '16px',
              borderBottom: 'none'
            }
          }
        }
      }
    }
  });
};
