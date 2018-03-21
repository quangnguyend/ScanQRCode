import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import { TextCustom } from './../../../components';
import Header from './header';

export default class ScanResult extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        header: (props) => <Header {...props} {...navigation.state.params} />
    })

    constructor(props) {
        super(props)
        this.state = {
            typeView: null
        }
    }

    componentDidMount() {
        const { appError, title, firstEventEnterOfDay } = this.props.navigation.state.params
        console.log(this.props.navigation.state.params)

        // if (title.indexOf('ENTRY')) {
        //     if(title.indexOf('INVALID'))
        // }
    }

    _renderView = () => {
        const { } = this.state
    }

    render() {
        const { ticketName, ticketId, ticketHolderName, message, event } = this.props.navigation.state.params;
        const { typeView } = this.state;
        return (
            <View style={styles.container}>
                <TextCustom paddingBottom={60}>{ticketName}</TextCustom>
                <TextCustom color={'#66CC99'} paddingTop={20} paddingBottom={60} fontSize={24}>{message}</TextCustom>
                <TextCustom paddingTop={20} paddingBottom={40}>PLACE ENTERED: {event}</TextCustom>
                <TextCustom >TICKET ID: {ticketId}</TextCustom>
                <TextCustom >Ticket Holder: {ticketHolderName}</TextCustom>
                {/* {this._renderView()} */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    message: {

    }
})