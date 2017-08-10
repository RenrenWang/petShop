import React, {PureComponent } from 'react';
import {

  StyleSheet,
  Text,
  View,

  Image,
  Dimensions,


  TouchableOpacity,

   Platform,

} from 'react-native';
import _ from 'lodash';
import  StyleConfig  from '../base/StyleConfig'
import  Config from '../config'
const {width,height} = Dimensions.get('window');

export default class ListTWoRow extends React.PureComponent{

   _onPress(id,name){ 
     return this.props.navigation.navigate("Details", {id});
   }
 render(){
  let data=this.props.item;
 return(
        
                 <TouchableOpacity   
    activeOpacity={1}
    onPress={_.throttle(this._onPress.bind(this,data.prdIds),1000,{

    'trailing': false
  })} style={{width:width/2-15,marginHorizontal:5,flexDirection:'column',marginVertical:5,backgroundColor:StyleConfig.colors.bgColor,alignItems:'center',backgroundColor:this.props.listItemBgColor?this.props.listItemBgColor:'#fff'}}>
                           <Image
                               style={{height:width/2-15,width:width/2-15,paddingHorizontal:5}} 
                               source={{uri:Config.BASEURL+data.prdUri}}/>
                                     <View style={{justifyContent:'space-between',flex:1}}>

                                        <View style={{flexDirection:'column',width:(width-40)/2,paddingHorizontal:5}}>
                                            <Text numberOfLines={1} style={{marginVertical:2,fontSize:StyleConfig.fontSize.size_16,color:StyleConfig.colors.defaultFontColor}}>{data.prdName}</Text>
                                            <Text numberOfLines={2} style={{fontSize:StyleConfig.fontSize.size_13,color:StyleConfig.colors.hColor}}>{data.prdText}</Text>
                                        </View>
                                        <View style={{width:(width-40)/2,padding:3,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                              <Text style={{fontSize:StyleConfig.fontSize.size_18,color:StyleConfig.colors.mainColor}}>￥{data.prdZkprice}</Text> 
                                             {this.props.classId?<Text style={{fontSize:StyleConfig.fontSize.size_12,color:StyleConfig.colors.hColor}}>{data.ordCount}人预定</Text>:null} 
                                             {!this.props.classId?<Image resizeMode="contain" style={{height:25,width:30}} source={{uri:Config.BASEURL+data.brandLogouri}}/>:null}
                                        </View>
                                     </View>
                    </TouchableOpacity>
            

      )
 }
 
 }