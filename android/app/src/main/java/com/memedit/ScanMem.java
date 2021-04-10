package com.scanmom;
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
import android.content.Context;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.DataOutputStream;
import java.util.Arrays;

public class ScanMem extends ReactContextBaseJavaModule {
  static {
    try {
      System.loadLibrary("scanmem-controller");
    } catch (java.lang.UnsatisfiedLinkError e) {
      Log.e("ScanMem", e.getMessage());
    }
  }

  private static native String sm_get_version();
  private static native void init(String nativeLibraryDir);
  private static native String sm_backend_exec_cmd(String cmd);

  ScanMem(ReactApplicationContext context) {
    super(context);
    init(context.getApplicationInfo().nativeLibraryDir);
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

  @ReactMethod
  public void execCmd(String cmd, Promise promise) {
    String output = sm_backend_exec_cmd(cmd);
    Log.e("ScanMem", output);
    promise.resolve(output);
  }

  @ReactMethod
  public void pidOf(String packageName, Promise promise) {
    try {
      String[] cmd = new String[]{"su", "-c", "/system/bin/pidof " + packageName};
      Process process = Runtime.getRuntime().exec(cmd);
      BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
      promise.resolve(reader.readLine());
    } catch (IOException e) {
      promise.reject(e.getMessage());
    }
  }
}