'use strict';

import React, {
	Component,
	Text,
	Image,
	View
} from 'react-native';

var MenuItem = require('./MenuItem');

var OfficePanel = React.createClass({
	render: function() {
		var images = [];
		images.push(require('../images/ic_apply_for_leave.png'));
		images.push(require('../images/ic_apply_for_extra_work.png'));
		images.push(require('../images/ic_checkin_record.png'));
		var titles = ['请假申请', '加班申请', '打卡记录'];
		var items = [];
		for(var i = 0; i < images.length; i++) {
        	items.push(<MenuItem key={i + 1} imagePath={images[i]} menuName={titles[i]} />);
        }
		return (
		<View>
			<View style={styles.officeContainer} >
				{items}
			</View>
			<View style={styles.officeContainer} >
				<MenuItem imagePath={require('../images/ic_apply_for_leave.png')} menuName={"新建请假申请"}/>
				<MenuItem imagePath={require('../images/ic_apply_for_extra_work.png')} menuName={"新建加班申请"}/>
				
			</View>
		</View>
		);
	}
});

const styles = {
	officeContainer: {
		height: 120,
		flexDirection: 'row'
	},
};

module.exports = OfficePanel;