#import <React/RCTBridgeModule.h>

/**
 * This Objective-C header file is used to expose the `LocalNotificationModule` Swift class
 * to React Native. It uses the `RCT_EXTERN_MODULE` macro to register the Swift class
 * as a React Native module, allowing JavaScript code to call its methods.
 */
@interface RCT_EXTERN_MODULE(LocalNotificationModule, NSObject)

/**
 * This macro exposes the `triggerNotification` method from the Swift `LocalNotificationModule`
 * class to React Native, making it accessible from JavaScript.
 *
 * The method will trigger a local notification on iOS when called from JavaScript.
 */
RCT_EXTERN_METHOD(triggerNotification)

@end
