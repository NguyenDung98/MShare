package com.mshare;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

public class TimerService extends HeadlessJsTaskService {
    @Override
    protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        if (extras != null) {
          return new HeadlessJsTaskConfig(
              "timer",
              Arguments.fromBundle(extras),
              15000, // timeout for the task
              true // optional: defines whether or not  the task is allowed in foreground. Default is false
            );
        }
        return null;
    }
}
