package com.testtask2;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Build;
import android.util.Log;

import androidx.core.app.NotificationCompat;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * LocalNotificationModule is a React Native module that provides functionality
 * for triggering local notifications on Android.
 */
public class LocalNotificationModule extends ReactContextBaseJavaModule {

    // Unique channel ID for the notification channel
    private static final String CHANNEL_ID = "app_termination_channel";

    /**
     * Constructor to initialize the module with the React application context.
     * 
     * @param reactContext The React application context passed to the native module.
     */
    public LocalNotificationModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    /**
     * This method defines the name of the native module. The name returned here 
     * is how the module will be accessible from JavaScript.
     * 
     * @return The name of the module to be used in JavaScript.
     */
    @Override
    public String getName() {
        return "LocalNotificationModule";
    }

    /**
     * This method triggers a local notification. It creates a notification channel
     * if the Android version is Oreo (API 26) or higher, and then displays a notification
     * to notify that the app has been terminated.
     */
    @ReactMethod
    public void triggerNotification() {
        // Retrieve the application context
        Context context = getReactApplicationContext();

        // Check if the device's OS version is Android Oreo (API 26) or higher
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            // Create a notification channel for Android Oreo and higher

            // Define the name of the channel
            CharSequence name = "App Termination Channel";

            // Define a description for the channel
            String description = "Notifies when the app is terminated";

            // Set the importance level for the notification channel (high importance)
            int importance = NotificationManager.IMPORTANCE_HIGH;

            // Create the notification channel with a unique ID, name, and importance
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, name, importance);
            channel.setDescription(description);

            // Retrieve the system's notification manager service
            NotificationManager notificationManager = context.getSystemService(NotificationManager.class);

            // If the notification manager is not null, create the notification channel
            if (notificationManager != null) {
                notificationManager.createNotificationChannel(channel);
                Log.d("LocalNotificationModule", "Notification channel created");
            }
        }

        // Retrieve the notification manager to send notifications
        NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

        // Build the notification using the NotificationCompat Builder
        Notification notification = new NotificationCompat.Builder(context, CHANNEL_ID)
                // Set the icon for the notification
                .setSmallIcon(R.drawable.ic_notification)

                // Set the title of the notification
                .setContentTitle("App Termination")

                // Set the text content of the notification
                .setContentText("Hey, the app is killed now. None of the JS will work.")

                // Set the priority of the notification to high (for Android versions below Oreo)
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .build();

        // If the notification manager is not null, display the notification with ID 1
        if (notificationManager != null) {
            notificationManager.notify(1, notification);
        }
    }
}
