import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, NativeModules, TextInput } from 'react-native';
const { ScanMem } = NativeModules;

export default function App() {
  const [version, setVersion] = useState("");
  const [pid, setPid] = useState("");
  const [output, setOutput] = useState("");
  return (
    <View style={styles.container}>
      <Text>Scanmem version: {version}</Text>
      <Button title="Get Version" onPress={async () => {
        const v = await ScanMem.getVersion();
        setVersion(v);
      }} />
      <TextInput
        placeholder="Type PID here"
        onChangeText={text => setPid(text)}
        defaultValue={pid}
      />
      <Button title="Run PID Command" onPress={async () => {
        const o = await ScanMem.execCmd(`pid ${pid}`);
        setOutput(o);
      }} />
      <Text style={{ fontFamily: 'monospace' }}>{output}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
