workaround for including libscanmem.so: 

```
adb root
adb shell "mkdir /data/data/com.memedit/lib"
adb push android/app/src/main/jni/libs/arm64-v8a/libscanmem.so.1.0.0 /data/data/com.memedit/lib/
adb shell "chown -R u0_a218:u0_a218 /data/data/com.memedit/lib/" # same as the other files in /data/data/com.memedit
```