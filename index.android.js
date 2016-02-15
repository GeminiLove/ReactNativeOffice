'use strict';

import React, {
	AppRegistry,
	Component,
	Text,
	Image,
	View,
	ToastAndroid,
	AsyncStorage,
	TouchableOpacity,
} from 'react-native';

var OfficePanel = require('./js/OfficePanel');
var LOGIN_URL = "http://api.listome.com/v1/users/authorization";

var MyComponent = React.createClass({
	getInitialState: function(){
		return {
			statusCode: 0,
			errorMsg: ''
		};
	},
	render: function() {
		switch(this.state.statusCode) {
			case 0: //登录中
				return this.renderLoginView();
				break;
			case -1://登录失败
				return this.renderLoginErrorView(this.state.errorMsg);
				break;
			case 1://登录成功
				return (
					<View style={styles.container}>
						<OfficePanel style={styles.officePanel} />
					</View>
				);
				break;
		}
	},
	login: function() {
		fetch(LOGIN_URL, {
			method: 'POST',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: 'mobile=15527366941&password=123123'
		}).then((response) => response.json())
			.then((responseData) => {
				var status = responseData.status;
				if(status == 10001) {
					var accessToken = responseData.data.access_token;//获取到AccessToken
					AsyncStorage.setItem("access_token", accessToken);
					console.log('access token = ' + accessToken);
					this.setState({statusCode: 1});
				}else{
					this.setState({statusCode: -1, errorMsg: '登录失败'});
				}
			})
			.catch((e) => {
				ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
				this.setState({statusCode: -1, errorMsg: e.toString()});
			})
	},
	renderLoginView: function() {
		return (
			<View style={styles.hintTextContainer}>
				<Text>登录中，请稍等...</Text>
			</View>
		);
	},
	renderLoginErrorView: function(errorMsg) {
		return (
			<TouchableOpacity style={styles.hintTextContainer} activityOpacity={0.8} onPress={this.reload}>
				<View style={styles.hintTextContainer}>
					<Text>{errorMsg}</Text>
					<Text>{'点击这里重新加载'}</Text>
				</View>
			</TouchableOpacity>
		);
	},
	reload: function() {
		this.setState({statusCode: 0});
		this.login();
	},
	componentDidMount: function() {
		this.login();
	}
});

const styles = {
	hintTextContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		marginTop: 10,
	},
	officePanel: {
	},
};

var ApplyForLeaveList = require('./ApplyForLeave.android');
var ApplyForExtraWorkList = require('./ApplyForExtraWork.android');
var CreateApplyForLeave = require('./CreateApplyForLeave.android');
var CreateApplyForExtraWork = require('./CreateApplyForExtraWork.android');
var CheckinRecord = require('./CheckinRecord.android');

AppRegistry.registerComponent('OfficeTest', () => MyComponent);
AppRegistry.registerComponent('ApplyForLeaveList', () => ApplyForLeaveList);
AppRegistry.registerComponent('ApplyForExtraWorkList', () => ApplyForExtraWorkList);
AppRegistry.registerComponent('CreateApplyForLeave', () => CreateApplyForLeave);
AppRegistry.registerComponent('CreateApplyForExtraWork', () => CreateApplyForExtraWork);
AppRegistry.registerComponent('CheckinRecord', () => CheckinRecord);