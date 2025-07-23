import React from "react";
import { IconConfig, ColorValue } from "../services";
interface RenderIconProps {
    iconConfig: IconConfig;
    currentTheme: 'light' | 'dark';
    resolveColor: (color: ColorValue | undefined, fallback: string) => string;
    defaultColors: {
        light: any;
        dark: any;
    };
}
export declare const RenderIcon: React.FC<RenderIconProps>;
export {};
