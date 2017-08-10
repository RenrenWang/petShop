package com.petshop;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by Administrator on 2017/8/1 0001.
 */

public class PlatformPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules= new ArrayList<>();
        modules.add(new PlatformModule(reactContext));
        return modules;
    }

    @Override
    public List<com.facebook.react.uimanager.ViewManager> createViewManagers(ReactApplicationContext reactContext) {
       return Collections.emptyList();
    }
}
