import { StatusBar } from 'expo-status-bar';
import {useState, useRef} from "react";
import {KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MarkdownEditor from "./components/MarkdownEditor";
import MarkdownPreview from "./components/MarkdownPreview";

export default function App() {
  const [code, setCode] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'height': 'padding'}>
        <View style={styles.editor}>
          <MarkdownEditor onCodeChange={setCode} />
          <MarkdownPreview code={code}/>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Render</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  editor: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00ee00',
    borderWidth: 1,
    borderColor: '#1e1e1e',
    padding: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  }
});
