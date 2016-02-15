'use strict';

import React, {
	Component,
	Text,
	Image,
	View,
	PixelRatio,
	TouchableHighlight,
	Dimensions,
	TouchableOpacity,
	ToastAndroid,
	AsyncStorage,
} from 'react-native';

var screenWidth = Dimensions.get('window').width;

var MenuItem = React.createClass({
	render: function() {
		return (
			<TouchableOpacity activityOpacity={0.9} onPress={this.handleClick}>
				<View style={styles.menuContainer} >
					<Image source={this.props.imagePath} style={styles.image} />
					<Text style={styles.menuName} >{this.props.menuName}</Text>
				</View>
			</TouchableOpacity>
		);
	},
	handleClick: function() {
		var ActivityAndroid = require('./ActivityAndroid');
		//ToastAndroid.show(this.props.menuName, ToastAndroid.SHORT);
		ActivityAndroid.startActivity('com.test.officetest.DetailActivity', this.props.menuName);
	}
});

			// <TouchableHighlight underlayColor='#4BC69E'>
			// 	<View style={styles.menuContainer} >
			// 		<Image source={require('./images/ic_sina.png')} style={styles.image} />
			// 		<Text style={styles.menuName} >{this.props.menuName}</Text>
			// 	</View>
			// </TouchableHighlight>

const styles = {
	menuContainer: {
		width: screenWidth / 3,
		height: 120,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5,
	},
	image: {
		width: screenWidth / 4.5,
		height: screenWidth / 4.5,
	},
	menuName: {
		marginTop: 5,
		fontSize: 14,
		color: '#000000'
	}
};

module.exports = MenuItem;