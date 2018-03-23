import React from 'react';

import { NetInfo, Platform, ToastAndroid, Alert } from 'react-native';

/* global fetch */
import apiConfig from './config';

class FullertonHttp {
	constructor() {
		// private constants.
		this.HTTP_METHOD_POST = 'POST';
		this.HTTP_METHOD_GET = 'GET';
		this.HTTP_METHOD_PUT = 'PUT';
		this.HTTP_METHOD_DELETE = 'DELETE';
		this.CONTENT_TYPE_JSON = 'application/json';
		this.HTTP_HEADER_ACCEPT = 'Accept';
		this.HTTP_HEADER_CONTENT_TYPE = 'Content-Type';
	}

	getMethod(api, success, failure) {
		this.request(this.HTTP_METHOD_GET, api, null, success, failure);
	}

	postMethod(api, body, success, failure) {
		this.request(this.HTTP_METHOD_POST, api, body, success, failure);
	}

	errorNetwork(callback) {
		Alert.alert(   // Shows up the alert without redirecting anywhere
			'Network Error'
			, 'Network request failed. Please recheck connection!'
			, [
				{ text: 'Ok', onPress: callback }
			]
		);

		//check wifi is available
		// NetInfo.isConnected.fetch().then(isConnected => {
		// 	if (!isConnected) {
		// 		if (Platform.OS === 'ios') {
		// 			alert("Please connect network to continue")
		// 		} else {
		// 			ToastAndroid.show("Please connect network to continue", ToastAndroid.LONG, ToastAndroid.CENTER);
		// 		}
		// 		return;
		// 	}
		// });
	}

	async request(method, api, body, success, failure) {

		let headers = {
			'Accept': this.CONTENT_TYPE_JSON,
			'Content-Type': this.CONTENT_TYPE_JSON
		}
		//const token = await LocalStorage.getString(StorageKeys.TOKENDATA)
		let url = url = apiConfig.API_URL + api;

		const bodyString = body !== null ? JSON.stringify(body) : null;
		const encodedUrl = encodeURI(url);
		// console.log('>>>>> Request ' + method + ': ' + encodedUrl + '\nHeaders: ' + JSON.stringify(headers) + '\nBody: ' + bodyString);

		fetch(encodedUrl,
			{
				method: method,
				headers: headers,
				body: bodyString
			})
			.then((response) => {
				return response.json();
			})
			.then((responseJson) => {
				switch (responseJson.status_code) {
					case 400: {
						console.log('-----REFRESH TOKEN-----')
						return;
						//return this.getAccessTocken(true,gmgEnabled, method, api, body, success, failure)
					}
					default:
						return success(responseJson);
				}

			})
			.catch((error) => {
				console.log('<<<<< Response Error: ')
				console.log(error)
				return failure(error);
			});
	}
}
const FullertonSv = new FullertonHttp();
module.exports = FullertonSv;