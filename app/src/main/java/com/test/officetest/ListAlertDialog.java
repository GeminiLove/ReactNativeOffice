package com.test.officetest;

import android.content.Context;
import android.content.DialogInterface;
import android.support.v7.app.AlertDialog;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableArray;

/**
 * Created by yubo on 2016/2/15.
 */
public class ListAlertDialog {

    private AlertDialog alertDialog;
    private String[] items;

    public ListAlertDialog(Context context, String title, ReadableArray itemsArray, final Callback successCallback) {
        if (itemsArray != null && itemsArray.size() > 0) {
            items = new String[itemsArray.size()];
            for (int i = 0; i < itemsArray.size(); i++) {
                items[i] = itemsArray.getString(i);
            }
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

    public void showListAlertDialog() {
        if (alertDialog != null && !alertDialog.isShowing()) {
            alertDialog.show();
        }
    }

}
