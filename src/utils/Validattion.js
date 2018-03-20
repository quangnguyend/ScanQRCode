export const isEmail = (text) => {
	let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return reg.test(text) ? true : false;
}

export const isEmpty = (str) => {
	return str.replace(/^\s+|\s+$/g, '').length == 0;
}