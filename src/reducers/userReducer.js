import * as types from "../scenes/Sign/actions/typesActions"

const initialState = {
	roles:[],
	activeScan: ''
}

const userInfo = (state = initialState, action) => {
	switch (action.type) {
		case types.INSERT_ROLE_INFO: {
			return({
				...state,
				roles: action.info.roles
			})
		}
		//case '': {}
		default:
		return state
	}
}

export default userInfo;