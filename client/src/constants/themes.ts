import normalize from 'react-native-normalize';

export const GlobalTheme = {
  $fontFamily: 'Avenir',
  $screenPaddingHorizontal: normalize(20),
  $red: '#f54963',
};

export const LightTheme = {
  ...GlobalTheme,
  $theme: 'light',
  $backgroundColor: 'white',
  $primary: '#131415',
  $gray: '#939495',
  $barStyle: 'dark-content',
};

export const DarkTheme = {
  ...GlobalTheme,
  $theme: 'dark',
  $backgroundColor: 'black',
  $primary: '#ECEBEA',
  $gray: '#939495',
  $barStyle: 'light-content',
};

// Available themes
export type Theme = 'light' | 'dark';

export const Themes: Record<Theme, any> = {
  light: LightTheme,
  dark: DarkTheme,
};
