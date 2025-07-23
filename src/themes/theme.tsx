import { useCallback } from "react";
import { useColorScheme } from "react-native";

// Default theme colors
export const defaultColors = {
  light: {
    modalBackground: "#FFFFFF",
    titleColor: "#1A1A1A",
    messageColor: "#666666",
    iconColor: "#007AFF",
    backdropColor: "rgba(0, 0, 0, 0.5)",
    buttonText: "#FFFFFF",
    secondaryButtonText: "#007AFF",
    secondaryButtonBorder: "#007AFF",
  },
  dark: {
    modalBackground: "#1C1C1E",
    titleColor: "#FFFFFF",
    messageColor: "#AEAEB2",
    iconColor: "#0A84FF",
    backdropColor: "rgba(0, 0, 0, 0.7)",
    buttonText: "#FFFFFF",
    secondaryButtonText: "#0A84FF",
    secondaryButtonBorder: "#0A84FF",
  },
};

  // Determine current theme

    const systemColorScheme = useColorScheme();
  
// useCurrentTheme.ts

export const useCurrentTheme = (theme: "light" | "dark" | "auto") => {
  const systemColorScheme = useColorScheme();

  const getCurrentTheme = useCallback((): "light" | "dark" => {
    if (theme === "auto") {
      return systemColorScheme === "dark" ? "dark" : "light";
    }
    return theme;
  }, [theme, systemColorScheme]);

  return getCurrentTheme;
};
