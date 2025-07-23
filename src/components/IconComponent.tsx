// RenderIcon.tsx

import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { IconLibraries, IconConfig, ColorValue } from "../services";

interface RenderIconProps {
  iconConfig: IconConfig;
  currentTheme: 'light' | 'dark';
  resolveColor: (color: ColorValue | undefined, fallback: string) => string;
  defaultColors: {
    light: any;
    dark: any;
  };
}

export const RenderIcon: React.FC<RenderIconProps> = ({
  iconConfig,
  currentTheme,
  resolveColor,
  defaultColors,
}) => {
  const IconComponent = IconLibraries[iconConfig.library];

  if (!IconComponent) {
    console.warn(`Icon library "${iconConfig.library}" not found. Falling back to MaterialIcons.`);
    return (
      <MaterialIcons
        name="help-outline"
        size={iconConfig.size}
        color={resolveColor(iconConfig.color, defaultColors[currentTheme].iconColor)}
      />
    );
  }

  return (
    <IconComponent
      name={iconConfig.name as any}
      size={iconConfig.size}
      color={resolveColor(iconConfig.color, defaultColors[currentTheme].iconColor)}
    />
  );
};
