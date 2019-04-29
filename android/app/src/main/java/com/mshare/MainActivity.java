package com.mshare;

import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.ReactActivity;

import java.util.Timer;
import java.util.TimerTask;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    private Timer timer = new Timer();
    private Intent serviceIntent;
    private boolean isRunning = false;
    private int counter = 0;

    @Override
    protected String getMainComponentName() {
        return "MShare";
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void onPause() {
        super.onPause();
        if (!isRunning) {
            serviceIntent = new Intent(getApplicationContext(), TimerService.class);
            Bundle bundle = new Bundle();

            bundle.putString("foo", "bar");
            serviceIntent.putExtras(bundle);

            timer.scheduleAtFixedRate(new TimerTask(){
                @Override
                public void run(){
                    if (counter == 2) {
                        this.cancel();
                        counter -= 1;
                    } else if (!isRunning && counter == 1) {
                        this.cancel();
                        counter -= 1;
                    } else {
                        getApplicationContext().startService(serviceIntent);
                    }
                }
            },0,10000);
            counter += 1;
            isRunning = true;
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        if (isRunning) {
            isRunning = false;
        }
    }
}
