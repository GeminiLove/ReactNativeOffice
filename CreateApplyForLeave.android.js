/**
新建请假申请
*/
'use strict';

import React, {
    Alert,
    View,
    Text,
    PixelRatio,
    Image,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    TouchableWithoutFeedback,
    PickerAndroid,
    AsyncStorage
} from 'react-native';

var GET_TYPE_URL = "http://api.listome.com/v1/companies/leave/types";

var CreateApplyForLeave = React.createClass({
    getInitialState: function() {
        return {
            statusCode: 0, // -1:加载失败 0:加载中 1:加载成功
            errorMsg: '',
            leaveTypes: [],
            selectedLeaveType: [],
            reason: '',
            startTime: '',
            endTime: ''
        };
    },
    render: function() {
        var code = this.state.statusCode;
        if(code == -1) {
            return this.renderErrorView();
        }else if(code == 0) {
            return this.renderLoadingView();
        }else if(code == 1) {
            return (
                <View style={styles.container}>
                    <View style={styles.linearTitle}>
                        <Image source={require('./images/ic_apply_for_leave_type.png')} style={styles.smallIcon} />
                        <Text style={styles.titleText}>类型</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={[styles.textInputView, styles.height45]}>
                        <TextInput value={this.state.selectedLeaveType.name} editable={false} placeholder='选择请假类型' underlineColorAndroid='transparent' style={[styles.textInput, styles.height40]} />
                        <TouchableOpacity onPress={this.selectType.bind(this, this.state.leaveTypes)} activityOpacity={0.9}>
                            <Image source={require('./images/ic_list.png')} style={styles.iconImageStyle} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.linearTitle, styles.marginTop15]}>
                        <Image source={require('./images/ic_apply_for_leave_reason.png')} style={styles.smallIcon} />
                        <Text style={styles.titleText}>请假原因</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={[styles.textInputView, styles.height105]}>
                        <TextInput value={this.state.reason} onChange={(text) => {this.setState({reason: text})}} multiline={true} placeholder='填写请假原因' underlineColorAndroid='transparent' style={[styles.textInput, styles.height100]} />
                    </View>
                    <View style={[styles.linearTitle, styles.marginTop15]}>
                        <Image source={require('./images/ic_apply_for_leave_time.png')} style={styles.smallIcon} />
                        <Text style={styles.titleText}>请假时间</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={[styles.textInputView, styles.height45]}>
                        <TextInput value={this.state.startTime} editable={false} multiline={true} placeholder='选择开始时间' underlineColorAndroid='transparent' style={[styles.textInput, styles.height40]} />
                        <TouchableOpacity onPress={this.selectDate.bind(this, true)} activityOpacity={0.9}>
                            <Image source={require('./images/ic_calendar.png')} style={styles.iconImageStyle} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.textInputView, styles.height45, styles.marginTop5]}>
                        <TextInput value={this.state.endTime} editable={false} multiline={true} placeholder='选择结束时间' underlineColorAndroid='transparent' style={[styles.textInput, styles.height40]} />
                        <TouchableOpacity onPress={this.selectDate.bind(this, false)} activityOpacity={0.9}>
                            <Image source={require('./images/ic_calendar.png')} style={styles.iconImageStyle} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity activityOpacity={0.9} onPress={this.handleSubmit}>
                        <View style={[styles.marginTop15, styles.btnContainer]}>
                            <Text style={styles.btnText}>提交</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
    },
    //获取请假类型
    getLeaveType: function() {
        AsyncStorage.getItem('access_token').then((accessToken) => {
            fetch(GET_TYPE_URL, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
            }).then((response) => response.json())
                .then((responseData) => {
//                    ToastAndroid.show(JSON.stringify(responseData), ToastAndroid.SHORT);
                    var code = responseData.status;
                    if(code == 10001) {
                        var typeArray = responseData.data.list;
                        var typeStr = '';
                        var types = [];
                        for(var index in typeArray) {
                            var id = typeArray[index].id.toString();
                            var name = typeArray[index].name.toString();
                            types.push({name: name, id: id});
                        }
                        this.setState({statusCode: 1, leaveTypes: types});
                    }else{
                        this.setState({statusCode: -1});
                    }
                })
                .catch((e) => {
                    this.setState({statusCode: -1, errorMsg: e.toString()});
                })
        });
    },
    renderLoadingView: function() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>加载中...</Text>
            </View>
        );
    },
    renderErrorView: function() {
        return (
            <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} activityOpacity={0.9}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>{errorMsg}</Text>
                    <Text>{'点击这里重新加载'}</Text>
                </View>
            </TouchableOpacity>
        );
    },
    componentDidMount: function() {
        this.getLeaveType();
    },
    //选择请假类型，types为请假类型的数组
    selectType: function() {
        var self = this;
        var types = [];
        var arr = this.state.leaveTypes;
        for(var index in arr) {
            types.push(arr[index].name);
        }
        var SelectListAndroid = require('./js/SelectListAndroid');
        SelectListAndroid.showList("请选择请假类型", types, function(selectedItem) {
            for(var index in arr) {
                var name = arr[index].name;
                if(name == selectedItem) {
                    self.setState({selectedLeaveType: arr[index]});
//                    ToastAndroid.show(JSON.stringify(arr[index]), ToastAndroid.SHORT);
                }
            }
        });
    },
    //选择日期
    selectDate: function(isStartTime) {
//        ToastAndroid.show('select date', ToastAndroid.SHORT);
        var DateAndroid = require('./DateAndroid');
        var self = this;
        DateAndroid.showDatepicker(function() {}, function(year, month, day) {
            var dateStr = year + '-' + (month + 1) + '-' + day;
            if(isStartTime) {
                self.setState({startTime: dateStr});
            }else{
                self.setState({endTime: dateStr});
            }
        });
    },
    handleSubmit: function() {
        var selectedLeaveType = this.state.selectedLeaveType;
        var typeId = -1;
        if(selectedLeaveType.length == 0) {
            ToastAndroid.show('请选择类型', ToastAndroid.SHORT);
            return ;
        }
        typeId = selectedLeaveType.id;
//        if(this.state.reason == '') {
//            ToastAndroid.show('请填写请假原因', ToastAndroid.SHORT);
//            return ;
//        }

        ToastAndroid.show('reason = ' + this.state.reason, ToastAndroid.SHORT);
    },
});

const styles = {
	container: {
		flex: 1,
        padding: 10,
        backgroundColor: '#ececec',
	},
    linearTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 25,
        marginBottom: 2,
    },
    titleText: {
        flex: 1,
        textAlign: 'left',
        fontSize: 13,
        marginLeft: 3,
    },
    picker: {
        flex: 1,
    },
    smallIcon: {
        width: 20,
        height: 20,
    },
    textInputView: {
        backgroundColor: '#ffffff',
        marginTop: 5,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        color: '#000000',
        marginLeft: 5,
        marginRight: 5,
        flex: 1,
    },
    height40: {
        height: 40,
    },
    height45: {
        height: 45,
    },
    height100: {
        height: 100,
    },
    height105: {
        height: 105,
    },
    marginTop15: {
        marginTop: 15,
    },
    marginTop5: {
        marginTop: 5,
    },
    iconImageStyle: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    divider: {
        height: 1 / PixelRatio.get(),
        backgroundColor: '#000000'
    },
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        backgroundColor: '#6699ff',
        borderRadius: 6,
    },
    btnText: {
        fontSize: 15,
        color: '#FFFFFF',
    }
};

module.exports = CreateApplyForLeave;