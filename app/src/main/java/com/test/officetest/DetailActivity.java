package com.test.officetest;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;

import com.facebook.react.LifecycleState;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;

import me.nucleartux.date.ReactDatePackage;

public class DetailActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler {

    private ReactRootView rootView;
    private ReactInstanceManager reactInstanceManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        String menuName = getIntent().getStringExtra("menuName");
        String bundleAssetName = "ApplyForLeave.android.bundle";
        String jsMainModuleName = "ApplyForLeave.android";
        String moduleName = "ApplyForLeaveList";
        setTitle(menuName);
        switch(menuName) {
            case "请假申请":
                bundleAssetName = "ApplyForLeave.android.bundle";
                jsMainModuleName = "ApplyForLeave.android";
                moduleName = "ApplyForLeaveList";
                break;
            case "加班申请":
                bundleAssetName = "ApplyForExtraWork.android.bundle";
                jsMainModuleName = "ApplyForExtraWork.android";
                moduleName = "ApplyForExtraWorkList";
                break;
            case "打卡记录":
                bundleAssetName = "CheckinRecord.android.bundle";
                jsMainModuleName = "CheckinRecord.android";
                moduleName = "CheckinRecord";
                break;
            case "新建请假申请":
                bundleAssetName = "CreateApplyForLeave.android.bundle";
                jsMainModuleName = "CreateApplyForLeave.android";
                moduleName = "CreateApplyForLeave";
                break;
            case "新建加班申请":
                bundleAssetName = "CreateApplyForExtraWork.android.bundle";
                jsMainModuleName = "CreateApplyForExtraWork.android";
                moduleName = "CreateApplyForExtraWork";
                break;
            default:
                bundleAssetName = "ApplyForLeave.android.bundle";
                jsMainModuleName = "ApplyForLeave.android";
                moduleName = "ApplyForLeaveList";
                break;
        }

        rootView = new ReactRootView(this);
        reactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName(bundleAssetName)
                .setJSMainModuleName(jsMainModuleName)
                .addPackage(new MainReactPackage())
                .addPackage(new ActivityAndroidReactPackage())
                .addPackage(new ReactDatePackage(this))
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();
        rootView.startReactApplication(reactInstanceManager, moduleName, null);
        setContentView(rootView);

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        //menu.add(0, 0, 0, "新建申请");
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
//        if(item.getItemId() == 0) {
//            Toast.makeText(this, "new apply", Toast.LENGTH_SHORT).show();
//        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    @Override
    protected void onPause() {
        super.onPause();

        if (reactInstanceManager != null) {
            reactInstanceManager.onPause();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        if (reactInstanceManager != null) {
            reactInstanceManager.onResume(this, this);
        }
    }

    @Override
    public void onBackPressed() {
        if (reactInstanceManager != null) {
            reactInstanceManager.onBackPressed();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_MENU && reactInstanceManager != null) {
            reactInstanceManager.showDevOptionsDialog();
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }
}
