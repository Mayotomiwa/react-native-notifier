# @seybar/react-native-notifier

A beautiful, customizable notification component for React Native with theme support, smooth animations, and extensive icon library integration.

## Features

- **Theme Support** - Light, dark, and auto themes
- **Rich Animations** - Smooth entrance/exit animations with pulsing icon effects
- **Customizable Icons** - Support for multiple icon libraries (MaterialIcons, Ionicons, Feather, etc.)
- **Responsive Design** - Adapts to different screen sizes
- **Action Buttons** - Primary and secondary button support
- **Flexible Styling** - Theme-aware color customization
- **TypeScript Support** - Full type safety

## Installation

```bash
npm install @seybar/react-native-notifier
```

or

```bash
yarn add @seybar/react-native-notifier
```

### Dependencies

This package requires the following peer dependencies:

```bash
npm install expo react react-native react-native-vector-icons
```

## Basic Usage

```jsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { Notifier } from '@seybar/react-native-notifier';

export default function App() {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Show Notification" onPress={() => setVisible(true)} />
      
      <Notifier
        visible={visible}
        onClose={() => setVisible(false)}
        title="Success!"
        message="Your action was completed successfully."
        icon={{ library: "MaterialIcons", name: "check-circle" }}
        iconColor="#4CAF50"
        primaryButton={{
          title: "OK",
          onPress: () => setVisible(false)
        }}
      />
    </View>
  );
}
```

## API Reference

### NotifierProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | **Required** | Controls the visibility of the notification |
| `onClose` | `() => void` | **Required** | Callback function when notification is closed |
| `title` | `string` | `undefined` | Title text displayed in the notification |
| `message` | `string` | `undefined` | Message text displayed below the title |
| `icon` | `IconConfig \| string` | `{ library: "MaterialIcons", name: "visibility" }` | Icon configuration or legacy string |
| `iconColor` | `ColorValue` | `"#007AFF"` | Color of the icon (theme-aware) |
| `iconBackGroundColor` | `ColorValue` | `"transparent"` | Background color of the icon |
| `primaryButton` | `ButtonConfig` | `undefined` | Primary button configuration |
| `secondaryButton` | `ButtonConfig` | `undefined` | Secondary button configuration |
| `animationDuration` | `number` | `300` | Duration of entrance/exit animations in ms |
| `backdropColor` | `ColorValue` | Theme default | Background color of the backdrop |
| `theme` | `"light" \| "dark" \| "auto"` | `"auto"` | Theme mode |

### IconConfig

```typescript
interface IconConfig {
  library: IconLibrary;           // Icon library name
  name: string;                   // Icon name
  size?: number;                  // Icon size (default: 48)
  color?: ColorValue;             // Icon color
  backgroundColor?: ColorValue;    // Icon background color
  backgroundRadius?: number;       // Background border radius
  backgroundPadding?: number;      // Background padding
}
```

### ButtonConfig

```typescript
interface ButtonConfig {
  title: string;                      // Button text
  onPress: () => void;               // Button press handler
  primaryButtonColor?: ColorValue;    // Primary button background color
  primaryButtonText?: ColorValue;     // Primary button text color
  secondaryButtonColor?: ColorValue;  // Secondary button border color
  secondaryButtonText?: ColorValue;   // Secondary button text color
}
```

### ColorValue

Colors can be either a string or a theme-aware object:

```typescript
type ColorValue = string | {
  light: string;
  dark: string;
}

// Examples:
iconColor="#FF0000"                    // Simple color
iconColor={{ light: "#000", dark: "#FFF" }}  // Theme-aware color
```

## Supported Icon Libraries

The following icon libraries are supported:

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

## Examples

### Success Notification

```jsx
<Notifier
  visible={showSuccess}
  onClose={() => setShowSuccess(false)}
  title="Success!"
  message="Your changes have been saved successfully."
  icon={{ 
    library: "MaterialIcons", 
    name: "check-circle",
    backgroundColor: { light: "#E8F5E8", dark: "#1B4D1B" },
    backgroundRadius: 30
  }}
  iconColor={{ light: "#4CAF50", dark: "#66BB6A" }}
  primaryButton={{
    title: "Continue",
    onPress: () => setShowSuccess(false),
    primaryButtonColor: "#4CAF50"
  }}
  theme="auto"
/>
```

### Error Notification with Two Buttons

```jsx
<Notifier
  visible={showError}
  onClose={() => setShowError(false)}
  title="Error Occurred"
  message="Something went wrong. Would you like to retry?"
  icon={{ 
    library: "MaterialIcons", 
    name: "error",
    size: 56,
    backgroundColor: "#FFEBEE",
    backgroundRadius: 35
  }}
  iconColor="#F44336"
  primaryButton={{
    title: "Retry",
    onPress: handleRetry,
    primaryButtonColor: "#F44336"
  }}
  secondaryButton={{
    title: "Cancel",
    onPress: () => setShowError(false),
    secondaryButtonColor: "#F44336"
  }}
/>
```

