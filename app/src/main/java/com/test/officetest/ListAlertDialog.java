package com.test.officetest;

import android.content.Context;
import android.content.DialogInterface;
import android.support.v7.app.AlertDialog;
import android.text.TextUtils;

import com.alibaba.fastjson.JSON;
import com.facebook.react.bridge.Callback;

import java.util.List;

/**
 * Created by yubo on 2016/2/15.
 */
public class ListAlertDialog {

    private AlertDialog alertDialog;
    private String[] items;

    public ListAlertDialog(Context context, String title, String jsonArrayStr, final Callback successCallback) {
        if(!TextUtils.isEmpty(jsonArrayStr)) {
            List<String> list = JSON.parseArray(jsonArrayStr, String.class);
            if(list != null && list.size() > 0) {
                this.items = list.toArray(new String[list.size()]);
                AlertDialog.Builder builder = new AlertDialog.Builder(context);
                builder.setTitle(title);
                builder.setItems(items, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        String selectedItem = ListAlertDialog.this.items[which];
                        successCallback.invoke(selectedItem);
                    }
                });
                alertDialog = builder.create();
            }
        }
    }

    public void showListAlertDialog(){
        if(alertDialog != null && !alertDialog.isShowing()) {
            alertDialog.show();
        }
    }

}
