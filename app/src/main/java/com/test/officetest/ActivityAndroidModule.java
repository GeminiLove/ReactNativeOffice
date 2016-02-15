package com.test.officetest;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by yubo on 2016/1/28.
 */
public class ActivityAndroidModule extends ReactContextBaseJavaModule {

    public ActivityAndroidModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ActivityAndroid";
    }

    @ReactMethod
    public void startActivity(String className, String menuName) {
        try {
            Intent intent = new Intent();
            intent.putExtra("menuName", menuName);
            intent.setClassName("com.test.officetest", className);
            getCurrentActivity().startActivity(intent);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
