import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
View,
Image,
Dimensions,
Text,
TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import  StyleConfig  from '../base/StyleConfig'
const {width, height} = Dimensions.get('window');
import  Config from '../config'

export default class SetTimeItem extends React.Component {
    constructor(props){
        super(props)
    }

  _onPress(id){ 
    
     return this.props.navigation.navigate(this.props.isHome?"SetTime":"Details",{id});
   }
    render(){
     let data= this.props.item;
     let syNumber=data.prdIvnnums-data.prdNums;
     syNumber=syNumber>0?syNumber:0;
        return(
            <View  style={{marginTop:this.props.mTop?this.props.mTop:0,flexDirection:'row',backgroundColor:'#fff',justifyContent:'space-between',paddingVertical:10}}>
                  <Image  
          
           resizeMethod="resize"
           style={{width:180*(width/720),height:180*(width/720)}}  
             //source={require('../static/images/goods2.png')}
           source={{uri:Config.BASEURLIMG+data.prdUri}}
           />
                   <View style={{paddingHorizontal:10,flex:1,flexDirection:'column',justifyContent:'space-between'}}>
                         <Text numberOfLines={2} style={{textAlign:'left',fontSize:StyleConfig.fontSize.size_16,color:StyleConfig.colors.defaultFontColor}}>{data.prdName}</Text>
                         <View style={{flexDirection:'column',justifyContent:'space-between'}}>
                                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={{fontSize:StyleConfig.fontSize.size_18,color:StyleConfig.colors.mainColor}}>￥{data.prdZkprice}</Text>
                                     <TouchableOpacity   
                                            activeOpacity={1}
                                            onPress={_.throttle(this._onPress.bind(this,data.prdIds),1000,{

                                            'trailing': false
                                        })}
                                        style={{alignSelf:'flex-end',borderRadius:5,height:32,width:100,backgroundColor:StyleConfig.colors.mainColor,justifyContent:'center',alignItems:'center'}}
                                        >
                                               {this.props.isHome?<Text style={{color:'#fff'}}>马上抢</Text>:<Text style={{color:'#fff'}}>立刻购买</Text>}
                                        </TouchableOpacity>
                                       
                                </View>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    
                                       
                                   <Text style={{textDecorationLine:'line-through',color:StyleConfig.colors.hColor,fontSize:StyleConfig.fontSize.size_13}}>￥{data.prdOldprice}</Text>
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                        <Text style={{marginRight:5,color:StyleConfig.colors.hColor,fontSize:StyleConfig.fontSize.size_13,alignSelf:'flex-end'}}>仅剩{syNumber}件</Text>
                                         <View style={{borderRadius:3,height:5,width:100,backgroundColor:StyleConfig.colors.bgColor}}>
                                            <View style={{borderRadius:3,height:5,width:100*((syNumber)/data.prdIvnnums),backgroundColor:StyleConfig.colors.mainColor}}></View>
                                        </View>
                                    </View>
                                </View>
                         </View>
                   </View>
            </View>
        )
    }
}