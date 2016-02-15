package com.test.officetest;

import android.app.Activity;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by yubo on 2016/2/15.
 */
public class SelectListModule extends ReactContextBaseJavaModule {

    private Activity mActivity;

    public SelectListModule(ReactApplicationContext reactContext, Activity activity) {
        super(reactContext);
        mActivity = activity;
    }

    @Override
    public String getName() {
        return "SelectListAndroid";
    }

    @ReactMethod
    public void showList(String title, String jsonArrayStr, Callback successCallback) {
        ListAlertDialog dialog = new ListAlertDialog(this.mActivity, title, jsonArrayStr, successCallback);
        dialog.showListAlertDialog();
    }

}
