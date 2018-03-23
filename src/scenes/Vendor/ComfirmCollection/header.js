import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';

export default HeaderCustom = (props) => {
    const { getScreenDetails, scene } = props;
    const details = getScreenDetails(scene)
    return (
        <View style={styles.header}>
            <Text style={[styles.headerText, { fontSize: 17, fontWeight: 'bold' }]}>{details.options.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#635339',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    headerText: {
        color: '#FFFFFF'
    }
});