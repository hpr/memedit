adb root
adb push ../jni /data/data/com.termux/files/home
adb shell "chown -R u0_a177:u0_a177 /data/data/com.termux/files/home/jni/"
read -p "now run make in termux"
adb pull /data/data/com.termux/files/home/jni/libscanmem-controller.so
#adb push libscanmem-controller.so /system/lib64/
