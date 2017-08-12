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
import  Config from '../config'
const {width,height} = Dimensions.get('window');

export default class ListIttem extends React.PureComponent{
   constructor(props) {
      super(props);
    
   }

  _onPress(id,name){ 
     return this.props.navigation.navigate("Details", {id});
   }
  render(){
    return (
     <TouchableOpacity   
    activeOpacity={1}
  
    style={{marginTop:10,flex:1,flexDirection:'row',paddingVertical:5,paddingHorizontal:10,backgroundColor:'#fff'}}
   >
     <View  style={{flex:1,flexDirection:'row'}}>
      <Image   
      resizeMethod="resize"
                  style={{width:this.props.typeItem=="TC"?200*(width/720):180*(width/720),height:this.props.typeItem=="TC"?250*(width/720):180*(width/720)}}
                  //source={require('../static/images/first1.png')}
                  source={{uri:Config.BASEURL+this.props.item.prdUri}}
                  />
       
         {/* <Image  
                  
           resizeMethod="resize"
           style={{height:120,width:100}} source={{uri:Config.BASEURL+this.props.item.prdUri}}/> */}
          <View style={{flex:1,marginLeft:10,flexDirection:'column',justifyContent:'space-between'}}>
              <View style={{flexDirection:'column'}}>
                 <Text  numberOfLines={1} style={{color:StyleConfig.colors.hColor}}>{this.props.item.prdName}</Text>
                <Text   numberOfLines={2} style={{color:StyleConfig.colors.defaultFontColor,fontSize:StyleConfig.fontSize.size_16}}>{this.props.index}{this.props.item.prdText}</Text>
              </View>
              <View style={{flexDirection:this.props.typeItem!="TC"?'column':"row",justifyContent:'space-between'}}>
                  <View style={{marginTop:10,flexDirection:this.props.typeItem!="TC"?'row':"column"}}>
                      <View style={{flexDirection:'row',alignItems:'center'}}> 
                          <Text style={{fontSize:StyleConfig.fontSize.size_12}}>特价：</Text>
                          <Text style={{fontSize:StyleConfig.fontSize.size_18,color:StyleConfig.colors.mainColor}}>￥{this.props.item.prdZkprice}</Text>
                      </View>
                      <View style={{flexDirection:'row',alignItems:'center'}}> 
                          <Text style={{marginLeft:this.props.typeItem!="TC"?15:0,color:StyleConfig.colors.hColor,fontSize:StyleConfig.fontSize.size_12}}>原价：</Text>
                          <Text style={{textDecorationLine:'line-through',color:StyleConfig.colors.hColor,fontSize:StyleConfig.fontSize.size_14}}>￥{this.props.item.prdOldprice}</Text>
                      </View>
                  </View>
                
                <TouchableOpacity
                    activeOpacity={1}
                      onPress={_.throttle(this._onPress.bind(this,this.props.item.prdIds),1000,{

    'trailing': false
  })}
                    style={{alignSelf:'flex-end',borderRadius:5,height:30,width:80,backgroundColor:StyleConfig.colors.mainColor,justifyContent:'center',alignItems:'center'}}
                  >
                    <Text style={{color:'#fff'}}>{this.props.typeItem==="TC"?"查看详情":"立即抢购"}</Text>
                  </TouchableOpacity>
              </View>
              
          </View>
      </View>
     
      </TouchableOpacity>
    )
  }
}