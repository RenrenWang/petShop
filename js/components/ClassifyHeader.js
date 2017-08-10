import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
   TouchableOpacity,
    Image,
    View,
    Text,
    Dimensions,
    Platform,
    StatusBar,
    TextInput
} from 'react-native';
const STATUS_BAR_HEIGHT=30;
import _ from 'lodash';
import  StyleConfig  from '../base/StyleConfig'
const {width, height} = Dimensions.get('window');
export default class HomeHeader extends React.Component {

   constructor(props){
       super(props)
          this.placeholder="发现艾宠好物";
          this.state={
               keyCode: ""
          }
   }
   _onPress(){ 
     return this.props.navigation.navigate("Search");
   }
    selectAction(){
     this.props.chageKeyCode(this.state.keyCode);
  }
    render(){
        return(
            <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:10,height:50,backgroundColor:StyleConfig.colors.mainColor}}>
                    <StatusBar
        backgroundColor={StyleConfig.colors.mainColor}
        barStyle="light-content"
        style={{height:Platform.OS==='ios'?STATUS_BAR_HEIGHT:0}}
           /> 
           <TouchableOpacity
            activeOpacity={1}
             onPress={this.props.navBarLeftAction}
             style={{marginRight:20}}
            >
                  <Image style={{tintColor:'#fff',height:30,width:30}} source={require('../static/images/arrow.png')}/>
            </TouchableOpacity>
            {/*<TouchableOpacity
                   activeOpacity={1}
                    onPress={_.throttle(this._onPress.bind(this),1000,{

                          'trailing': false
                  })}
                   style={{paddingHorizontal:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between',flex:1,height:32,backgroundColor:'#fff',borderRadius:5}}
                  >
                 
                    <Text style={{fontSize:StyleConfig.fontSize.size_14,color:StyleConfig.colors.mainColor}}>{this.props.selectName}</Text> 
                      <Image style={{tintColor:StyleConfig.colors.mainColor,height:20,width:20}} source={require('../static/images/search.png')}/>
                  </TouchableOpacity>*/}
              <View    style={{paddingHorizontal:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between',flex:1,height:32,backgroundColor:'#fff',borderRadius:5}}
>   
                <TextInput
                            underlineColorAndroid='transparent'
                            style={{flex:1, padding: 0, paddingLeft: 10, paddingRight: 30, height: 32, backgroundColor: '#fff', borderRadius: 5 }}
                            onChangeText={(keyCode) =>this.setState({keyCode}) }
                            value={this.state.keyCode}
                            placeholder={this.props.selectName}
                            placeholderTextColor={StyleConfig.colors.mainColor}
                             selectionColor={"#999"} 
                        />
                   <TouchableOpacity
                      activeOpacity={1}
                      onPress={this.selectAction.bind(this)}
                    >   
                   <Image style={{tintColor:StyleConfig.colors.mainColor,height:20,width:20}} source={require('../static/images/search.png')}/>
                   </TouchableOpacity>
                </View> 
            </View>
        )
    }
}