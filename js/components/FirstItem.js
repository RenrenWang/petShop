import React, {PureComponent } from 'react';
import {

  StyleSheet,
  Text,
  View,

  Image,
  Dimensions,


  TouchableOpacity,
  TouchableHighlight,
   Platform,

} from 'react-native';
import _ from 'lodash';
import  StyleConfig  from '../base/StyleConfig'
const {width, height} = Dimensions.get('window');


export default class FirstItem extends React.PureComponent{


    render(){
        return(
            <View 
            style={{flex:1,flexDirection:'row',alignItems:'center',height:this.props.itemHeight+10,paddingHorizontal:10,paddingVertical:5,backgroundColor:'#fff'}}>
                 <Image  style={{width:200*(width/StyleConfig.pixSize),height:210*(width/StyleConfig.pixSize)}} source={{uri:'https://img.alicdn.com/bao/uploaded/bao/upload/TB1wjx5RpXXXXXraXXXwu0bFXXX.png_270x270Q50s50.jpg_.webp'}}/>
                 <View style={{flexDirection:'column',flex:1,justifyContent:'space-between',width:160*(width/StyleConfig.pixSize),height:210*(width/StyleConfig.pixSize)}}>
                    <View style={{flexDirection:'column',}}>
                        <Text numberOfLines={2} style={{fontSize:StyleConfig.fontSize.size_16,color:StyleConfig.colors.defaultFontColor}}>宠物零食脆脆肉Joy原</Text>
                        <Text numberOfLines={2} style={{lineHeight:25,fontSize:StyleConfig.fontSize.size_14,color:StyleConfig.colors.dText}}>宠物零食脆脆肉Joy原味宠物零食脆脆肉Joy原味牛肉粒120g宠物零食脆脆肉Joy原味牛肉粒120g牛肉粒120g宠物零食脆脆肉Joy原味牛肉粒120g</Text>
                    </View>
                     <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                              <Image style={{height:18,width:21,marginRight:5}} source={require('../static/images/love.png')}/>
                              <Text style={{fontSize:StyleConfig.fontSize.size_14,color:StyleConfig.colors.mainColor}}>220人收藏</Text>
                      </View>
                      
                 </View>
            </View>
        )
    }
}