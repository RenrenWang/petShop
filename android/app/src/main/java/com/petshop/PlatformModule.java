package com.petshop;


import android.content.Context;
import android.os.Environment;
import android.support.annotation.Nullable;
import android.widget.Toast;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import static android.widget.Toast.LENGTH_SHORT;

/**
 * Created by Administrator on 2017/8/1 0001.
 */

public class PlatformModule  extends ReactContextBaseJavaModule{
    private Map<String, Object>  constants;
    private  final  ReactApplicationContext  myContext;

    public PlatformModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.myContext=reactContext;
    }

    @Override
    public String getName() {
        return "Platform";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        constants=new HashMap<String,Object>();
     

        return constants;
    }

    @ReactMethod
    public  void show(String msg) {
        Toast.makeText(getReactApplicationContext(),msg, LENGTH_SHORT).show();
    }

//    public void showSize(){
//
//
//        try {
//
//
//            Toast.makeText(getReactApplicationContext(),getTotalCacheSize(), LENGTH_SHORT).show();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//
//
//    }
    @ReactMethod
    public void  getTotalCacheSize(final Promise promise) {

        long cacheSize = 0;
        try {
            cacheSize = getFolderSize(getReactApplicationContext().getCacheDir());
            if (Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)) {
                cacheSize += getFolderSize(getReactApplicationContext().getExternalCacheDir());
            }
            promise.resolve(getFormatSize(cacheSize));
            //constants.put("cacheSize",getFormatSize(cacheSize));
        } catch (Exception e) {
            promise.reject(e);
        }

       // Toast.makeText(getReactApplicationContext(),getFormatSize(cacheSize), LENGTH_SHORT).show();


    }



    /**
     * 清除缓存
     * @param
     */
    @ReactMethod
    public  void clearAllCache(final Promise promise) {
        Context context=getReactApplicationContext();
      //   deleteDir(context.getCacheDir());
        try {

            promise.resolve(deleteDir(context.getCacheDir()));
        } catch (Exception e) {
            promise.reject(e);
        }
        if (Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)) {
            deleteDir(context.getExternalCacheDir());


        }
    }

    private  boolean deleteDir(File dir) {
        if (dir != null && dir.isDirectory()) {
            String[] children = dir.list();
            for (int i = 0; i < children.length; i++) {
                boolean success = deleteDir(new File(dir, children[i]));
                if (!success) {
                    return false;
                }
            }
        }
        return dir.delete();
    }

    // 获取文件大小
    //Context.getExternalFilesDir() --> SDCard/Android/data/你的应用的包名/files/ 目录，一般放一些长时间保存的数据
    //Context.getExternalCacheDir() --> SDCard/Android/data/你的应用包名/cache/目录，一般存放临时缓存数据
    public  long getFolderSize(File file) throws Exception {
        long size = 0;
        try {
            File[] fileList = file.listFiles();
            for (int i = 0; i < fileList.length; i++) {
                // 如果下面还有文件
                if (fileList[i].isDirectory()) {
                    size = size + getFolderSize(fileList[i]);
                } else {
                    size = size + fileList[i].length();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return size;
    }

    /**
     * 格式化单位
     * @param size
     * @return
     */
    public  String getFormatSize(double size) {
        double kiloByte = size / 1024;
        if (kiloByte < 1) {
//            return size + "Byte";
            return "0K";
        }

        double megaByte = kiloByte / 1024;
        if (megaByte < 1) {
            BigDecimal result1 = new BigDecimal(Double.toString(kiloByte));
            return result1.setScale(2, BigDecimal.ROUND_HALF_UP)
                    .toPlainString() + "K";
        }

        double gigaByte = megaByte / 1024;
        if (gigaByte < 1) {
            BigDecimal result2 = new BigDecimal(Double.toString(megaByte));
            return result2.setScale(2, BigDecimal.ROUND_HALF_UP)
                    .toPlainString() + "M";
        }

        double teraBytes = gigaByte / 1024;
        if (teraBytes < 1) {
            BigDecimal result3 = new BigDecimal(Double.toString(gigaByte));
            return result3.setScale(2, BigDecimal.ROUND_HALF_UP)
                    .toPlainString() + "GB";
        }
        BigDecimal result4 = new BigDecimal(teraBytes);
        return result4.setScale(2, BigDecimal.ROUND_HALF_UP).toPlainString()
                + "TB";
    }


 /**
     * get the sdk version. 获取SDK版本号
     *
     */
//    public void getSDKVersion() {
//        PayTask payTask = new PayTask(ReactActivity);
//        String version = payTask.getVersion();
//        Toast.makeText(getReactApplicationContext(), version, LENGTH_SHORT).show();
//    }
}
