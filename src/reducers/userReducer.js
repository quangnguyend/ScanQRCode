import * as types from "../scenes/Sign/actions/typesActions"

const initialState = {
	info: {},
	activeScan: '',
	showNavVendor: true
}

const userInfo = (state = initialState, action) => {
	switch (action.type) {
		case types.INSERT_ROLE_INFO: {
			return ({
				...state,
				info: action.info
			})
		}
		case types.SET_ACTION_SCANNER: {
			return ({
				...state,
				activeScan: action.action
			})
		}
		case types.SET_VISIBLE_NAV_VENDOR:
			{
				return ({
					...state,
					showNavVendor: action.action
				})
			}
		default:
			return state
	}
}

export default userInfo;