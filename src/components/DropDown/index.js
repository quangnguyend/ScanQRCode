'use strict';

exports.__esModule = true;
exports.default = Dropdown;
exports.OptionsModal = OptionsModal;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _DropdownStyle = require('./styles');

var _DropdownStyle2 = _interopRequireDefault(_DropdownStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Dropdown(props) {
    return _react2.default.createElement(
        _reactNative.View,
        { style: _DropdownStyle2.default.container },
        // props.label ? _react2.default.createElement(
        //   _reactNative.Text,
        //   { style: _DropdownStyle2.default.label },
        //   props.label
        // ) : null,
        _react2.default.createElement(
            _reactNative.TouchableOpacity,
            {
                style: _DropdownStyle2.default.button, onPress: function onPress() {
                    return props.onShow(true);
                }
            },
            _react2.default.createElement(
                _reactNative.View,
                { style: _DropdownStyle2.default.option },
                _react2.default.createElement(
                    _reactNative.Text,
                    { style: _DropdownStyle2.default.defaultOptionText },
                    props.label
                ),
                _react2.default.createElement(
                    _reactNative.Image,
                    {
                        source: require('../../assets/images/arrow-down.png'),
                        style: _DropdownStyle2.default.arrowIcon
                    }
                )
            )
        ),
        props.isShowingOptions ? _react2.default.createElement(OptionsModal, props) : null
    );
}
function OptionsModal(props) {
    return _react2.default.createElement(
        _reactNative.Modal,
        {
            animationType: props.animationType,
            visible: props.isShowingOptions,
            onRequestClose: function onRequestClose() {
                return props.onShow(false);
            },
            transparent: true,
            supportedOrientations: ['portrait']
        },
        _react2.default.createElement(
            _reactNative.TouchableWithoutFeedback,
            {
                onPress: function onPress() {
                    return props.onShow(false);
                }
            },
            _react2.default.createElement(
                _reactNative.View,
                { style: _DropdownStyle2.default.backdrop },
                _react2.default.createElement(
                    _reactNative.ScrollView,
                    { style: _DropdownStyle2.default.scrollViewOption },
                    props.options.map(function (item, index) {
                        return _react2.default.createElement(
                            _reactNative.TouchableOpacity,
                            {
                                key: index, style: _DropdownStyle2.default.optionItem, onPress: function onPress() {
                                    return props.onSelect(item, false);
                                }
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                { style: _DropdownStyle2.default.optionText },
                                item.label
                            )
                        );
                    })
                )
            )
        )
    );
}