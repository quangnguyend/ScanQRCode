import * as types from "../scenes/Sign/actions/typesActions"

const initialState = {
	roles:[]
}

const userInfo = (state = initialState, action) => {
	switch (action.type) {
		case types.INSERT_ROLE_INFO: {
			return({
				...state,
				roles: action.info.roles
			})
		}
		default:
		return state
	}
}

export default userInfo;