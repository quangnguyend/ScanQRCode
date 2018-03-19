import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

export default class ScanResult extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params)
    }

    render() {
        return (
            <View>
                <Text>Result</Text>
            </View>
        )
    }
}