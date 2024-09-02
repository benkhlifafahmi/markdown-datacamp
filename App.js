import { StatusBar } from 'expo-status-bar';
import {useState, useEffect} from "react";
import {KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import MarkdownEditor from "./components/MarkdownEditor";
import MarkdownPreview from "./components/MarkdownPreview";
import {storeData, retriveData} from './utils/storage';
import useOrientation from "./hooks/useOrientation";

export default function App() {
  const [code, setCode] = useState('');
  const [defaultCode, setDefaultCode] = useState(defaultCode)
  const [editMode, setEditMode] = useState(true)
  const {isPortrait, isSmallScreen} = useOrientation();

  const onCodeChange = (value) => {
    storeData('code', value);
    setCode(value);
  }
  // we can add loader here when retriving data.
  useEffect(() => {
    // when we open the app we load old code.
    const loadSavedData = async () => {
      const data = await retriveData('code');
      setCode(data ?? '')
      setDefaultCode(data ?? '')
    }
    loadSavedData();
  }, []);

  return (
    <SafeAreaView style={styles.container} testID={'app-container'}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'height': 'padding'}>
        <View style={[styles.editor, isPortrait ? styles.portrait : styles.landscape]}>
          {
            (!isSmallScreen || (isSmallScreen && editMode)) && (
              <MarkdownEditor onCodeChange={onCodeChange} defaultCode={defaultCode}/>
            )
          }
          {
            (!isSmallScreen || (isSmallScreen && !editMode)) && (
                <MarkdownPreview code={code}/>
            )
          }
        </View>
        {
          isSmallScreen &&
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setEditMode(!editMode)}>
              <Text style={styles.buttonText}>{editMode ? 'Preview' : 'Edit'}</Text>
            </TouchableOpacity>
          </View>
        }
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
  },
  landscape: {
    flexDirection: 'row',
  },
  portrait: {
    flexDirection: 'column'
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
