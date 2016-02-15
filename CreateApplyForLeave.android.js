/**
新建请假申请
*/
'use strict';

import React, {
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
            errorMsg: ''
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
                        <TextInput editable={false} placeholder='选择请假类型' underlineColorAndroid='transparent' style={[styles.textInput, styles.height40]} />
                        <TouchableOpacity onPress={selectType} activityOpacity={0.9}>
                            <Image source={require('./images/ic_list.png')} style={styles.iconImageStyle} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.linearTitle, styles.marginTop15]}>
                        <Image source={require('./images/ic_apply_for_leave_reason.png')} style={styles.smallIcon} />
                        <Text style={styles.titleText}>请假原因</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={[styles.textInputView, styles.height105]}>
                        <TextInput multiline={true} placeholder='填写请假原因' underlineColorAndroid='transparent' style={[styles.textInput, styles.height100]} />
                    </View>
                    <View style={[styles.linearTitle, styles.marginTop15]}>
                        <Image source={require('./images/ic_apply_for_leave_time.png')} style={styles.smallIcon} />
                        <Text style={styles.titleText}>请假时间</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={[styles.textInputView, styles.height45]}>
                        <TextInput editable={false} multiline={true} placeholder='选择开始时间' underlineColorAndroid='transparent' style={[styles.textInput, styles.height40]} />
                        <TouchableOpacity onPress={selectDate} activityOpacity={0.9}>
                            <Image source={require('./images/ic_calendar.png')} style={styles.iconImageStyle} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.textInputView, styles.height45, styles.marginTop5]}>
                        <TextInput editable={false} multiline={true} placeholder='选择结束时间' underlineColorAndroid='transparent' style={[styles.textInput, styles.height40]} />
                        <TouchableOpacity onPress={selectDate} activityOpacity={0.9}>
                            <Image source={require('./images/ic_calendar.png')} style={styles.iconImageStyle} />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    },
    getLeaveType: function() {
        AsyncStorage.getItem('access_token').then((accessToken) => {
            fetch(GET_TYPE_URL, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
            }).then((response) => response.json())
                .then((responseData) => {
                    var code = responseData.status;
                    if(code == 10001) {
                        //ToastAndroid.show(JSON.stringify(responseData.data.list), ToastAndroid.SHORT);
                        var typeArray = responseData.data.list;
                        var typeStr = '';
                        for(var obj in typeArray) {
                            typeStr += typeArray[obj].name + ' ';
                        }
                        ToastAndroid.show(typeStr, ToastAndroid.SHORT);
                        this.setState({statusCode: 1});
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
                <Text>加载中，请稍等...</Text>
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
    }
});

function selectType() {
    var SelectListAndroid = require('./js/SelectListAndroid');
    var jsonArrayStr = "['hello1', 'hello2', 'hello3']";
    SelectListAndroid.showList("请选择请假类型", jsonArrayStr, function(selectedItem) {
        ToastAndroid.show(selectedItem, ToastAndroid.SHORT);
    });
    // ToastAndroid.show('select type', ToastAndroid.SHORT);
}

function selectDate() {
    // ToastAndroid.show('select date', ToastAndroid.SHORT);
    var DateAndroid = require('./DateAndroid');
    DateAndroid.showDatepicker(function() {}, function(hour, minute) {
        ToastAndroid.show(hour + ":" + minute, ToastAndroid.SHORT);
    });
}

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
    }
};

module.exports = CreateApplyForLeave;