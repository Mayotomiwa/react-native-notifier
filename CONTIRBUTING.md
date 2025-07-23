# Contributing to @seybar/react-native-notifier

Thank you for your interest in contributing to the React Native Notifier package! We welcome contributions from the community and are grateful for any help you can provide.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Issue Guidelines](#issue-guidelines)
- [Feature Requests](#feature-requests)

## Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow. Please be respectful, constructive, and professional in all interactions.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 16 or higher)
- npm or yarn
- Git
- A React Native development environment (iOS/Android)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

   ```bash
   git clone https://github.com/Mayotomiwa/react-native-notifier.git
   cd react-native-notifier
   ```

3. Add the original repository as upstream:
   ```bash
   git remote add upstream https://github.com/Mayotomiwa/react-native-notifier.git
   ```

## Development Setup

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

2. Build the TypeScript files:

   ```bash
   npm run build
   # or
   yarn build
   ```

3. Link the package locally for testing:

   ```bash
   npm link
   ```

4. In your test React Native project:
   ```bash
   npm link @seybar/react-native-notifier
   ```

## Project Structure

```
react-native-notifier/
├── src/
│   ├── components/          # Reusable components
│   │   ├── iconComponents.tsx
│   │   └── index.ts        # Barrel exports
│   ├── services/           # Business logic and configurations
│   │   ├── iconConfig.ts   # Icon library configurations
│   │   └── index.ts        # Barrel exports
│   ├── themes/             # Theme-related code
│   │   ├── theme.tsx       # Theme definitions and hooks
│   │   └── index.ts        # Barrel exports
│   ├── utils/              # Utility functions
│   ├── Notifier.tsx        # Main component
│   └── types.ts            # TypeScript type definitions
├── lib/                    # Compiled output (auto-generated)
├── index.ts                # Package entry point
├── package.json
├── tsconfig.json
├── README.md
└── CONTRIBUTING.md
```

### Key Components

- **Notifier.tsx**: Main component with animation logic and rendering
- **iconComponents.tsx**: Icon rendering component with library support
- **iconConfig.ts**: Icon library mappings and configurations
- **theme.tsx**: Theme system with light/dark/auto modes
- **types.ts**: TypeScript interfaces and type definitions

## Making Changes

### Branching Strategy

1. Create a new branch from `main`:

   ```bash
   git checkout main
   git pull upstream main
   git checkout -b feature/your-feature-name
   ```

2. Use descriptive branch names:
   - `feature/add-new-icon-library`
   - `bugfix/animation-timing-issue`
   - `docs/update-readme-examples`
   - `refactor/improve-type-definitions`

### Development Workflow

1. Make your changes in small, logical commits
2. Test your changes thoroughly
3. Update documentation if necessary
4. Ensure all TypeScript types are correct
5. Run the build process to check for errors

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Maintain strict type checking
- Export all interfaces and types that might be used externally
- Use meaningful names for types and interfaces

```typescript
// Good
interface NotificationButtonConfig {
  title: string;
  onPress: () => void;
  backgroundColor?: ColorValue;
}

// Avoid
interface BtnCfg {
  t: string;
  op: () => void;
  bg?: any;
}
```

### Code Style

- Use semicolons
- Use double quotes for strings
- Use camelCase for variables and functions
- Use PascalCase for components and types

### Component Guidelines

- Keep components focused and single-purpose
- Use functional components with hooks
- Implement proper prop validation with TypeScript
- Use `useCallback` and `useMemo` appropriately for performance
- Handle error cases properly

```typescript
// Good component structure
interface MyComponentProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  onPress,
  disabled = false,
}) => {
  const handlePress = useCallback(() => {
    if (!disabled) {
      onPress();
    }
  }, [disabled, onPress]);

  return (
    <TouchableOpacity onPress={handlePress} disabled={disabled}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};
```

### Animation Guidelines

- Use the Animated API from React Native
- Implement smooth entrance and exit animations
- Provide configurable animation durations
- Clean up animations properly to prevent memory leaks
- Use `useNativeDriver: true` when possible for better performance

### Theme System

- Support light, dark, and auto themes
- Use the `ColorValue` type for theme-aware colors
- Provide sensible defaults for all theme colors
- Test theme switching functionality

## Testing

### Manual Testing

1. Test on both iOS and Android platforms
2. Test with different screen sizes
3. Test theme switching (light/dark/auto)
4. Test all icon libraries
5. Test animation performance
6. Test accessibility features

### Testing Checklist

Before submitting changes, ensure:

- [ ] Component renders correctly on iOS and Android
- [ ] Animations are smooth and performant
- [ ] Theme switching works properly
- [ ] All icon libraries render correctly
- [ ] TypeScript compiles without errors
- [ ] No console warnings or errors
- [ ] Accessibility features work (screen readers, etc.)
- [ ] Component handles edge cases gracefully

### Example Test App

Create a simple test app to verify your changes:

```typescript
import React, { useState } from "react";
import { View, Button, ScrollView } from "react-native";
import { Notifier } from "@seybar/react-native-notifier";

export default function TestApp() {
  const [visible, setVisible] = useState(false);

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Button title="Test Notification" onPress={() => setVisible(true)} />

      <Notifier
        visible={visible}
        onClose={() => setVisible(false)}
        title="Test Title"
        message="Test message for development"
        icon={{ library: "MaterialIcons", name: "check" }}
        primaryButton={{
          title: "OK",
          onPress: () => setVisible(false),
        }}
      />
    </ScrollView>
  );
}
```

## Submitting Changes

### Pull Request Process

1. Update your branch with the latest changes:

   ```bash
   git checkout main
   git pull upstream main
   git checkout your-feature-branch
   git rebase main
   ```

2. Push your changes:

   ```bash
   git push origin your-feature-branch
   ```

3. Create a Pull Request from your fork to the main repository

### Pull Request Guidelines

- **Title**: Use a clear, descriptive title
- **Description**: Explain what changes you made and why
- **Screenshots**: Include screenshots for UI changes
- **Testing**: Describe how you tested your changes
- **Breaking Changes**: Clearly mark any breaking changes

### Pull Request Template

```markdown
## Description

Brief description of changes made.

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing

- [ ] Tested on iOS
- [ ] Tested on Android
- [ ] Tested theme switching
- [ ] Tested different icon libraries
- [ ] No TypeScript errors
- [ ] No console warnings

## Screenshots

Include screenshots of UI changes if applicable.

## Additional Notes

Any additional information or context.
```

## Issue Guidelines

### Reporting Bugs

When reporting bugs, please include:

- **Device/Platform**: iOS/Android version and device model
- **React Native Version**: Version of React Native
- **Package Version**: Version of @seybar/react-native-notifier
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Steps to Reproduce**: Clear steps to reproduce the issue
- **Code Sample**: Minimal code that demonstrates the issue
- **Screenshots**: If applicable

### Bug Report Template

````markdown
**Device/Platform:** iOS 15.0 / iPhone 12
**React Native Version:** 0.72.0
**Package Version:** 1.0.0

**Expected Behavior:**
The notification should appear with smooth animation.

**Actual Behavior:**
The notification appears without animation and flickers.

**Steps to Reproduce:**

1. Install the package
2. Use the component with default settings
3. Set visible to true

**Code Sample:**

```typescript
<Notifier
  visible={true}
  onClose={() => {}}
  title="Test"
  message="Test message"
/>
```
````

**Screenshots:**
[Include relevant screenshots]

````

## Feature Requests

We welcome feature requests! When suggesting new features:

1. **Check existing issues** to avoid duplicates
2. **Describe the use case** - why is this feature needed?
3. **Provide examples** - how would the API look?
4. **Consider breaking changes** - will this affect existing users?

### Feature Request Template

```markdown
**Feature Description:**
A clear description of the feature you'd like to see.

**Use Case:**
Explain why this feature would be useful and what problem it solves.

**Proposed API:**
Show how you envision the feature would be used:

```typescript
<Notifier
  newFeature={true}
  newProp="example"
/>
````

**Additional Context:**
Any other context, screenshots, or examples about the feature request.

```

## Development Tips

### Debugging

- Use React Native Debugger for debugging animations
- Use console.log sparingly in production code
- Test memory usage during animations
- Use Flipper for advanced debugging

### Performance

- Minimize re-renders with proper memoization
- Use `useNativeDriver: true` for animations
- Avoid heavy computations in render methods
- Clean up animations and timers properly

### Icon Libraries

When adding new icon libraries:

1. Install the icon library as a peer dependency
2. Add it to the `IconLibraries` mapping in `iconConfig.ts`
3. Update the TypeScript types
4. Test with multiple icons from the library
5. Update documentation with examples

## Getting Help

If you need help with contributing:

- Check existing issues and pull requests
- Ask questions in issue comments
- Review the existing codebase for patterns
- Start with small changes to get familiar with the codebase

## Recognition

Contributors will be recognized in:

- The README.md file
- Release notes for significant contributions
- GitHub contributors list

Thank you for contributing to @seybar/react-native-notifier! Your contributions make this package better for everyone.
```
