'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactNative = require('react-native');

var _Dimensions$get = _reactNative.Dimensions.get('window'),
    height = _Dimensions$get.height,
    width = _Dimensions$get.width;

var optionText = {
    textAlign: 'center',
    flex: 1,
    color: '#8E7631'
};
exports.default = _reactNative.StyleSheet.create({
    container: {
        marginBottom: 10
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(129, 133, 130, 0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        textAlign: 'left',
        height: 20,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    button: {
        height: 40,
        borderWidth: 1.5,
        borderTopColor: '#8E7631',
        borderBottomColor: '#8E7631',
        borderLeftColor: '#8E7631',
        borderRightColor: '#8E7631',
        borderRadius: 5,
        alignItems: 'center'
    },
    option: {
        flex: 1,
        marginTop: 10,
        flexDirection: 'row'
    },
    defaultOptionText: _extends({}, optionText),
    optionText: _extends({}, optionText, {
        marginTop: 10,
        width: 80 / 100 * width
    }),
    icon: {
        textAlign: 'center',
        marginTop: 5,
        marginRight: 10
    },
    scrollViewOption: {
        maxHeight: 50 / 100 * height
    },
    optionItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#a8a7a4',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 7
    },
    arrowIcon: {
        width: 17,
        height: 17,
        marginLeft: 5,
        marginRight: 5
    }
});