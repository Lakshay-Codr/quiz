import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default function ORDivider() {
    return (
        <View style={styles.container}>
            <View style={styles.line}></View>
            <Text style={styles.text}>OR</Text>
            <View style={styles.line}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 50,
    },

    line: {
        height: 1,
        width: '45%',
        backgroundColor: "#E3E3E3"
    },

    text: {
        fontWeight: "bold",
        fontSize: 14,
        lineHeight: 20,
        color: "#2E2E2E"
    },
});
