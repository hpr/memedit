package com.memedit;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;

public class ScanMem extends ReactContextBaseJavaModule {
  static {
    try {
      System.loadLibrary("scanmem-controller");
    } catch (java.lang.UnsatisfiedLinkError e) {
      System.out.println(e.getMessage());
      Log.e("ScanMem", e.getMessage());
    }
  }
  private static native String sm_get_version();
  ScanMem(ReactApplicationContext context) {
    super(context);
  }
  @Override
  public String getName() {
    return "ScanMem";
  }
  @ReactMethod
  public void getVersion(Promise promise) {
    try {
      String version = sm_get_version();
      Log.e("ScanMem", version);
      promise.resolve(version);  
    } catch (Exception e) {
      promise.reject("ERR", e);
    }
  }
}