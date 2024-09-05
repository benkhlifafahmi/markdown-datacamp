import { StatusBar } from 'expo-status-bar';
import {useState, useEffect, useRef, useCallback} from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList, TouchableWithoutFeedback
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context'
import MarkdownEditor from "./components/MarkdownEditor";
import MarkdownPreview from "./components/MarkdownPreview";
import {storeData, retriveData} from './utils/storage';
import useOrientation from "./hooks/useOrientation";

export default function App() {
  const [code, setCode] = useState('');
  const [defaultCode, setDefaultCode] = useState(defaultCode)
  const [editMode, setEditMode] = useState(true)
  const {isPortrait, isSmallScreen} = useOrientation();

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
  /**
   * {
   *     code: text,
   *     isInPreview: boolean,
   * }
   */
  const [blocks, setBlocks] = useState([
    {
      code: '',
      isInPreview: false,
    }
  ])
  const [focusedItemIndex, setFocusedItemIndex] = useState(-1);
  useEffect(() => {
    if (focusedItemIndex > -1) {
      blocksListRef.current?.scrollToIndex?.({
        animated: true,
        index: focusedItemIndex,
        viewOffset: 50
      })
    }
  }, [focusedItemIndex]);

  const onCodeChange = useCallback((index, value) => {
    const _blocks = [...blocks];
    _blocks[index].code = value;
    setBlocks(_blocks);
  }, [blocks]);

  const togglePreviewBlock = useCallback((index) => {
    const _blocks = [...blocks];
    _blocks[index].isInPreview = !_blocks[index].isInPreview;
    setBlocks(_blocks);
  }, [blocks]);

  const moveUp = useCallback((index) => {
    if (index > 0) {
      const _blocks = [...blocks];
      [_blocks[index - 1], _blocks[index]] = [_blocks[index], _blocks[index - 1]];
      setBlocks(_blocks);
      setFocusedItemIndex(index - 1);
    }
  }, [blocks]);

  const moveDown = useCallback((index) => {
    if (index < blocks.length - 1) {
      const _blocks = [...blocks];
      [_blocks[index], _blocks[index + 1]] = [_blocks[index + 1], _blocks[index]];
      setBlocks(_blocks);
      setFocusedItemIndex(index + 1);
    }
  }, [blocks]);


  const removeBlock = (index) => {
    const _blocks = [...blocks]
    _blocks.splice(index, 1)
    setBlocks(_blocks)
  }
  const renderMarkdownBlock = ({item, index}) => {
    const isFocused = index === focusedItemIndex;
    return (
        <TouchableWithoutFeedback onPress={() => setFocusedItemIndex(index)}>
          <View style={[styles.editor, isPortrait ? styles.portrait : styles.landscape, isFocused && {
            borderColor: 'blue',
          }]}>
            {
              item.isInPreview ?
                  <MarkdownPreview code={item.code}/>
                  :
                  <MarkdownEditor onCodeChange={(value) => onCodeChange(index, value)} defaultCode={item.code} onFocus={() => setFocusedItemIndex(index)}/>
            }
            {
              isFocused && (
                <View style={{
                  flexDirection: 'row',
                }}>
                  <TouchableOpacity onPress={( ) => togglePreviewBlock(index)}>
                    <Text>{item.isInPreview ? 'Edit' : 'Run'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={( ) => moveUp(index)}  disabled={index === 0}>
                    <Text>Up</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={( ) => moveDown(index)} disabled={index === blocks.length}>
                    <Text>Down</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeBlock(index)}>
                    <Text>Delete</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          </View>
        </TouchableWithoutFeedback>
    )
  }
  const blocksListRef = useRef(null);
  return (
    <SafeAreaView style={styles.container} testID={'app-container'}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? "height" : 'padding'} keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 80} >
        <FlatList
            data={blocks}
            renderItem={renderMarkdownBlock}
            keyExtractor={(item, index) => `block_${index}`}
            ref={blocksListRef}
            removeClippedSubviews={false}
            keyboardShouldPersistTaps={'handled'}
            ListFooterComponent={
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setBlocks([
                        ...blocks,
                        {
                          code: '',
                          isInPreview: false,
                        }
                      ]);
                      blocksListRef?.current?.scrollToEnd({animated: true});
                    }}
                >
                  <Text style={styles.buttonText}>{editMode ? 'Preview' : 'Edit'}</Text>
                </TouchableOpacity>
              </View>
            }
            ListFooterComponentStyle={{ paddingBottom: 20 }}
        />
      </KeyboardAvoidingView>
        <StatusBar style="auto" />
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
