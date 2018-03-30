import { StyleSheet } from 'react-native';

let style = StyleSheet.create({
    dateTouch: {
        width: 142
    },
    dateTouchBody: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: '#8E7631',
        borderRadius: 5
    },
    dateIcon: {
        width: 17,
        height: 17,
        marginLeft: 5,
        marginRight: 5
    },
    dateInput: {
        flex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dateText: {
        color: '#8E7631'
    },
    placeholderText: {
        color: '#8E7631'
    },
    datePickerMask: {
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'row',
        backgroundColor: '#00000077'
    },
    datePickerCon: {
        backgroundColor: '#fff',
        height: 0,
        overflow: 'hidden'
    },
    btnText: {
        position: 'absolute',
        top: 0,
        height: 42,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTextText: {
        //fontSize: 16,
        //color: '#46cf98',
        color: '#8E7631',
        height: 30,
        fontSize: 20
    },
    btnTextCancel: {
        //color: '#666',
        color: '#8E7631', 
        height: 100,
        fontSize: 20
    },
    btnCancel: {
        left: 0
    },
    btnConfirm: {
        right: 0
    },
    datePicker: {
        marginTop: 42,
        borderTopColor: '#ccc',
        borderTopWidth: 1
    },
    disabled: {
        backgroundColor: '#eee'
    }
});

export default style;