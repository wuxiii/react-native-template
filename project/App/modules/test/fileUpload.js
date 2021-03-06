'use strict';

const React = require('react');const ReactNative = require('react-native');
const FileUpload = require('NativeModules').FileUpload;
const Des = require('@remobile/react-native-des');
const KEY = CONSTANTS.DES_KEY;

const {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = ReactNative;

module.exports = React.createClass({
    componentDidMount: function () {
        const obj = {
            uploadUrl: app.route.ROUTE_UPDATE_FILE,
            method: 'POST', // default 'POST',support 'POST' and 'PUT'
            headers: {
                'Accept': 'application/json',
            },
            files: [
                {
                    name: 'file', // optional, if none then `filename` is used instead
                    filename: '1.png', // require, file name
                    filepath: '/Users/ghg/Desktop/1.png', // require, file absoluete path
                    filetype: 'image/png', // options, if none, will get mimetype from `filepath` extension
                },
                {
                    name: 'file', // optional, if none then `filename` is used instead
                    filename: '2.png', // require, file name
                    filepath: '/Users/ghg/Desktop/2.png', // require, file absoluete path
                    filetype: 'image/png', // options, if none, will get mimetype from `filepath` extension
                },
            ],
        };
        FileUpload.upload(obj, function (err, result) {
            console.log('upload:', obj, err, result);
            const base64 = result.data;
            Des.decrypt(base64, KEY, function (jsonString) {
                let json = {};
                try {
                    json = JSON.parse(jsonString);
                } catch (error) {
                    Toast('数据解析错误');
                }
                console.log('recv:', json);
            }, function () {
                Toast('数据解密错误');
            });
        });
    },
    render: function () {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
