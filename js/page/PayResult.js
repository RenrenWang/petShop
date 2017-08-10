import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions
} from 'react-native';


import _ from 'lodash';
import  StyleConfig  from '../base/StyleConfig'
import NavBar from '../components/NavBar'
const {width, height} = Dimensions.get('window');
export default class PayM extends Component {
 
  _paym(){
   //console.log(Alipay);
  //  Alipay.pay("signed pay info string").then(function(data){
  //                   console.log(data);
  //                   alert(JSON.stringify(data));
  //               }, function (err) {
  //                   console.log(err);
  //                    alert(JSON.stringify(err));
  //               });
  }
 render() {
    return (
      <View style={{flex:1,backgroundColor:"#fff"}}>
         <NavBar
                    title={"支付结果"}
                    navBarbgColor={StyleConfig.colors.mainColor}
                    navBarLeft={true}
                    navBarLeftAction={() => this.props.navigation.goBack()}

                />
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:20}}>{this.props.navigation.state.params.result}</Text>
              {/* <TouchableOpacity
                      activeOpacity={0.8}
                      style={{ marginTop: 25, borderRadius: 5, width: width - 20, backgroundColor:StyleConfig.colors.mainColor, height: 45, alignItems: 'center', justifyContent: 'center' }}
                     // onPress={this.login.bind(this)}
                  >
                      <Text style={{ color: "#fff", fontSize: 16 }} >查看订单</Text>
            </TouchableOpacity>  */}
        </View>
      </View>
    
    );
  }
}




