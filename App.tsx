import React, { useEffect } from 'react';
import {
  AppState,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeModules } from 'react-native';
import { checkNotificationPermission } from './src/helpers/permissions'; // Helper function to check notification permissions

// Destructure the native module to access the triggerNotification method
const { LocalNotificationModule } = NativeModules;

function App(): React.JSX.Element {
  useEffect(() => {
    // Add an event listener to listen for changes in the app's state (foreground, background, etc.)
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Clean up the event listener when the component is unmounted
    return () => {
      subscription.remove();
    };
  }, []);

  /**
   * Handle app state changes.
   * This function is triggered when the app state changes (e.g., foreground to background).
   * If the app goes into the background, it will trigger a local notification.
   * 
   * @param nextAppState - The next state of the app (e.g., 'active', 'background').
   */
  const handleAppStateChange = (nextAppState: string) => {
    
    // Check if the app state changes to 'background'
    if (nextAppState === 'background') {
      // Trigger the local notification using the native module
      LocalNotificationModule.triggerNotification();
    }
  };

  // Check for notification permission on component mount
  useEffect(() => {
    checkNotificationPermission(); // Ensures the app has permission to send notifications
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text>Test Task-2</Text> 
      </View>
    </SafeAreaView>
  );
}

export default App;

// Styles for the component
const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
