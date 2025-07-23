# Notifier - React Native Notification System

A highly customizable and animated modal component for React Native applications, featuring theme support, dynamic icons, and smooth animations.

## Features

- 🎨 **Theme Support**: Automatic light/dark mode with custom theme override
- 🎭 **Multiple Icon Libraries**: Support for 12+ popular icon libraries
- ✨ **Smooth Animations**: Beautiful entrance/exit animations with pulsing effects
- 🎯 **Flexible Configuration**: Highly customizable appearance and behavior
- 📱 **Responsive Design**: Adapts to different screen sizes
- 🔧 **TypeScript Support**: Full TypeScript definitions included

## Installation

```bash
npm install your-dynamic-modal-package
# or
yarn add your-dynamic-modal-package
```

### Required Dependencies

Make sure you have these peer dependencies installed:

```bash
npm install react-native @expo/vector-icons
# or
yarn add react-native @expo/vector-icons
```

## Supported Icon Libraries

The component supports the following icon libraries from `@expo/vector-icons`:

- `MaterialIcons`
- `Ionicons`
- `Feather`
- `AntDesign`
- `FontAwesome`
- `FontAwesome5`
- `Entypo`
- `MaterialCommunityIcons`
- `SimpleLineIcons`
- `Octicons`
- `Foundation`
- `EvilIcons`

## Basic Usage

```tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import DynamicModal from 'your-dynamic-modal-package';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Show Modal</Text>
      </TouchableOpacity>

      <DynamicModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Hello World"
        message="This is a basic modal example."
        primaryButton={{
          title: "OK",
          onPress: () => setModalVisible(false)
        }}
      />
    </View>
  );
};
```

## Advanced Usage Example

```tsx
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import DynamicModal, { IconConfig } from "your-dynamic-modal-package";

interface ModalConfig {
  title?: string;
  message?: string;
  icon?: IconConfig | string;
  iconColor?: string;
  backdropColor?: string;
  iconBackGroundColor?: string;
  primaryButton?: {
    title: string;
    onPress: () => void;
    primaryButtonText?: string;
    primaryButtonColor?: string;
  };
  secondaryButton?: {
    title: string;
    onPress: () => void;
    secondaryButtonText?: string;
    secondaryButtonColor?: string;
  };
}

export const NotificationDemo = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState<ModalConfig>({});

  const showModal = (config: ModalConfig) => {
    setModalConfig(config);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Success Modal */}
      <TouchableOpacity
        style={styles.triggerButton}
        onPress={() =>
          showModal({
            title: "Success!",
            message: "Your action was completed successfully.",
            icon: { name: "checkmark", library: "Ionicons" },
            iconColor: "#fff",
            iconBackGroundColor: "#4CAF50",
            primaryButton: {
              title: "OK",
              onPress: hideModal,
            },
          })
        }
      >
        <Text style={styles.triggerButtonText}>Show Success Modal</Text>
      </TouchableOpacity>

      {/* Confirmation Modal */}
      <TouchableOpacity
        style={styles.triggerButton}
        onPress={() =>
          showModal({
            title: "Confirm Action",
            message: "Are you sure you want to proceed with this action?",
            icon: "warning",
            iconColor: "#FF9800",
            iconBackGroundColor: "#FFF3E0",
            primaryButton: {
              title: "Confirm",
              onPress: hideModal,
            },
            secondaryButton: {
              title: "Cancel",
              onPress: hideModal,
            },
          })
        }
      >
        <Text style={styles.triggerButtonText}>Show Confirmation Modal</Text>
      </TouchableOpacity>

      {/* Info Modal */}
      <TouchableOpacity
        style={styles.triggerButton}
        onPress={() =>
          showModal({
            title: "Information",
            message: "This is an informational message with only one button.",
            icon: "info",
            iconColor: "#2196F3",
            primaryButton: {
              title: "Got it",
              onPress: hideModal,
            },
          })
        }
      >
        <Text style={styles.triggerButtonText}>Show Info Modal</Text>
      </TouchableOpacity>

      <DynamicModal
        visible={modalVisible}
        onClose={hideModal}
        {...modalConfig}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  triggerButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
    minWidth: 200,
  },
  triggerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | `false` | Controls modal visibility |
| `onClose` | `() => void` | **Required** | Callback when modal should close |
| `title` | `string` | `undefined` | Modal title text |
| `message` | `string` | `undefined` | Modal message text |
| `icon` | `IconConfig \| string` | `{ library: "MaterialIcons", name: "visibility" }` | Icon configuration or legacy string |
| `iconColor` | `ColorValue` | `"#007AFF"` | Icon color (supports theme-aware colors) |
| `iconBackGroundColor` | `ColorValue` | `"transparent"` | Icon background color |
| `primaryButton` | `ButtonConfig` | `undefined` | Primary button configuration |
| `secondaryButton` | `ButtonConfig` | `undefined` | Secondary button configuration |
| `animationDuration` | `number` | `300` | Animation duration in milliseconds |
| `backdropColor` | `ColorValue` | Theme default | Backdrop overlay color |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Theme control |

### Types

#### IconConfig

```tsx
interface IconConfig {
  library: IconLibrary;
  name: string;
  size?: number;
  color?: ColorValue;
  backgroundColor?: ColorValue;
  backgroundRadius?: number;
  backgroundPadding?: number;
}
```

#### ButtonConfig

```tsx
interface ButtonConfig {
  title: string;
  onPress: () => void;
  secondaryButtonColor?: ColorValue;
  primaryButtonColor?: ColorValue;
  primaryButtonText?: ColorValue;
  secondaryButtonText?: ColorValue;
}
```

#### ColorValue

```tsx
type ColorValue = string | ThemeColor;

