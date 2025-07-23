import { 
  MaterialIcons,
  Ionicons,
  Feather,
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Entypo,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Octicons,
  Foundation,
  EvilIcons
} from "@expo/vector-icons";

// Icon library mapping
export const IconLibraries = {
  MaterialIcons,
  Ionicons,
  Feather,
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Entypo,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Octicons,
  Foundation,
  EvilIcons,
} as const;

export type IconLibrary = keyof typeof IconLibraries;

// Theme-aware color type
export interface ThemeColor {
  light: string;
  dark: string;
}

export type ColorValue = string | ThemeColor;

export interface IconConfig {
  library: IconLibrary;
  name: string;
  size?: number;
  color?: ColorValue;
  backgroundColor?: ColorValue;
  backgroundRadius?: number;
  backgroundPadding?: number;
}