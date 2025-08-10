import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import type { Theme } from '@react-navigation/native'

export interface ExtendedTheme extends Theme {
  colors: Theme['colors'] & {
    muted: string;
    blue: string;
    green: string;
    profit: string;
    red: string;
    highlight: string;
    newBorder: string
  }
}


declare module '@react-navigation/native' {
  export function useTheme(): ExtendedTheme
}

const MyLightTheme: ExtendedTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    primary: '#6366f1',
    // blue: '#6366f1',
    blue: "#007AFF",
    card: '#f2f2f2',
    muted: '#A1A7B3',
    text: '#000000',
    border: '#E6E6E6',
    notification: '#828487',
    green: "#14532d",
    highlight: "#fe9a00",
    profit: "#36AE7C",
    red: '#DF2E38',
    newBorder: '#c9c7bf',
  }
};

const MyDarkTheme: ExtendedTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#000000',
    primary: '#6366f1',
    // blue: '#6366f1',
    card: '#1F1F1F',
    muted: '#A1A7B3',
    blue: "#007AFF",
    text: '#FFFFFF',
    border: '#333333',
    notification: '#A1A7B3',
    green: "#dcfce7",
    highlight: "#fe9a00",
    profit: "#36AE7C",
    red: '#C70D3A',
    newBorder: '#5e5f5f',
  }
};

export { MyLightTheme, MyDarkTheme };
