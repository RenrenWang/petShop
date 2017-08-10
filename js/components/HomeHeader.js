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
         
          super(props);
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
   subChageKeyCode(keyCode){
       this.setState({ keyCode });
     
   }
    render(){
        return(
            <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:10,height:50,backgroundColor:StyleConfig.colors.mainColor}}>
                    <StatusBar
        backgroundColor={StyleConfig.colors.mainColor}
        barStyle="light-content"
           translucent={false}
        style={{height:Platform.OS==='ios'?STATUS_BAR_HEIGHT:0}}
           /> 

             <TextInput
                          
                            underlineColorAndroid='transparent'
                            style={{flex:1, padding: 0, paddingLeft: 10, paddingRight: 30, height: 32, backgroundColor: '#fff', borderRadius: 5 }}
                            onChangeText={(keyCode) =>this.subChageKeyCode(keyCode) }
                            value={this.state.keyCode}
                            placeholder={this.placeholder}
                            placeholderTextColor={StyleConfig.colors.mainColor}
                            selectionColor={"#999"} 
                        />
                  {/*<TouchableOpacity
                   activeOpacity={1}
                
                   onPress={_.throttle(this._onPress.bind(this),1000,{

                          'trailing': false
                  })}
                   style={{flexDirection:'row',alignItems:'center',flex:1,height:32,backgroundColor:'#fff',borderRadius:5}}
                  >
                  
                    <Text style={{paddingLeft:8,fontSize:StyleConfig.fontSize.size_14,color:StyleConfig.colors.mainColor}}>发现艾宠好物</Text> 
                  </TouchableOpacity> */}
                  {/*<Image style={{tintColor:StyleConfig.colors.mainColor,height:22,width:22,marginHorizontal:5}} }/>*/}
                 
                 <TouchableOpacity
                   activeOpacity={1}
                
                   onPress={this.selectAction.bind(this)}>
                  <Image style={{marginLeft:5,tintColor:'#fff',height:32,width:32}} source={require('../static/images/homeSearch.png')}/>
               </TouchableOpacity>
            </View>
        )
    }
}