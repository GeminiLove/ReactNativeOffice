'use strict';

import React, {
	Component,
	Text, 
	Image,
	View,
	Dimensions,
	PixelRatio,
	ToastAndroid,
	TouchableHighlight,
	TouchableOpacity
} from 'react-native';

var screenWidth = Dimensions.get('window').width;
var dateUtils = new DateUtils();

var CheckinRecord = React.createClass({
	getInitialState: function() {
		return {
			days: dateUtils.getDays(new Date()),
			date: new Date(),
			dateStr: dateUtils.getDateStr(new Date())
		};
	},
	render: function() {
		var cellRow = [];
		var cells = [];
		for(var i = 1; i <= 35; i++) {
			if(i % 7 == 0) {//添加一行
				cellRow.push(<Cell num={this.state.days[i - 1]} key={'cell' + i}/>);
				cells.push(<View key={'cellrow' + i} style={{flexDirection: 'row'}}>{cellRow}</View>);
				cellRow = [];
			}else{//添加小格子
				cellRow.push(<Cell num={this.state.days[i - 1]} key={'cell' + i}/>);
			}
		}
		return (
			<View style={styles.container}>
				<View style={{height: 35, alignItems: 'center', justifyContent: 'center'}}>
					<Text style={{fontSize: 16, color: 'green'}}>{this.state.dateStr}</Text>
				</View>
				<View style={{borderWidth: 1, borderColor: '#6699ff'}}>
					<CalenderHeader />
					<View>{cells}</View>
				</View>
				<Buttons showPreMonth={this.showPreMonth} showNextMonth={this.showNextMonth}/>
			</View>
		);
	},
	showPreMonth: function() {
		var date = this.state.date;
		date.setMonth(date.getMonth() - 1);
		var days = dateUtils.getDays(date);
		this.setState({days: days, dateStr: dateUtils.getDateStr(date)});
	},
	showNextMonth: function() {
		var date = this.state.date;
		date.setMonth(date.getMonth() + 1);
		var days = dateUtils.getDays(date);
		this.setState({days: days, dateStr: dateUtils.getDateStr(date)});
	}
});

var Buttons = React.createClass({
	render: function() {
		return (
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity onPress={this.props.showPreMonth} activityOpacity={0.9} style={{flex: 1, marginRight: 10}}>
					<View style={styles.btnContainer}>
						<Text style={styles.btnStyle}>上个月</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.props.showNextMonth} activityOpacity={0.9} style={{flex: 1, marginLeft: 10}}>
					<View style={styles.btnContainer}>
						<Text style={styles.btnStyle}>下个月</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	},	
});

var CalenderHeader = React.createClass({
	render: function() {
		var headerCells = [];
		var names = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
		for(var i = 0; i < 7; i++) {
			headerCells.push(<HeaderCell key={i} name={names[i]}/>);
		}
		return (
			<View style={styles.headerContainer}>{headerCells}</View>
		);
	}
});

var HeaderCell = React.createClass({
	render: function() {
		return (
			<View style={styles.headerCell}>
				<Text style={styles.headerCellText}>{this.props.name}</Text>
			</View>
		);
	}
});

var Cell = React.createClass({
	render: function() {
		return (
			<TouchableHighlight underlayColor='#ccccff' onPress={this.handleCellClick}>
				<View style={styles.cell}>
					<Text>{this.props.num}</Text>
					<Text style={styles.cellHintText}>打卡8次</Text>
				</View>
			</TouchableHighlight>
		);
	},
	handleCellClick: function() {
	}
});

function DateUtils(){
	this.dateNow = new Date();
	this.getDateNow = getDateNow;
	this.getMonthDays = getMonthDays;
	this.getDays = getDays;
	this.getIndexOfMonthFirstDay = getIndexOfMonthFirstDay;
	this.getDateStr = getDateStr;
	function getDateNow() {
		return {
			year: this.dateNow.getFullYear(),
			month: this.dateNow.getMonth() + 1,
			day: this.dateNow.getDate()
		};
	}
	function getMonthDays(year, month) {//获取某个月的天数，month取值1-12
		var date = new Date(year, month, 0);
		return date.getDate();
	}
	function getDays(date) {//获取某个月的天数数组
		var days = [];
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var index = getIndexOfMonthFirstDay(year, month);
		var daysOfMonth = dateUtils.getMonthDays(year, month);
		var startIndex = index - 1;
		var endIndex = startIndex + daysOfMonth - 1;
		for(var i = 0, count = 1; i < 35; i++) {
			if(i >= startIndex && i <= endIndex) {
				days[i] = '' + (count++);
			}else{
				days[i] = ' ';
			}
		}
		return days;
	}
	function getIndexOfMonthFirstDay(year, month) {//获取当月第一天是星期几(0~6, 0代表星期天,返回值1-7对应星期一到星期天),month取值1-12
		var date = new Date();
		date.setFullYear(year);
		date.setMonth(month - 1);
		date.setDate(1);
		var index = date.getDay();
		if(index == 0) index = 7;
		return index;
	}
	function getDateStr(date) {//时间格式化
		return date.getFullYear() + '年' + (date.getMonth() + 1) + '月';
	}
}

function showMsg(msg) {
	ToastAndroid.show(msg, ToastAndroid.LONG);
}

var borderWidth = 1 / PixelRatio.get();

const styles = {
	container: {
		flex: 1,
		padding: 10,
	},
	headerContainer: {
		flexDirection: 'row',
		height: 40,
	},
	headerCell: {
		width: (screenWidth - 22) / 7,
		height: 40,
		backgroundColor: '#d8d8d8',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: borderWidth,
		borderColor: '#6699ff',
	},
	headerCellText: {
		color: 'red',
		fontSize: 16,
	},
	cell: {
		width: (screenWidth - 22) / 7,
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: borderWidth,
		borderColor: '#6699ff',
	},
	cellHintText: {
		fontSize: 12,
		color: 'red',
		marginTop: 5,
		borderRadius: 10,
		borderColor: 'white',
		backgroundColor: '#cccc99'
	},
	btnContainer: {
		borderRadius: 5,
		height: 45,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#6699ff',
		marginTop: 10,
	},
	btnStyle: {
		color: 'white',
	},
};

module.exports = CheckinRecord;