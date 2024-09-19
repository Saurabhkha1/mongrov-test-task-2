import Foundation
import UserNotifications

/**
 * LocalNotificationModule is a native module that triggers local notifications
 * for iOS. It uses the UserNotifications framework to display notifications 
 * even when the app is terminated or in the background.
 */
@objc(LocalNotificationModule)
class LocalNotificationModule: NSObject {

  /**
   * This method triggers a local notification on iOS. The notification content 
   * is defined within this method, and it is added to the notification center
   * to be displayed immediately.
   */
  @objc
  func triggerNotification() {
    // Create an instance of UNMutableNotificationContent to define the notification details
    let content = UNMutableNotificationContent()

    // Set the title of the notification
    content.title = "App Termination"

    // Set the body text of the notification
    content.body = "Hey, the app is killed now. None of the JS will work."

    // Create a notification request with a unique identifier. No trigger is specified,
    // meaning the notification will be delivered immediately.
    let request = UNNotificationRequest(identifier: "AppTermination", content: content, trigger: nil)

    // Add the notification request to the notification center to schedule the notification
    UNUserNotificationCenter.current().add(request, withCompletionHandler: nil)
  }
}
