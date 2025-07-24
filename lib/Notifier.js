import React, { useEffect, useRef, useState, useCallback } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, StatusBar, useColorScheme, } from "react-native";
import { RenderIcon } from "./components";
import { defaultColors, useCurrentTheme } from "./themes";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
// Fix: Use explicit return type instead of React.FC
export const Notifier = ({ visible, onClose, title, message, icon = { library: "MaterialIcons", name: "visibility" }, iconColor = "#007AFF", primaryButton, secondaryButton, animationDuration = 300, backdropColor, iconBackGroundColor, theme = "auto", }) => {
    const systemColorScheme = useColorScheme();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.3)).current;
    const iconPulseAnim = useRef(new Animated.Value(1)).current;
    const iconBackgroundPulseAnim = useRef(new Animated.Value(1)).current;
    // Internal state to control modal visibility for animations
    const [internalVisible, setInternalVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const iconPulseRef = useRef(null);
    const iconBackgroundPulseRef = useRef(null);
    // Determine current theme
    const getCurrentTheme = useCurrentTheme(theme);
    const currentTheme = getCurrentTheme();
    // Helper function to resolve color based on theme
    const resolveColor = useCallback((color, fallback) => {
        if (!color)
            return fallback;
        if (typeof color === "string") {
            return color;
        }
        return currentTheme === "dark" ? color.dark : color.light;
    }, [currentTheme]);
    // Parse icon configuration
    const getIconConfig = useCallback(() => {
        if (typeof icon === "string") {
            // Legacy support: assume MaterialIcons
            return {
                library: "MaterialIcons",
                name: icon,
                size: 48,
                color: iconColor,
                backgroundColor: iconBackGroundColor || "transparent",
                backgroundRadius: 24,
                backgroundPadding: 8,
            };
        }
        return {
            library: icon.library,
            name: icon.name,
            size: icon.size || 48,
            color: icon.color || iconColor,
            backgroundColor: icon.backgroundColor || iconBackGroundColor || "transparent",
            backgroundRadius: icon.backgroundRadius || (icon.size || 48) / 2 + 8,
            backgroundPadding: icon.backgroundPadding || 8,
        };
    }, [icon, iconColor, iconBackGroundColor]);
    const iconConfig = getIconConfig();
    // Stop pulsing animations
    const stopPulsingAnimations = useCallback(() => {
        if (iconPulseRef.current) {
            iconPulseRef.current.stop();
            iconPulseRef.current = null;
        }
        if (iconBackgroundPulseRef.current) {
            iconBackgroundPulseRef.current.stop();
            iconBackgroundPulseRef.current = null;
        }
    }, []);
    // Start pulsing animations
    const startPulsingAnimations = useCallback(() => {
        // Stop any existing animations first
        stopPulsingAnimations();
        // Icon pulsing animation
        const iconPulseAnimation = Animated.loop(Animated.sequence([
            Animated.timing(iconPulseAnim, {
                toValue: 1.2,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(iconPulseAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]));
        // Icon background pulsing animation (slightly different timing for visual interest)
        const iconBackgroundPulseAnimation = Animated.loop(Animated.sequence([
            Animated.timing(iconBackgroundPulseAnim, {
                toValue: 1.15,
                duration: 1200,
                useNativeDriver: true,
            }),
            Animated.timing(iconBackgroundPulseAnim, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            }),
        ]));
        iconPulseRef.current = iconPulseAnimation;
        iconBackgroundPulseRef.current = iconBackgroundPulseAnimation;
        iconPulseAnimation.start();
        iconBackgroundPulseAnimation.start();
    }, [iconPulseAnim, iconBackgroundPulseAnim, stopPulsingAnimations]);
    // Show modal animation
    const showModal = useCallback(() => {
        setInternalVisible(true);
        setIsAnimating(true);
        // Reset animations to initial state
        fadeAnim.setValue(0);
        scaleAnim.setValue(0.3);
        iconPulseAnim.setValue(1);
        iconBackgroundPulseAnim.setValue(1);
        // Modal entrance animation with proper fade in and zoom in
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: animationDuration,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 100,
                friction: 8,
                useNativeDriver: true,
            }),
        ]).start((finished) => {
            if (finished) {
                setIsAnimating(false);
                // Start pulsing animations after modal is fully shown
                setTimeout(() => {
                    startPulsingAnimations();
                }, 100);
            }
        });
    }, [
        fadeAnim,
        scaleAnim,
        iconPulseAnim,
        iconBackgroundPulseAnim,
        animationDuration,
        startPulsingAnimations,
    ]);
    // Hide modal animation
    const hideModal = useCallback(() => {
        setIsAnimating(true);
        // Stop pulsing animations first
        stopPulsingAnimations();
        // Modal exit animation with proper fade out and zoom out
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: animationDuration,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 0.3,
                duration: animationDuration,
                useNativeDriver: true,
            }),
        ]).start((finished) => {
            // Hide modal only after animation completes
            if (finished) {
                setInternalVisible(false);
                setIsAnimating(false);
            }
        });
    }, [fadeAnim, scaleAnim, animationDuration, stopPulsingAnimations]);
    // Handle visibility changes
    useEffect(() => {
        if (visible && !internalVisible && !isAnimating) {
            showModal();
        }
        else if (!visible && internalVisible && !isAnimating) {
            hideModal();
        }
    }, [visible, internalVisible, isAnimating, showModal, hideModal]);
    // Cleanup animations on unmount
    useEffect(() => {
        return () => {
            stopPulsingAnimations();
        };
    }, [stopPulsingAnimations]);
    const renderButtons = () => {
        const buttons = [];
        if (secondaryButton) {
            const secondaryBorderColor = resolveColor(secondaryButton.secondaryButtonColor, defaultColors[currentTheme].secondaryButtonBorder);
            const secondaryTextColor = resolveColor(secondaryButton.secondaryButtonText, defaultColors[currentTheme].secondaryButtonText);
            buttons.push(<TouchableOpacity key="secondary" style={[
                    styles.button,
                    styles.secondaryButton,
                    { borderColor: secondaryBorderColor },
                ]} onPress={secondaryButton.onPress} activeOpacity={0.7}>
          <Text style={[styles.buttonText, { color: secondaryTextColor }]}>
            {secondaryButton.title}
          </Text>
        </TouchableOpacity>);
        }
        if (primaryButton) {
            const primaryBgColor = resolveColor(primaryButton.primaryButtonColor, defaultColors[currentTheme].secondaryButtonBorder);
            const primaryTextColor = resolveColor(primaryButton.primaryButtonText, defaultColors[currentTheme].buttonText);
            buttons.push(<TouchableOpacity key="primary" style={[
                    styles.button,
                    styles.primaryButton,
                    { backgroundColor: primaryBgColor },
                ]} onPress={primaryButton.onPress} activeOpacity={0.7}>
          <Text style={[styles.buttonText, { color: primaryTextColor }]}>
            {primaryButton.title}
          </Text>
        </TouchableOpacity>);
        }
        return buttons;
    };
    // Don't render the modal if it's not visible and not animating
    if (!internalVisible && !isAnimating) {
        return null;
    }
    const resolvedBackdropColor = resolveColor(backdropColor, defaultColors[currentTheme].backdropColor);
    const resolvedIconBackgroundColor = resolveColor(iconConfig.backgroundColor, "transparent");
    return (<Modal visible={internalVisible} transparent={true} animationType="none" onRequestClose={onClose} statusBarTranslucent={true}>
      <StatusBar backgroundColor={resolvedBackdropColor} barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}/>
      <Animated.View style={[
            styles.backdrop,
            { backgroundColor: resolvedBackdropColor, opacity: fadeAnim },
        ]}>
        <TouchableOpacity style={styles.backdropTouchable} activeOpacity={1} onPress={onClose}>
          <Animated.View style={[
            styles.modalContainer,
            {
                transform: [{ scale: scaleAnim }],
                opacity: fadeAnim,
            },
        ]}>
            <TouchableOpacity activeOpacity={1} style={[
            styles.modalContent,
            {
                backgroundColor: defaultColors[currentTheme].modalBackground,
            },
        ]}>
              {/* Animated Icon with Background */}
              <View style={styles.iconWrapper}>
                {/* Icon Background with Pulsing Effect */}
                <Animated.View style={[
            styles.iconBackground,
            {
                backgroundColor: resolvedIconBackgroundColor,
                borderRadius: iconConfig.backgroundRadius,
                width: (iconConfig.size || 48) +
                    (iconConfig.backgroundPadding || 8) * 2,
                height: (iconConfig.size || 48) +
                    (iconConfig.backgroundPadding || 8) * 2,
                transform: [{ scale: iconBackgroundPulseAnim }],
            },
        ]}/>

                {/* Icon with Pulsing Effect */}
                <Animated.View style={[
            styles.iconContainer,
            {
                backgroundColor: resolvedIconBackgroundColor,
                transform: [{ scale: iconPulseAnim }],
            },
        ]}>
                  <RenderIcon iconConfig={iconConfig} currentTheme={currentTheme} resolveColor={resolveColor} defaultColors={defaultColors}/>
                </Animated.View>
              </View>

              {/* Title */}
              {title && (<Text style={[
                styles.title,
                { color: defaultColors[currentTheme].titleColor },
            ]}>
                  {title}
                </Text>)}

              {/* Message */}
              {message && (<Text style={[
                styles.message,
                { color: defaultColors[currentTheme].messageColor },
            ]}>
                  {message}
                </Text>)}

              {/* Dynamic Buttons */}
              {(primaryButton || secondaryButton) && (<View style={styles.buttonContainer}>{renderButtons()}</View>)}
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Modal>);
};
const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    backdropTouchable: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    modalContainer: {
        width: screenWidth * 0.9,
        maxWidth: 400,
        maxHeight: screenHeight * 0.55,
    },
    modalContent: {
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 10,
    },
    iconWrapper: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    iconBackground: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    iconContainer: {
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 8,
    },
    message: {
        fontSize: 16,
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 24,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        gap: 12,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 44,
    },
    primaryButton: {
    // Primary button specific styles
    },
    secondaryButton: {
        borderWidth: 1,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
    },
});
export default Notifier;
