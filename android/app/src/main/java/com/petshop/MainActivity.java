package com.petshop;

import android.os.Bundle;

import com.cboy.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivity;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.soloader.SoLoader;

public class MainActivity extends ReactActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
//        @Override
//        public void onCreate() {
//            SplashScreen.show(new MainActivity());  // here
//            super.onCreate();
//
//            SoLoader.init(this, /* native exopackage */ false);
//
//        }
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);

    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "petShop";
    }
}
