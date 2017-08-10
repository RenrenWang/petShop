import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    Dimensions,
    Alert,
    TouchableOpacity
} from 'react-native'
import _ from 'lodash';
import StyleConfig from '../base/StyleConfig'
import Config from '../config'
const {width, height} = Dimensions.get('window');
export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.placeholderEmail="邮箱"
        this.placeholderPhoneNumber= "手机号",
         this.placeholderUsename = "邮箱/手机号用户名";
        this.placeholderPassword = "密码";
        this.state = {
            username: null,
            password: null,
            phoneNumber: null,
            email:null
        }
    }
    register() {
        //   if (!this.state.email||!(new RegExp(Config.Regs.isEmail).test(this.state.email))) {
        //     return Alert.alert(
        //         '',
        //         '邮箱有误',
        //         [
        //             // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        //             // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        //             { text: '确定', onPress: () => console.log('OK Pressed') },
        //         ],
        //         { cancelable: false }
        //     );
        // }
       
        // if (!this.state.phoneNumber ||!_.isNumber(parseInt(this.state.phoneNumber))||this.state.phoneNumber.length!=11) {
        //     return Alert.alert(
        //         '',
        //         '手机号有误',
        //         [
        //             // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        //             // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        //             { text: '确定', onPress: () => console.log('OK Pressed') },
        //         ],
        //         { cancelable: false }
        //     );
        // }
        if (!this.state.username) {
            return Alert.alert(
                '',
                '账号不能为空',
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
        }
        if (!this.state.password || this.state.password == "") {
            return Alert.alert(
                '',
                '密码不能为空',
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
        }

        fetch(Config.REGISTER+'&userLogin='+this.state.username +'&userLoginPwd='+this.state.password)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.result == "fail") {
                    Alert.alert(
                        '',
                        responseJson.msg,
                        [
                            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            { text: '确定', onPress: () => console.log("fail") },
                        ],
                        { cancelable: false }
                    );

                } else if (responseJson.result == "success") {
                    this.setState({
                        username: null,
                        password: null,
                        phoneNumber: null,
                        email:null
                    })
                    Alert.alert(
                        '',
                        "注册成功",
                        [
                            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            { text: '确定', onPress: () => this.props.navigation.goBack() },
                        ],
                        { cancelable: false }

                    )
                }
            });



        //;
    }
    toUrl() {

        this.props.navigation.navigate('Register');
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#fff" }}>


                <View style={{ marginTop: 10 }}>
                    {/*<View style={{flexDirection:'row'}}>
                      <TextInput
                        underlineColorAndroid='transparent'
                        style={{ marginVertical: 5, borderColor: "#dcdcdc", borderWidth: 1, color: "#999", backgroundColor: '#fff', width: width - 15, height: 45, borderBottomColor: "#dcdcdc", borderBottomWidth: 1 }}
                        onChangeText={(email) => this.setState({ email:_.trim(email) })}
                        value={this.state.email}
                        placeholder={this.placeholderEmail}

                       />
                      <Text style={{ color: "#999",fontSize:14}}></Text>
                    </View>
                  <TextInput
                        underlineColorAndroid='transparent'
                        style={{ marginVertical: 5, borderColor: "#dcdcdc", borderWidth: 1, color: "#999", backgroundColor: '#fff', width: width - 15, height: 50, borderBottomColor: "#dcdcdc", borderBottomWidth: 1 }}
                        onChangeText={(phoneNumber) => this.setState({  phoneNumber:_.trim(phoneNumber) })}
                        value={this.state.phoneNumber}
                        placeholder={this.placeholderPhoneNumber}

                    />*/}
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={{ marginVertical: 5, borderColor: "#dcdcdc", borderWidth: 1, color: "#999", backgroundColor: '#fff', width: width - 15, height: 50, borderBottomColor: "#dcdcdc", borderBottomWidth: 1 }}
                        onChangeText={(username) => this.setState({ username:_.trim(username) })}
                        value={this.state.username}
                        placeholder={this.placeholderUsename}
                            selectionColor={"#999"} 
                    />


                    <TextInput
                        underlineColorAndroid='transparent'
                        style={{ marginVertical: 5, color: "#999", borderColor: "#dcdcdc", borderWidth: 1, backgroundColor: '#fff', width: width - 15, height: 50, }}
                        onChangeText={(password) => this.setState({ password:_.trim(password) })}
                        value={this.state.password}
                        placeholder={this.placeholderPassword}
                        secureTextEntry={true}
                         selectionColor={"#999"} 
                    />

                </View>

                <TouchableOpacity
                   activeOpacity={0.8}
                    onPress={this.register.bind(this)}
                    style={{ marginVertical: 25, borderRadius: 5, width: width - 15, backgroundColor:StyleConfig.colors.mainColor, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: "#fff", fontSize: 16 }}>注册</Text>
                </TouchableOpacity>
                <View style={{ width: width - 15, flexDirection: 'row' }}>
                    <Text>点击-注册，即表示同意</Text>
                    <Text style={{ color: StyleConfig.colors.mainColor }}>《服务条款及隐私协议》</Text>
                </View>
           
         </View>
        )
    }

}
