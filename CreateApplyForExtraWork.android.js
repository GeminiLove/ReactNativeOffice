/**
新建请假申请
*/
'use strict';

import React, {
    View,
    Text,
    PixelRatio,
    Image,
    AsyncStorage,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';

var CreateApplyForExtraWork = React.createClass({
    getInitialState: function() {
        return {
            selectedExtraWorkType: '',
            startTime: '',
            endTime: ''
        };
    },
    render: function() {
        return (
            <View style={styles.container}>
                <View style={styles.linearTitle}>
                    <Image source={require('./images/ic_apply_for_leave_type.png')} style={styles.smallIcon} />
                    <Text style={styles.titleText}>类型</Text>
                </View>
                <View style={styles.divider} />
                <View style={[styles.textInputView, styles.height45]}>
                    <TextInput value={this.state.selectedExtraWorkType} editable={false} placeholder='选择加班类型' underlineColorAndroid='transparent' style={[styles.textInput, styles.height40]} />
                    <TouchableOpacity onPress={this.selectType} activityOpacity={0.9}>
                        <Image source={require('./images/ic_list.png')} style={styles.iconImageStyle} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.linearTitle, styles.marginTop15]}>
                    <Image source={require('./images/ic_apply_for_extra_work_title.png')} style={styles.smallIcon} />
                    <Text style={styles.titleText}>标题</Text>
                </View>
                <View style={styles.divider} />
                <View style={[styles.textInputView, styles.height45]}>
                    <TextInput placeholder='输入标题' underlineColorAndroid='transparent' style={[styles.textInput, styles.height40]} />
                </View>
                <View style={[styles.linearTitle, styles.marginTop15]}>
                    <Image source={require('./images/ic_apply_for_leave_reason.png')} style={styles.smallIcon} />
                    <Text style={styles.titleText}>加班原因</Text>
                </View>
                <View style={styles.divider} />
                <View style={[styles.textInputView, styles.height105]}>
                    <TextInput placeholder='填写加班原因' multiline={true} underlineColorAndroid='transparent' style={[styles.textInput, styles.height100]} />
                </View>
                <View style={[styles.linearTitle, styles.marginTop15]}>
                    <Image source={require('./images/ic_apply_for_leave_time.png')} style={styles.smallIcon} />
                    <Text style={styles.titleText}>加班时间</Text>
                </View>
                <View style={styles.divider} />
                <View style={[styles.textInputView, styles.height45]}>
                    <TextInput value={this.state.startTime} multiline={true} placeholder='选择开始时间' underlineColorAndroid='transparent' style={[styles.textInput, styles.height40]} />
                    <TouchableOpacity onPress={this.selectDate.bind(this, true)} activityOpacity={0.9}>
                        <Image source={require('./images/ic_calendar.png')} style={styles.iconImageStyle} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.textInputView, styles.height45, styles.marginTop5]}>
                    <TextInput value={this.state.endTime} multiline={true} placeholder='选择结束时间' underlineColorAndroid='transparent' style={[styles.textInput, styles.height40]} />
                    <TouchableOpacity onPress={this.selectDate.bind(this, false)} activityOpacity={0.9}>
                        <Image source={require('./images/ic_calendar.png')} style={styles.iconImageStyle} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity activityOpacity={0.9}>
                    <View style={[styles.marginTop15, styles.btnContainer]}>
                        <Text style={styles.btnText}>提交</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    },
    //选择加班类型
    selectType: function() {
        var self = this;
        var SelectListAndroid = require('./js/SelectListAndroid');
        var types = ['工作日加班', '双休日加班', '法定节假日加班', '其他'];
        SelectListAndroid.showList('请选择加班类型', types, function(selectedItem) {
            self.setState({selectedExtraWorkType: selectedItem});
        });
    },
    //选择时间
    selectDate: function(isStartTime) {
        var self = this;
        var DateAndroid = require('./DateAndroid');
        DateAndroid.showDatepicker(function() {}, function(year, month, day) {
            var dateStr = year + '-' + (month + 1) + '-' + day;
            if(isStartTime) {
                self.setState({startTime: dateStr});
            }else{
                self.setState({endTime: dateStr});
            }
        });
    }
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
        marginLeft: 5,
        marginRight: 5,
        flex: 1,
        color: '#000000',
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
    divider: {
        height: 1 / PixelRatio.get(),
        backgroundColor: '#000000'
    },
    iconImageStyle: {
        width: 30,
        height: 30,
        marginRight: 10,
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

module.exports = CreateApplyForExtraWork;