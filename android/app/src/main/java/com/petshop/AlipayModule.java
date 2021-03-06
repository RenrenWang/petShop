package com.petshop;

import android.annotation.SuppressLint;
import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;
import android.util.Log;

import com.alipay.sdk.app.PayTask;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by m2mbob on 16/5/6.
 */
public class AlipayModule extends ReactContextBaseJavaModule {

    private static final int SDK_PAY_FLAG = 1;
    private static final String TAG = "AlipayModule";

    @SuppressLint("HandlerLeak")
    private Handler mHandler = new Handler(getReactApplicationContext().getMainLooper()) {
        @SuppressWarnings("unused")
        public void handleMessage(Message msg) {
            try{
                switch (msg.what) {
                    case SDK_PAY_FLAG: {
                        String resultStatus = (String) msg.obj;
                        // 判断resultStatus 为“9000”则代表支付成功，具体状态码代表含义可参考接口文档
                        if (TextUtils.equals(resultStatus, "9000")) {
                           Log.d("resultStatus","支付成功");
                           // Toast.makeText(getCurrentActivity(), "支付成功", Toast.LENGTH_SHORT).show();
                        } else {
                            // 判断resultStatus 为非"9000"则代表可能支付失败
                            // "8000"代表支付结果因为支付渠道原因或者系统原因还在等待支付结果确认，最终交易是否成功以服务端异步通知为准（小概率状态）
                            if (TextUtils.equals(resultStatus, "8000")) {
                              Log.d("resultStatus","支付结果确认中");
                                //Toast.makeText(getCurrentActivity(), "支付结果确认中", Toast.LENGTH_SHORT).show();

                            } else {
                                // 其他值就可以判断为支付失败，包括用户主动取消支付，或者系统返回的错误
                                Log.d("resultStatus","支付失败");
                                //Toast.makeText(getCurrentActivity(), "支付失败", Toast.LENGTH_SHORT).show();

                            }
                        }
                        break;
                    }
                    default:
                        break;
                }
            }catch (Exception e){
                Log.d(TAG, "error: " + e.toString());
            }
        };
    };

    public AlipayModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }



    @ReactMethod
    public void pay(final String payInfo,
                    final Promise promise) {
        // EnvUtils.setEnv(EnvUtils.EnvEnum.SANDBOX);
        Runnable payRunnable = new Runnable() {
            @Override
            public void run() {
                try {
              
                    PayTask alipay = new PayTask(getCurrentActivity());
                    String result = alipay.pay(payInfo,true);
                    PayResult payResult = new PayResult(result);
                    String resultInfo = payResult.getMemo();
                    String resultStatus = payResult.getResultStatus();
                    Message msg = new Message();
                    msg.what = SDK_PAY_FLAG;
                    msg.obj = resultStatus;
                    mHandler.sendMessage(msg);
                    if(Integer.valueOf(resultStatus) >= 8000){
                        promise.resolve(resultStatus);
                    }else{
                        promise.resolve(resultStatus);
                    }
                } catch (Exception e) {
                    promise.reject(e);
                }
            }
        };

        Thread payThread = new Thread(payRunnable);
        payThread.start();
    }

    @Override
    public String getName() {
        return "AlipayModule";
    }

}
