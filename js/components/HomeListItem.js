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
import FirstItem from './FirstItem';
import  Config from '../config'
const {width, height} = Dimensions.get('window');


export default class ListIttem extends React.PureComponent{

constructor(props){
    super(props);
}

 _onPress(id,name){ 
     return this.props.navigation.navigate("Details", {id});
   }
    render(){
          let data=this.props.item;
       
       let renderItem= this.props.index==0?<TouchableOpacity   
    activeOpacity={1}
    onPress={_.throttle(this._onPress.bind(this,this.props.item.prdIds),1000,{

    'trailing': false
  })} 
            style={{marginBottom:10,flex:1,flexDirection:'column',backgroundColor:'#fff'}}>
                 <Image   
                  resizeMode='stretch'
                  resizeMethod="resize"
                  style={{width,height:130}}
                  //source={require('../static/images/first1.png')}
                 source={{uri:Config.BASEURLIMG+data.prdNuri}}
                  />
                 <View style={{paddingBottom:10,flexDirection:'column',flex:1,justifyContent:'space-between',width,paddingHorizontal:15}}>
                    <View style={{flexDirection:'column',marginTop:10}}>
                        <Text numberOfLines={1} style={{fontSize:StyleConfig.fontSize.size_16,color:StyleConfig.colors.defaultFontColor}}>{data.prdName}</Text>
                        <Text numberOfLines={2} style={{lineHeight:25,fontSize:StyleConfig.fontSize.size_14,color:StyleConfig.colors.dText}}>{data.prdText}</Text>
                    </View>
                     {/*<View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                              <Image style={{height:20,width:20,marginRight:5,marginBottom:10,tintColor:StyleConfig.colors.mainColor}} source={require('../static/images/loveClick.png')}/>
                              <Text style={{fontSize:StyleConfig.fontSize.size_14,color:StyleConfig.colors.mainColor}}>{data.collCount}人收藏</Text>
                      </View>*/}
                      
                 </View>
            </TouchableOpacity>:<View
            style={{paddingVertical:5,paddingHorizontal:10,flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#fff'}}>
                 {/*<Image  
                  
                  resizeMethod="resize"
           style={{width:180*(width/720),height:180*(width/720)}} source={require('../static/images/goods2.png')}/>*/}
                 <Image  
                  
                  resizeMethod="resize"
           style={{width:180*(width/720),height:180*(width/720)}} source={{uri:Config.BASEURLIMG+data.prdUri}}/>
                 <View style={{marginLeft:10,flexDirection:'column',flex:1,justifyContent:'space-between'}}>
                    <View style={{flexDirection:'column',}}>
                         <Text numberOfLines={1} style={{fontSize:StyleConfig.fontSize.size_16,color:StyleConfig.colors.defaultFontColor}}>{data.prdName}</Text>
                        <Text numberOfLines={2} style={{lineHeight:25,fontSize:StyleConfig.fontSize.size_14,color:StyleConfig.colors.dText}}>{data.prdText}</Text>
                    </View>
                    
                     <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                              {/*<Image style={{height:20,width:20,marginRight:5,tintColor:StyleConfig.colors.mainColor}} source={require('../static/images/love.png')}/>
                              <Text style={{fontSize:StyleConfig.fontSize.size_14,color:StyleConfig.colors.mainColor}}>{data.collCount}人收藏</Text>*/}
                        <Text style={{fontSize:StyleConfig.fontSize.size_18,color:StyleConfig.colors.mainColor}}>￥{data.prdZkprice}</Text> 
                                <TouchableOpacity
                    activeOpacity={1}
                      onPress={_.throttle(this._onPress.bind(this,this.props.item.prdIds),1000,{

    'trailing': false
  })}
                    style={{alignSelf:'flex-end',borderRadius:5,height:30,width:80,backgroundColor:StyleConfig.colors.mainColor,justifyContent:'center',alignItems:'center'}}
                  >
                    <Text style={{color:'#fff'}}>购买</Text>
                  </TouchableOpacity>
                      </View>
                      
                 </View>
            </View>;
        return  <View>
            {renderItem}
        </View>
    }
}