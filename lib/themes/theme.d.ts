export declare const defaultColors: {
    light: {
        modalBackground: string;
        titleColor: string;
        messageColor: string;
        iconColor: string;
        backdropColor: string;
        buttonText: string;
        secondaryButtonText: string;
        secondaryButtonBorder: string;
    };
    dark: {
        modalBackground: string;
        titleColor: string;
        messageColor: string;
        iconColor: string;
        backdropColor: string;
        buttonText: string;
        secondaryButtonText: string;
        secondaryButtonBorder: string;
    };
};
export declare const useCurrentTheme: (theme: "light" | "dark" | "auto") => () => "light" | "dark";
