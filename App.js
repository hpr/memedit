import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  NativeModules,
  TextInput,
} from "react-native";
const { ScanMem } = NativeModules;

export default function App() {
  const [version, setVersion] = useState("");
  const [pid, setPid] = useState("");
  const [packageName, setPackageName] = useState("");
  const [output, setOutput] = useState("");
  return (
    <View style={styles.container}>
      {/* <Text>Scanmem version: {version}</Text>
      <Button
        title="Get Version"
        onPress={async () => {
          const v = await ScanMem.getVersion();
          setVersion(v);
        }}
      /> */}
      {pid ? (
        <>
          <Text>Searching memory for {packageName}</Text>

        </>
      ) : (
        <>
          <TextInput
            placeholder="Enter packageName (e.g. com.scanmom)"
            onChangeText={(text) => setPackageName(text)}
            defaultValue={packageName}
          />
          <Button
            title="Get PID From Package Name"
            onPress={async () => {
              const p = await ScanMem.pidOf(packageName);
              console.log(p);
              if (p) {
                await ScanMem.execCmd(`pid ${p}`);
              }
              setPid(p);
            }}
          />
        </>
      )}
      <Text style={{ fontFamily: "monospace" }}>{pid}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
