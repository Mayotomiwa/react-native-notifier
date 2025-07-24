import { Notifier } from "@seybar/react-native-notifier";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ExampleApp: React.FC = () => {
  // Modal visibility states
  const [successModal, setSuccessModal] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [networkModal, setNetworkModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [achievementModal, setAchievementModal] = useState(false);
  const [customModal, setCustomModal] = useState(false);
  const [outlineModal, setOutlineModal] = useState(false);
  const [legacyModal, setLegacyModal] = useState(false);

  const renderButton = (
    title: string,
    onPress: () => void,
    color = "#007AFF"
  ) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifier Examples</Text>
        <Text style={styles.headerSubtitle}>
          Tap any button to see different modal configurations
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Modal */}
        {renderButton("Success Modal", () => setSuccessModal(true), "#4CAF50")}

        {/* Warning Modal */}
        {renderButton("Warning Modal", () => setWarningModal(true), "#FF9800")}

        {/* Error Modal */}
        {renderButton("Error Modal", () => setErrorModal(true), "#F44336")}

        {/* Delete Confirmation Modal */}
        {renderButton(
          "Delete Confirmation",
          () => setDeleteModal(true),
          "#E91E63"
        )}

        {/* Network Error Modal */}
        {renderButton("Network Error", () => setNetworkModal(true), "#FF5722")}

        {/* Loading Modal */}
        {renderButton("Loading Modal", () => setLoadingModal(true), "#2196F3")}

        {/* Achievement Modal */}
        {renderButton(
          "Achievement Modal",
          () => setAchievementModal(true),
          "#FFD700"
        )}

        {/* Custom Styled Modal */}
        {renderButton(
          "Custom Styled Modal",
          () => setCustomModal(true),
          "#9C27B0"
        )}

        {/* Outline Icon with Background */}
        {renderButton(
          "Outline Icon + Background",
          () => setOutlineModal(true),
          "#607D8B"
        )}

        {/* Legacy Format Modal */}
        {renderButton(
          "Legacy Format Modal",
          () => setLegacyModal(true),
          "#795548"
        )}
      </ScrollView>

      {/* Success Modal */}
      <Notifier
        visible={successModal}
        onClose={() => setSuccessModal(false)}
        title="Success!"
        message="Your operation has been completed successfully. All changes have been saved."
        icon={{
          library: "MaterialIcons",
          name: "check-circle",
          size: 56,
          color: "#FFFFFF",
          backgroundColor: "#4CAF50",
          backgroundRadius: 32,
          backgroundPadding: 8,
        }}
        primaryButton={{
          title: "Continue",
          onPress: () => {
            setSuccessModal(false);
            console.log("Success action performed");
          },
        }}
        animationDuration={350}
      />

      {/* Warning Modal */}
      <Notifier
        visible={warningModal}
        onClose={() => setWarningModal(false)}
        title="Warning"
        message="This action cannot be undone. Please make sure you want to proceed with this operation."
        icon={{
          library: "MaterialIcons",
          name: "warning",
          size: 52,
          color: "#FF9800",
          backgroundColor: "#FFF3E0",
          backgroundRadius: 30,
          backgroundPadding: 12,
        }}
        primaryButton={{
          title: "Proceed",
          onPress: () => {
            setWarningModal(false);
            console.log("Warning acknowledged");
          },
        }}
        secondaryButton={{
          title: "Cancel",
          onPress: () => setWarningModal(false),
        }}
      />

      {/* Error Modal */}
      <Notifier
        visible={errorModal}
        onClose={() => setErrorModal(false)}
        title="Error Occurred"
        message="Something went wrong while processing your request. Please try again later."
        icon={{
          library: "MaterialIcons",
          name: "error",
          size: 54,
          color: "#FFFFFF",
          backgroundColor: "#F44336",
          backgroundRadius: 32,
          backgroundPadding: 10,
        }}
        primaryButton={{
          title: "Retry",
          onPress: () => {
            setErrorModal(false);
            console.log("Retrying operation");
          },
        }}
        secondaryButton={{
          title: "Cancel",
          onPress: () => setErrorModal(false),
        }}
        backdropColor="rgba(244, 67, 54, 0.1)"
      />

      {/* Delete Confirmation Modal */}
      <Notifier
        visible={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        icon={{
          library: "Ionicons",
          name: "trash-bin",
          size: 48,
          color: "#FFFFFF",
          backgroundColor: "#E91E63",
          backgroundRadius: 28,
          backgroundPadding: 12,
        }}
        primaryButton={{
          title: "Delete",
          onPress: () => {
            setDeleteModal(false);
            console.log("Item deleted");
          },
        }}
        secondaryButton={{
          title: "Keep",
          onPress: () => setDeleteModal(false),
        }}
        animationDuration={250}
      />

      {/* Network Error Modal */}
      <Notifier
        visible={networkModal}
        onClose={() => setNetworkModal(false)}
        title="Connection Failed"
        message="Unable to connect to the server. Please check your internet connection and try again."
        icon={{
          library: "Feather",
          name: "wifi-off",
          size: 50,
          color: "#FF5722",
          backgroundColor: "#FFEBEE",
          backgroundRadius: 30,
          backgroundPadding: 10,
        }}
        primaryButton={{
          title: "Retry",
          onPress: () => {
            setNetworkModal(false);
            console.log("Retrying connection");
          },
        }}
      />

      {/* Loading Modal */}
      <Notifier
        visible={loadingModal}
        onClose={() => setLoadingModal(false)}
        title="Processing..."
        message="Please wait while we process your request. This may take a few moments."
        icon={{
          library: "AntDesign",
          name: "loading1",
          size: 48,
          color: "#FFFFFF",
          backgroundColor: "#2196F3",
          backgroundRadius: 28,
          backgroundPadding: 12,
        }}
        primaryButton={{
          title: "Cancel",
          onPress: () => {
            setLoadingModal(false);
            console.log("Operation cancelled");
          },
        }}
      />

      {/* Achievement Modal */}
      <Notifier
        visible={achievementModal}
        onClose={() => setAchievementModal(false)}
        title="🎉 Achievement Unlocked!"
        message="Congratulations! You've successfully completed all the challenges and reached level 10!"
        icon={{
          library: "FontAwesome5",
          name: "trophy",
          size: 52,
          color: "#FFD700",
          backgroundColor: "#FFF8E1",
          backgroundRadius: 32,
          backgroundPadding: 14,
        }}
        primaryButton={{
          title: "Awesome!",
          onPress: () => {
            setAchievementModal(false);
            console.log("Achievement acknowledged");
          },
        }}
        backdropColor="rgba(255, 215, 0, 0.1)"
        animationDuration={400}
      />

      {/* Custom Styled Modal */}
      <Notifier
        visible={customModal}
        onClose={() => setCustomModal(false)}
        title="Custom Design"
        message="This modal showcases custom styling with unique colors and enhanced visual effects."
        icon={{
          library: "MaterialCommunityIcons",
          name: "palette",
          size: 50,
          color: "#FFFFFF",
          backgroundColor: "#9C27B0",
          backgroundRadius: 30,
          backgroundPadding: 12,
        }}
        primaryButton={{
          title: "Explore",
          onPress: () => {
            setCustomModal(false);
            console.log("Exploring custom features");
          },
        }}
        secondaryButton={{
          title: "Later",
          onPress: () => setCustomModal(false),
        }}
        backdropColor="rgba(156, 39, 176, 0.15)"
      />

      {/* Outline Icon with Background Modal */}
      <Notifier
        visible={outlineModal}
        onClose={() => setOutlineModal(false)}
        title="Outline Icon Example"
        message="This demonstrates how outline icons look great with colored backgrounds, creating a cohesive design."
        icon={{
          library: "Ionicons",
          name: "heart-outline",
          size: 48,
          color: "#E91E63",
          backgroundColor: "#FCE4EC",
          backgroundRadius: 28,
          backgroundPadding: 14,
        }}
        primaryButton={{
          title: "Love It!",
          onPress: () => {
            setOutlineModal(false);
            console.log("Outline design appreciated");
          },
        }}
      />

      {/* Legacy Format Modal */}
      <Notifier
        visible={legacyModal}
        onClose={() => setLegacyModal(false)}
        title="Legacy Support"
        message="This modal uses the legacy string format for the icon, showing backward compatibility."
        icon="info"
        iconColor="#795548"
        primaryButton={{
          title: "Got It",
          onPress: () => {
            setLegacyModal(false);
            console.log("Legacy format demonstrated");
          },
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#212529",
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6C757D",
    textAlign: "center",
    lineHeight: 22,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default ExampleApp;
