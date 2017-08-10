import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
Button,
Image,
View,
Dimensions,
ScrollView,
Text,
TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import  StyleConfig  from '../base/StyleConfig'

import  Config from '../config'
import HomeHeader from '../components/HomeHeader'
import Loading from '../components/Loading'
import HTMLView from 'react-native-htmlview';
import LoadingImg from '../components/LoadingImg'
const {width, height} = Dimensions.get('window');
export default class SpecialOffer extends React.Component {
  static navigationOptions = {
    tabBarLabel: '特价',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../static/images/specialOffer.png')}
        style={ [{tintColor: tintColor},StyleConfig.tabIcon]}
      />
    ),
  };
  constructor(props){
      super(props)
      this.state={
            meal:[],
            swiperShow:false,
          
         
            isLoading:true,
          
      }
  }
componentDidMount() {
      fetch(Config.MEALD+this.props.navigation.state.params.id)
      .then((response) => response.json())
      .then((responseJson) => {
       
        //responseJson.maxpage
         if(responseJson.result=="success"){
              //alert(JSON.stringify(responseJson.mealData));     
             this.setState({
                meal:responseJson.mealData[0],
               
                isLoading:false
            })
        
           
         }else{
              this.setState({
                meal:[],
               
                isLoading:false
            })
         }
          
      })
      .catch(err=>{
          this.setState({
              isLoading:true,
              error:"网络加载失败，请稍后重试"
          })
      })
       

    }
   addCart(){
   if(!this.props.screenProps.user)
      return Alert.alert(
                '提示',
                '未登录，请先登录',
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
        ); 
      fetch(Config.ADDCART+this.props.screenProps.user.pinfoId+'&prdNums=1&prdIds='+this.props.navigation.state.params.id)//
      .then((response) => response.json())
      .then((responseJson) => {
     alert(JSON.stringify(responseJson));
        //responseJson.maxpage
         if(responseJson.result=="success"){
            //  let Clist=responseJson.data;
            //  Clist.map((item,index)=>{
            //      Clist[index]['checked']=false
            //  });
            //  alert(JSON.stringify(Clist))
            //  this.setState({
            //     list:Clist
            // })
             this.refs.toast.show('商品已加入购物车~~',DURATION.LENGTH_LONG);
              DeviceEventEmitter.emit('cartChange', "商品加入购物车");
         }
          
      })
    }
     renderBottom(){
        return( <View style={{backgroundColor:"#fff",flexDirection:'row',height:50,borderTopColor:StyleConfig.colors.lineColor,borderTopWidth:1}}>
                 
                
                  <TouchableOpacity   
                        activeOpacity={1}
                       // onPress={_.throttle(this._onPress.bind(this,data.prdIds),1000,{

                        //'trailing': false
                  //  })}
                    style={{height:50,flex:1,alignItems:'center',justifyContent:'center',borderRightWidth:1,borderRightColor:StyleConfig.colors.lineColor}}
                    >
                    <Image
                   source={require('../static/images/newsD.png')}
                    style={{ tintColor:StyleConfig.colors.hColor, height:25,
                    width:25 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity   
                        activeOpacity={1}
                       // onPress={_.throttle(this._onPress.bind(this,data.prdIds),1000,{

                        //'trailing': false
                  //  })}
                    style={{height:50,flex:1,alignItems:'center',justifyContent:'center',borderRightWidth:1,borderRightColor:StyleConfig.colors.lineColor}}
                    >
                    <Image
                   source={require('../static/images/star.png')}
                    style={{ tintColor:StyleConfig.colors.hColor,  height:25,
                    width:25 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity   
                   activeOpacity={1}
                    onPress={()=>this.props.navigation.navigate("Cart")}
                    style={{height:50,flex:1,alignItems:'center',justifyContent:'center',borderRightWidth:1,borderRightColor:StyleConfig.colors.lineColor}}
                    >
                    <Image
                   source={require('../static/images/cart.png')}
                    style={{  height:25,
                    width:25 }}
                  />
                  {/*<Text style={{background:StyleConfig.colors.mainColor}}>0</Text>*/}
                </TouchableOpacity>
               <TouchableOpacity   
                        activeOpacity={1}
                       // onPress={_.throttle(this._onPress.bind(this,data.prdIds),1000,{

                        //'trailing': false
                  //  })}
                    onPress={this.addCart.bind(this)}
                    style={{height:50,width:width/4,alignItems:'center',justifyContent:'center'}}
                    >
                    <Text style={{color:StyleConfig.colors.mainColor,fontSize:StyleConfig.fontSize.size_14}}>加入购物车</Text>
                </TouchableOpacity>
                 <TouchableOpacity   
                        activeOpacity={1}
                        onPress={_.throttle(this.toOrder.bind(this,this.state.meal.gcollIds),1000,{

                      'trailing': false
                    })}
                    style={{height:50,width:width/4,backgroundColor:StyleConfig.colors.mainColor,alignItems:'center',justifyContent:'center'}}
                    >
                    <Text style={{color:"#fff",fontSize:StyleConfig.fontSize.size_14}}>立即购买</Text>
                </TouchableOpacity>

              </View>)
    }

    toOrder(id){
      if(!this.props.screenProps.user)
      return Alert.alert(
                '提示',
                '未登录，请先登录',
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
        );
       return this.props.navigation.navigate("Order", {prdIdsList:[id],prdNumsList:[this.state.numberGoods]});
    }
  
  render() {
    return !this.state.isLoading?<View style={{flex:1,flexDirection:'column',backgroundColor:'#fff'}}>
           
{/*       
            <MyListView
            swipeEnabled={true}
            renderHeader={this.renderSwiper.bind(this)}
            animationEnabled={true}
            removeClippedSubviews={false}
            url={Config.HOMEGOODS}
            navigation={this.props.navigation}
            typeItem={"TC"}
            />*/}
          <View style={{flex:1,flexDirection:'column',justifyContent:'space-between'}}>
           
           <ScrollView 
              horizontal={false}
             style={{flex:1,flexDirection:'column'}}>
            {/*{this.renderSwiper()}
            <View style={{backgroundColor:'#fff',flexDirection:'row',paddingHorizontal:10,height:45,alignItems:'center',justifyContent:'space-between'}}>
                  
                 
            </View>*/}
                
                  {/*<Image  
                    resizeMode="stretch"
                    resizeMethod="scale"
                    style={{height:300,width}}   source={{uri:Config.BASEURL+item.gcollImgnuri}}/>*/}
                
              {this.state.meal.gcollImgnuri?<HTMLView
               style={{justifyContent:'center',alignItems:'center'}}
               value={'<img src="'+Config.BASEURL+this.state.meal.gcollImgnuri+'"  style="width:100%"/>'}
              />:null}
         
             
           </ScrollView>
           {this.renderBottom()}
       </View>
       </View>:<Loading/>
  }
}