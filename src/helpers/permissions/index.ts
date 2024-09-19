import { Alert, Linking, Platform } from "react-native";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";

import { Strings } from "../../constants/strings";

/**
 * Displays an alert to the user, asking them to grant permission or go to app settings.
 * 
 * @param {string} title - The title of the alert (default is permission required string).
 * @param {string} description - The description of the alert (default is permission description string).
 * @returns {void}
 */
export const PermissionAlert = (
  title = Strings.permissionRequired,
  description = Strings.permissionDescription
) => {
  return (
    Alert.alert(
      title, // Title of the alert
      description, // Description message for the alert
      [
        { text: Strings.cancel, style: 'cancel' }, // Cancel button
        { text: Strings.openSettings, onPress: () => openAppSettings() } // Open app settings button
      ]
    )
  )
}

/**
 * Checks the current notification permissions on both iOS and Android.
 * 
 * On iOS, it uses `PushNotificationIOS` to check if the alert permission is granted.
 * On Android, it uses `react-native-permissions` to check if notification permissions are granted.
 */
export const checkNotificationPermission = async () => {
  if (Platform.OS === 'ios') {
    // iOS: Use PushNotificationIOS to check current notification permissions
    PushNotificationIOS.checkPermissions((permissions) => {      
      // If alert permission is granted, log it, otherwise request permissions
      if (permissions.alert == true) {
        console.log('Notification permission granted.');
      } else {
        requestNotificationPermission(); // Request permission if not granted
      }
    });
  } else {
    // Android: Use react-native-permissions to check POST_NOTIFICATIONS permission
      const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      handleAndroidPermission(result); // Handle the result based on granted, denied, or blocked
  }
};

/**
 * Requests notification permissions on both iOS and Android.
 * 
 * On iOS, it uses `PushNotificationIOS` to request notification permissions.
 * On Android, it uses `react-native-permissions` to request POST_NOTIFICATIONS permissions.
 */
export const requestNotificationPermission = async () => {
  if (Platform.OS === 'ios') {
    // iOS: Request notification permissions using PushNotificationIOS
    PushNotificationIOS.requestPermissions().then((data) => {
      // Check if alert permission was granted
      if (data.alert == true) {
        console.log('Notification permission granted.');
      } else {
        PermissionAlert(); // Show alert if permission was not granted
      }
    });
  } else {
    // Android: Request POST_NOTIFICATIONS permission
    const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    handleAndroidPermission(result); // Handle the result based on granted, denied, or blocked
  }
};

/**
 * Handles the result of the notification permission check/request on Android.
 * 
 * @param {string} result - The result of the permission check (granted, denied, or blocked).
 */
export const handleAndroidPermission = (result: string) => {
  // Check the permission result
  if (result === RESULTS.GRANTED) {
    console.log('Notification permission granted.');
  } else if (result === RESULTS.DENIED) {
    // If permission is denied, request it again
    requestNotificationPermission();
  } else if (result === RESULTS.BLOCKED) {
    // If permission is blocked, show the permission alert
    PermissionAlert();
  }
};

/**
 * Opens the app's settings page where users can manually enable permissions.
 */
const openAppSettings = () => {
  Linking.openSettings(); // Opens the app's settings on the device
};
