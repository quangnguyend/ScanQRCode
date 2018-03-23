import * as types from "../scenes/Sign/actions/typesActions"

const initialState = {
	info: {},
	activeScan: ''
}

const userInfo = (state = initialState, action) => {
	switch (action.type) {
		case types.INSERT_ROLE_INFO: {
			return ({
				...state,
				info: action.info
			})
		}
		//case '': {}
		default:
			return state
	}
}

export default userInfo;