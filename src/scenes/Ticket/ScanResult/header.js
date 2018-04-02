import React, { Component } from 'react';
import {
    View,
    Vibration,
    StyleSheet,
    Image,
    Text,
    TouchableHighlight,
    AsyncStorage,
    Platform
} from 'react-native';
import { connect } from 'react-redux';

class HeaderCustomS extends Component {
    constructor(props) {
        super(props)
    }

    onBack = () => {
        this.props.navigate('Overview');
    }

    onScanner = () => {
        const { title, typeScannerCode, eventCode } = this.props;
        this.props.navigate('Scanner', { title: title, typeScannerCode: typeScannerCode, eventCode: eventCode });
    }

    render() {
        const { getScreenDetails, scene } = this.props;
        const details = getScreenDetails(scene)
        return (
            <View style={styles.header}>
                <TouchableHighlight underlayColor={'transparent'} style={styles.btnBack} onPress={this.onBack}>
                    <View style={styles.btnBackView}>
                        <Image
                            source={require('../../../assets/images/back-icon.png')}
                        />
                        <Text style={[styles.headerText, { paddingLeft: 5 }]}>Scanner</Text>
                    </View>
                </TouchableHighlight>
                <Text style={[styles.headerText, { fontSize: 17, fontWeight: 'bold' }]}>{details.options.title}</Text>
                <TouchableHighlight underlayColor={'transparent'} style={styles.btnCam} onPress={this.onScanner}>
                    <Image
                        source={require('../../../assets/images/cam-icon.png')}
                    />
                </TouchableHighlight>
            </View>
        )
    }
}

const mapDispatchToProp = dispatch => ({
    navToMain: (role) => dispatch({ type: 'Reset', routeName: role }),
    navigate: (routeName, params) => dispatch({ type: 'TicketNavigate', ...{ routeName: routeName, params: params } })
});

export default connect(null, mapDispatchToProp)(HeaderCustomS);

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#635339',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginTop: (Platform.OS === 'ios') ? 20 : 0
    },
    headerText: {
        color: '#FFFFFF'
    },
    btnBack: {
        position: 'absolute',
        left: 0
    },
    btnBackView: {
        flexDirection: 'row',
        paddingLeft: 10
    },
    btnCam: {
        position: 'absolute',
        right: 10
    }
});