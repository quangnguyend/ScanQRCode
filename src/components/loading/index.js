import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text
} from 'react-native';

import propTypes from 'prop-types';

var interVal = null;

class Loading extends Component {

  static propTypes = {
    loading: propTypes.bool,
    showTextLoading: propTypes.bool
  }
  static defaultProps = {
    loading: true,
    showTextLoading: false
  }

  constructor(props) {
    super(props)
    this.state = {
      textLoading: ''
    }
  }

  componentDidMount() {
    const { showTextLoading } = this.props;
    if (showTextLoading) {
      interVal = setInterval(() => {
        if (this.state.textLoading.length === 3) {
          this.setState({
            textLoading: ''
          })
        } else {
          this.setState({
            textLoading: this.state.textLoading + '.'
          })
        }
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(interVal);
  }

  render() {
    const { textLoading } = this.state;
    const {
      loading,
      showTextLoading,
      ...attributes
    } = this.props;

    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={loading}
        onRequestClose={() => { console.log('close modal') }}>
        <View style={[styles.modalBackground, { backgroundColor: showTextLoading ? 'black' : '#00000040' }]}>
          <View style={styles.activityIndicatorWrapper}>
            {showTextLoading ? <Text style={styles.textLoading}>In Progress{textLoading}</Text> : null}
            <ActivityIndicator
              size={'large'}
              color={showTextLoading ? '#FFFFFF' : null}
              animating={loading} />
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  textLoading: {
    color: '#FFFFFF',
    marginBottom: 20,
    width: 120,
    fontSize: 20
  },
  activityIndicatorWrapper: {
    height: 120,
    width: 120,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default Loading;