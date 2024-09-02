import React from 'react';
import {ScrollView, StyleSheet} from "react-native";
import Markdown from 'react-native-markdown-display';
export default function MarkdownPreview({code}) {
    return (
        <ScrollView style={styles.container}>
            <Markdown>
                {code}
            </Markdown>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 4,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#1e1e1e'
    },
})