interface ThemeColor {
  light: string;
  dark: string;
}
```

#### IconLibrary

```tsx
type IconLibrary = 
  | 'MaterialIcons'
  | 'Ionicons'
  | 'Feather'
  | 'AntDesign'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Entypo'
  | 'MaterialCommunityIcons'
  | 'SimpleLineIcons'
  | 'Octicons'
  | 'Foundation'
  | 'EvilIcons';
```

## Theme-Aware Colors

You can use theme-aware colors that automatically adapt to light/dark mode:

```tsx
const themeAwareColor = {
  light: "#000000",
  dark: "#FFFFFF"
};

<DynamicModal
  iconColor={themeAwareColor}
  backdropColor={{
    light: "rgba(0, 0, 0, 0.5)",
    dark: "rgba(0, 0, 0, 0.7)"
  }}
/>
```

## Common Use Cases

### Success Notification

```tsx
showModal({
  title: "Success!",
  message: "Operation completed successfully.",
  icon: { name: "check-circle", library: "Feather" },
  iconColor: "#FFFFFF",
  iconBackGroundColor: "#4CAF50",
  primaryButton: {
    title: "OK",
    onPress: hideModal,
  },
});
```

### Error Notification

```tsx
showModal({
  title: "Error",
  message: "Something went wrong. Please try again.",
  icon: { name: "error", library: "MaterialIcons" },
  iconColor: "#FFFFFF",
  iconBackGroundColor: "#F44336",
  primaryButton: {
    title: "Retry",
    onPress: retryAction,
  },
  secondaryButton: {
    title: "Cancel",
    onPress: hideModal,
  },
});
```

### Loading State

```tsx
showModal({
  title: "Processing...",
  message: "Please wait while we process your request.",
  icon: { name: "loading1", library: "AntDesign" },
  iconColor: "#007AFF",
  // No buttons for loading state
});
```

### Confirmation Dialog

```tsx
showModal({
  title: "Delete Item",
  message: "Are you sure you want to delete this item? This action cannot be undone.",
  icon: { name: "trash-2", library: "Feather" },
  iconColor: "#FFFFFF",
  iconBackGroundColor: "#FF5722",
  primaryButton: {
    title: "Delete",
    onPress: deleteItem,
    primaryButtonColor: "#F44336",
  },
  secondaryButton: {
    title: "Cancel",
    onPress: hideModal,
  },
});
```

## Animation Features

The component includes several built-in animations:

- **Entrance Animation**: Fade in with scale effect
- **Exit Animation**: Fade out with scale effect  
- **Icon Pulsing**: Subtle pulsing effect on the icon
- **Background Pulsing**: Pulsing effect on icon background

All animations use native drivers for optimal performance.

## Accessibility

The component includes proper accessibility features:

- Proper focus management
- Screen reader support
- Keyboard navigation support
- High contrast support in themes

## Platform Support

- ✅ iOS
- ✅ Android
- ✅ Expo

## Migration from Legacy String Icons

If you're upgrading from a version that used string icons:

```tsx
// Old way (still supported)
icon="warning"

// New way (recommended)
icon={{ name: "warning", library: "MaterialIcons" }}
```

The component maintains backward compatibility with string icons, defaulting to MaterialIcons library.

## Performance Tips

1. **Reuse Modal Instances**: Instead of creating multiple modal components, reuse a single instance with different configurations
2. **Optimize Images**: Use vector icons instead of image files for better performance
3. **Theme Consistency**: Use theme-aware colors to reduce re-renders

## Troubleshooting

### Icon Not Showing
- Ensure the icon name exists in the specified library
- Check that `@expo/vector-icons` is properly installed
- Verify the library name is spelled correctly

### Animation Issues
- Make sure `useNativeDriver: true` is not conflicting with layout animations
- Check that the component is not being re-rendered during animations

### Theme Not Updating
- Ensure you're using the `useColorScheme` hook correctly
- Check that theme-aware colors are properly structured

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) file for details.