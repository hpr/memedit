import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, NativeModules } from 'react-native';
const { ScanMem } = NativeModules;

export default function App() {
  const [version, setVersion] = useState("");
  return (
    <View style={styles.container}>
      <Text>Scanmem version: {version}</Text>
      <Button title="Get Version" onPress={async () => {
        const v = await ScanMem.getVersion();
        setVersion(v);
      }} />
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
