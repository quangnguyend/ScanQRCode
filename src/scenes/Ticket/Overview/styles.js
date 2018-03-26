import {
	StyleSheet,
	Platform
} from 'react-native';

export default styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		paddingTop: 20,
		marginTop: (Platform.OS === 'ios') ? 20 : 0
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
		paddingBottom: 10
	},
	rowItem: {
		width: '50%'
	},
	btnDisable: {
		backgroundColor: '#CEB797'
	},
	headerStyle: { backgroundColor: '#635339' },
	headerTitleStyle: { color: '#FFFFFF', alignSelf: 'center' },
	iconStyle: {
		width: (Platform.OS === 'ios') ? 30 : '100%',
		height: (Platform.OS === 'ios') ? 30 : '100%'
	}
})