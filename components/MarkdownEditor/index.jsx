import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

export default function MarkdownEditor({ onCodeChange }){
    return (
        <View style={styles.container}>
            <TextInput
                multiline
                placeholder={'You can write your markdown text here.'} // this can be changed with i18n text if we wanted multi-lang support
                onChangeText={onCodeChange}
                style={styles.input}
            />
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        margin: 4,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#1e1e1e',
        flex: 1,
    }
})
