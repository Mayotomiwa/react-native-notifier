import { ColorValue, IconConfig } from "./services";
export interface ButtonConfig {
    title: string;
    onPress: () => void;
    secondaryButtonColor?: ColorValue;
    primaryButtonColor?: ColorValue;
    primaryButtonText?: ColorValue;
    secondaryButtonText?: ColorValue;
}
export interface NotifierProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    icon?: IconConfig | string;
    iconColor?: ColorValue;
    iconBackGroundColor?: ColorValue;
    primaryButton?: ButtonConfig;
    secondaryButton?: ButtonConfig;
    animationDuration?: number;
    backdropColor?: ColorValue;
    theme?: "light" | "dark" | "auto";
}
