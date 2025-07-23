// RenderIcon.tsx
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { IconLibraries } from "../services";
export const RenderIcon = ({ iconConfig, currentTheme, resolveColor, defaultColors, }) => {
    const IconComponent = IconLibraries[iconConfig.library];
    if (!IconComponent) {
        console.warn(`Icon library "${iconConfig.library}" not found. Falling back to MaterialIcons.`);
        return (<MaterialIcons name="help-outline" size={iconConfig.size} color={resolveColor(iconConfig.color, defaultColors[currentTheme].iconColor)}/>);
    }
    return (<IconComponent name={iconConfig.name} size={iconConfig.size} color={resolveColor(iconConfig.color, defaultColors[currentTheme].iconColor)}/>);
};
