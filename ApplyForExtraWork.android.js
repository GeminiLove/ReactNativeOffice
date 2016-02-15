'use strict';

import React, {
    AppRegistry,
    Component,
    View,
    Text,
    ListView,
    PixelRatio,
    Image,
    TouchableOpacity,
    AsyncStorage,
    ToastAndroid
} from 'react-native';

var REQUEST_URL = "http://api.listome.com/v1/companies/users/overtime";

var ApplyForExtraWorkList = React.createClass({
    getInitialState: function() {
        return {
            loadState: -1,  // -1: loading, 0: error, 1: success  
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            error: ''
        };
    },
    render: function() {
        if(this.state.loadState == -1) {
            return this.renderLoadingView();
        }else if(this.state.loadState == 0) {
            return this.renderErrorView();
        }
        return (
        	<ListView 
                dataSource={this.state.dataSource}
                renderRow={this.renderListItem}
                stlye={styles.listView} />
        );
    },
    componentDidMount: function() {
        AsyncStorage.getItem('access_token')
            .then((value) => {
                this.fetchData(value);        
            });
    },
    fetchData: function(accessToken) {
        fetch(REQUEST_URL, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                var status = responseData.status;
                if(status == 10001) {
                    this.setState({
                        loadState: 1,
                        dataSource: this.state.dataSource.cloneWithRows(responseData.data.list)
                    });
                }else{
                    this.setState({loadState: 0});
                }
            })
            .catch((e) => {
                this.setState({loadState: 0, error: e.text()});
            });

    },
    renderLoadingView: function() {
        return (
            <View style={styles.container}>
                <Text>加载中...</Text>
            </View>
        );
    },
    renderErrorView: function() {
        return (
            <View style={styles.container}>
                <Text>{'load error, ' + this.state.error}</Text>
            </View>
        );
    },
    renderListItem: function(item) {
        //1:同意 0:审核 -1:拒绝
        var avatarImg = item.status == 1 ? require('./images/ic_agree.png') : 
            (item.statue == 0 ? require('./images/ic_verify.png') : require('./images/ic_disagree.png'));
        return (
            <TouchableOpacity activeOpacity={0.5}>
                <View>
                    <View style={styles.itemContainer}>
                        <Image style={styles.avatar} source={avatarImg} />
                        <View style={styles.listItem}>
                            <Text style={styles.leaveType}>{'标题：' + item.title}</Text>
                            <Text style={styles.time}>{'时间：' + this.getFormatTime(item.start_time * 1000) + '至' + this.getFormatTime(item.end_time * 1000)}</Text>
                            <Text style={styles.reason}>{'原因：' + item.reason}</Text>
                        </View>
                    </View>
                    <View style={styles.divider}/>
                </View>
            </TouchableOpacity>
        );
    },
    getFormatTime: function(time) {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var mins = date.getMinutes();
        return year + '/' + month + '/' + day + ' ' + hours + ':' + mins;
    }
});

const styles = {
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
    itemContainer: {
        flexDirection: 'row',
    },
    avatar: {
        width: 50,
        height: 50,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    listView: {

    },
    listItem: {
        
    },
    leaveType: {
        color: 'red',
        fontSize: 16,
        marginBottom: 2,
        marginTop: 10,
    },
    time: {
        color: '#000000',
        fontSize: 14,
        marginBottom: 2,
    },
    reason: {
        color: '#000000',
        fontSize: 14,
        marginBottom: 10,
    },
    divider: {
        height: 1 / PixelRatio.get(),
        backgroundColor: '#d8d8d8'
    }
};

module.exports = ApplyForExtraWorkList;