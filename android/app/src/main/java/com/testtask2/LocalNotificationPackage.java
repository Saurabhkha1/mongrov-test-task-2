package com.testtask2;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * LocalNotificationPackage is a ReactPackage implementation that bridges the 
 * LocalNotificationModule to React Native. It allows React Native to register 
 * and use the native Android notification module.
 */
public class LocalNotificationPackage implements ReactPackage {

    /**
     * This method creates and returns a list of native modules that should be 
     * registered with React Native. The LocalNotificationModule is added to this 
     * list, making it accessible in JavaScript.
     * 
     * @param reactContext The React application context.
     * @return A list containing the native modules to be registered.
     */
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        // Create a list to hold the native modules
        List<NativeModule> modules = new ArrayList<>();

        // Add the LocalNotificationModule to the list of native modules
        modules.add(new LocalNotificationModule(reactContext));

        // Return the list of modules
        return modules;
    }

    /**
     * This method is responsible for creating and returning view managers. 
     * Since the LocalNotificationModule does not require any custom views, this method 
     * returns an empty list.
     * 
     * @param reactContext The React application context.
     * @return An empty list as no view managers are being registered.
     */
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        // Return an empty list as there are no custom views to manage
        return Collections.emptyList();
    }
}