### Custom Theme Colors

```jsx
<Notifier
  visible={showCustom}
  onClose={() => setShowCustom(false)}
  title="Custom Theme"
  message="This notification uses custom theme colors."
  icon={{ 
    library: "Feather", 
    name: "star",
    color: { light: "#FF6B35", dark: "#FF8A50" }
  }}
  backdropColor={{ light: "rgba(255, 107, 53, 0.1)", dark: "rgba(255, 138, 80, 0.2)" }}
  primaryButton={{
    title: "Awesome!",
    onPress: () => setShowCustom(false),
    primaryButtonColor: { light: "#FF6B35", dark: "#FF8A50" }
  }}
/>
```

### Info Notification with Ionicons

```jsx
<Notifier
  visible={showInfo}
  onClose={() => setShowInfo(false)}
  title="Information"
  message="Here's some important information for you."
  icon={{ 
    library: "Ionicons", 
    name: "information-circle-outline",
    size: 50
  }}
  iconColor="#2196F3"
  primaryButton={{
    title: "Got it",
    onPress: () => setShowInfo(false)
  }}
/>
```

### Warning with Custom Animation

```jsx
<Notifier
  visible={showWarning}
  onClose={() => setShowWarning(false)}
  title="Warning"
  message="Please review your settings before proceeding."
  icon={{ 
    library: "AntDesign", 
    name: "warning",
    backgroundColor: "#FFF3CD",
    backgroundPadding: 12
  }}
  iconColor="#FF9800"
  animationDuration={500}
  primaryButton={{
    title: "Review",
    onPress: handleReview
  }}
  secondaryButton={{
    title: "Skip",
    onPress: () => setShowWarning(false)
  }}
/>
```

## Theming

The component automatically adapts to the system theme when `theme="auto"` is set. You can also force light or dark themes:

```jsx
// Auto theme (follows system)
<Notifier theme="auto" {...props} />

// Force light theme
<Notifier theme="light" {...props} />

// Force dark theme
<Notifier theme="dark" {...props} />
```

### Default Theme Colors

#### Light Theme
- Modal Background: `#FFFFFF`
- Title Color: `#1A1A1A`
- Message Color: `#666666`
- Icon Color: `#007AFF`
- Backdrop Color: `rgba(0, 0, 0, 0.5)`

#### Dark Theme
- Modal Background: `#1C1C1E`
- Title Color: `#FFFFFF`
- Message Color: `#AEAEB2`
- Icon Color: `#0A84FF`
- Backdrop Color: `rgba(0, 0, 0, 0.7)`

## Advanced Usage

### Custom Icon with Background Animation

```jsx
<Notifier
  visible={visible}
  onClose={() => setVisible(false)}
  title="Processing..."
  message="Please wait while we process your request."
  icon={{
    library: "MaterialCommunityIcons",
    name: "cog",
    size: 52,
    backgroundColor: {
      light: "rgba(33, 150, 243, 0.1)",
      dark: "rgba(33, 150, 243, 0.2)"
    },
    backgroundRadius: 30,
    backgroundPadding: 10,
    color: { light: "#2196F3", dark: "#64B5F6" }
  }}
/>
```

### Handling Multiple Notifications

```jsx
const [notifications, setNotifications] = useState({
  success: false,
  error: false,
  warning: false
});

const showNotification = (type) => {
  setNotifications(prev => ({ ...prev, [type]: true }));
};

const hideNotification = (type) => {
  setNotifications(prev => ({ ...prev, [type]: false }));
};

return (
  <>
    <Notifier
      visible={notifications.success}
      onClose={() => hideNotification('success')}
      // ... success props
    />
    <Notifier
      visible={notifications.error}
      onClose={() => hideNotification('error')}
      // ... error props
    />
    <Notifier
      visible={notifications.warning}
      onClose={() => hideNotification('warning')}
      // ... warning props
    />
  </>
);
```

## TypeScript Support

This package is written in TypeScript and provides full type safety:

```typescript
import { Notifier, NotifierProps, IconConfig, ButtonConfig } from '@seybar/react-native-notifier';

const config: NotifierProps = {
  visible: true,
  onClose: () => {},
  title: "Typed Notification",
  icon: {
    library: "MaterialIcons", // TypeScript will provide autocomplete
    name: "check" // TypeScript will validate icon names
  }
};
```

## License

MIT

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to contribute to this project.

## Support

If you encounter any issues or have questions, please file an issue on our [GitHub repository](https://github.com/mayotomiwa/react-native-notifier/issues).