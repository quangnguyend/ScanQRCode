import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import { TextCustom, TextInputCustom, ButtonCustom, Footer, DatePicker, DropDown, Camera } from './../../../components'

const DEMO_OPTIONS_2 = [
    { "name": "Rex", "age": 30 },
    { "name": "Mary", "age": 25 },
    { "name": "John", "age": 41 },
    { "name": "Jim", "age": 22 },
    { "name": "Susan", "age": 52 },
    { "name": "Brent", "age": 33 },
    { "name": "Alex", "age": 16 },
    { "name": "Ian", "age": 20 },
    { "name": "Phil", "age": 24 },
];

export default class Overview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: ''
        }
    }
    _dropdown_2_renderButtonText = (rowData) => {
        const { name, age } = rowData;
        return `${name} - ${age}`;
    }
    onEntry = () => {
        console.log(this.props)
        this.props.navigation.navigate('Entry');
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <TextCustom>SCAN QR CODE</TextCustom>
                    <View style={styles.row}>
                        <ButtonCustom width={100} onPress={this.onEntry}>ENTRY</ButtonCustom>
                        <ButtonCustom width={100} onPress={this.onEntry}>VIEW INFO</ButtonCustom>
                    </View>
                    <TextCustom>IF TICKET SCANNING FAILS, TYPE THE TICKET ID TO ADMIT ENTRY OR VIEW INFO</TextCustom>
                    <TextInputCustom />
                    <View style={styles.floatRight}>
                        <ButtonCustom width={90} padding={10} fontSize={13}>ENTRY</ButtonCustom>
                        <ButtonCustom width={90} padding={10} fontSize={13}>VIEW INFO</ButtonCustom>
                    </View>
                    <TextCustom>EVENT YOU ARE SCANNING IN</TextCustom>
                    <TextCustom>Current Event: Auction</TextCustom>
                    <View style={styles.row}>
                        <DatePicker
                            style={{ width: 200 }}
                            date={this.state.date}
                            mode="date"
                            placeholder="placeholder"
                            format="YYYY-MM-DD"
                            //minDate="2016-05-01"
                            //maxDate="2016-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            iconSource={require('./../../../assets/images/arrow-down.png')}
                            onDateChange={(date) => { this.setState({ date: date }); }}
                        />
                        {/* <ModalDropdown ref="dropdown_2"
                            //style={styles.dropdown_2}
                            //textStyle={styles.dropdown_2_text}
                            //dropdownStyle={styles.dropdown_2_dropdown}
                            options={DEMO_OPTIONS_2}
                            renderButtonText={(rowData) => this._dropdown_2_renderButtonText(rowData)}
                            renderRow={this._dropdown_2_renderRow.bind(this)}
                            renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                        /> */}
                    </View>
                    <View style={styles.floatRight}>
                        <ButtonCustom>SUBMIT</ButtonCustom>
                    </View>
                </View>
                <Footer />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 0
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        paddingBottom: 10,
        paddingTop: 10,
        justifyContent: 'center'
    },
    floatRight: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingBottom: 10,
        paddingTop: 10
    }
})