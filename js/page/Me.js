import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Button,
  Image,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
    Share,
} from 'react-native';
import _ from 'lodash';
import StyleConfig from '../base/StyleConfig'

import Panel from '../components/Panel'
import LoadingImg from '../components/LoadingImg'

const {width, height} = Dimensions.get('window');
export default class Me extends React.Component {
  static navigationOptions = {
    tabBarLabel: '我的',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ focused,tintColor }) => (
      
       <Image
        source={ focused?require('../static/images/meActive.png'):require('../static/images/me.png')}
         style={{height:30,width:30}}
      />
    ),
  
  };
  constructor(props){
    super(props)
    this.state={
      isLoading:true,
      isModal:false,
      result:"" 
    }
  }


  toUrl(routerName,initialPage){
  
     if(this.props.screenProps.user){
        return this.props.navigation.navigate(routerName,{initialPage:initialPage?initialPage:null});
     } else return Alert.alert(
                '提示',
                '未登录，请先登录',
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
        ); 

   }
   componentDidMount(){

    
     this.setState({
       isLoading:false
     })
   }

   renderPayItem(data){
       return <View style={{paddingLeft:10,backgroundColor:'#fff'}}>
           <View style={{paddingRight:10,height:45,flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomColor:StyleConfig.colors.lineColor,borderBottomWidth:1}}>
                   <Text style={{paddingHorizontal:10,borderLeftWidth:3,borderLeftColor:StyleConfig.colors.mainColor,fontSize:StyleConfig.fontSize.size_16,color:StyleConfig.colors.blackColor}}>我的订单</Text>
                    <TouchableOpacity
                    activeOpacity={1}
                      onPress={_.throttle(this.toUrl.bind(this,'AllOrderForm',0),1000,{

    'trailing': false
  })}><Text style={{fontSize:StyleConfig.fontSize.size_14,}}>查看全部订单</Text></TouchableOpacity>
             </View>
             <View style={{flexDirection:'row',alignItems:"center",justifyContent:'center'}}>
               {data.map((item,index)=>{
                  return  <TouchableOpacity
                    key={index}
                    activeOpacity={1}
                    onPress={_.throttle(this.toUrl.bind(this,"AllOrderForm",index+1),1000,{

                      'trailing': false
                      })}
                      style={{flex:1,alignItems:"center",justifyContent:'center',padding:8}}
                      >
                    <Image   style={{height:35,width:35}} source={item.icon}/>
                    <Text  style={{fontSize:StyleConfig.fontSize.size_13}}>{item.name}</Text>
                    </TouchableOpacity>
                })}
           </View>
        </View>
          
       
      
   }
   renderLinkItem(data){
     return(
       <View style={{marginTop:10,backgroundColor:'#fff',paddingLeft:10}}>
            {data.map((item,index)=>{
                  return <TouchableOpacity
                  key={index}
                    activeOpacity={1}
                    onPress={_.throttle(item.action?item.action:this.toUrl.bind(this,item.routerName),1000,{

                      'trailing': false
                      })}
                      style={{borderBottomColor:StyleConfig.colors.lineColor,borderBottomWidth:1,flex:1,flexDirection:'row',alignItems:"center",paddingVertical:8}}
                      >
                    <Image   style={{height:35,width:35}} source={item.icon}/>
                    <Text>{item.name}</Text>
                    </TouchableOpacity>
              })}
       </View>
     )
   }
  _renderView(){
     return(
       <View  style={{flex:1,justifyContent:'center',alignItems:'center'}}>
         <TouchableOpacity
          activeOpacity={1}
                 //   onPress={_.throttle(this._actionCustomService.bind(this),1000,{

                  //    'trailing': false
        //  })}
          style={{borderRadius:10,width:width*0.75,height:width*0.85,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
                 <View style={{justifyContent:'center',alignItems:'center'}}>
                      <Text  numberOfLines={1} style={{color:StyleConfig.colors.defaultFontColor,fontSize:StyleConfig.fontSize.size_16}}>添加微信公众号询问</Text>
                      <Text   numberOfLines={2} style={{color:StyleConfig.colors.hColor,fontSize:StyleConfig.fontSize.size_14}}>暂时未开通客服</Text>
                 </View>
                 <Image  style={{width:width*0.75*0.8,height:width*0.75*0.8}} source={require('../static/images/ercode.png')}/>
         </TouchableOpacity>
       </View>
     )
  }
   renderCustomService(){
    return(
           <Panel 
              isModal={this.state.isModal}
              renderView={this._renderView.bind(this)}
              _animationType={"fade"}
              action={this._actionCustomService.bind(this)}
           />
      )
   }
   _actionCustomService(){
      this.setState({
          isModal:!this.state.isModal
      })
   }
  _shareText() {
    Share.share({
      message: "http://www..com/",
      url: 'http://www.com/',
      title: '艾宠'
    }, {
      dialogTitle: '分享',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ],
      tintColor: 'green'
    })
    .then(this._showResult)
    .catch((error) => this.setState({result: 'error: ' + error.message}));
  }

  _showResult(result) {
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        this.setState({result: 'shared with an activityType: ' + result.activityType});
      } else {
        this.setState({result: 'shared'});
      }
    } else if (result.action === Share.dismissedAction) {
      this.setState({result: 'dismissed'});
    }
  }
  render() {
    let user=this.props.screenProps.user;
    
    let PayList=[
      {name:"待支付",routerName:'',icon:require('../static/images/dzf.png')},
      {name:"待发货",routerName:'',icon:require('../static/images/dfh.png')},
      {name:"待评价",routerName:'',icon:require('../static/images/dpj.png')},
       {name:"预定",routerName:'',icon:require('../static/images/yd.png')},
      ];
 let LinkList=[
      {name:"我的宠物",routerName:'MyPet',icon:require('../static/images/myc.png')},
      {name:"收货地址",routerName:'ShippingAddress',icon:require('../static/images/addree.png')},
      {name:"推荐分享",routerName:'',icon:require('../static/images/link.png'),action:this._shareText.bind(this)},
      {name:"艾宠客服",routerName:'',icon:require('../static/images/msg.png'),action:this._actionCustomService.bind(this)}
      ]
    return<ScrollView 
       horizontal={false}
       style={{flex:1}}
       >
     {!this.state.isLoading?<View style={{flex:1}}>
  
   {this.renderCustomService()}
         <View
         
           style={{position:'relative',height:height*0.35,width,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <View  style={{width,height:40,paddingHorizontal:5,flexDirection:'row',alignItems:'center',justifyContent:'flex-end',position:'absolute',zIndex:10,top:0}}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={_.throttle(this.toUrl.bind(this,"Setting"),1000,{

                      'trailing': false
                 })}
                 
                 >
                 <Image  style={{tintColor:'#fff',height:35,width:35}} source={require('../static/images/tool.png')}/>
                 </TouchableOpacity>
                  {/*<TouchableOpacity
                    activeOpacity={1}
                    onPress={_.throttle(this.toUrl.bind(this,""),1000,{

                      'trailing': false
                 })}
                
                 >
                 <Image  style={{tintColor:'#fff',height:35,width:35}} source={require('../static/images/news.png')}/>
                 </TouchableOpacity>*/}
          </View> 
        
           <Image
          
         
           blurRadius={1}
          
           source={require('../static/images/meBg.jpg')}
           style={{height:height*0.45,width,position:'absolute'}} />
               
         
             {user?<TouchableOpacity
                  activeOpacity={1}
                   onPress={_.throttle(this.toUrl.bind(this,""),1000,{

                     'trailing': false
                     })}
                  style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                     <Image  
                     style={{height:65,width:65,borderRadius:65/2}}   source={require('../static/images/avatar.png')}/>
                    <Text style={{marginVertical:8,fontSize:StyleConfig.fontSize.size_14,color:'#fff'}}>{user.pinfoName}</Text>
                     <Text style={{fontSize:StyleConfig.fontSize.size_14,color:"#686f74"}}>{user.pinfoSname}</Text>
           </TouchableOpacity>:<TouchableOpacity
                  activeOpacity={1}
                   onPress={_.throttle(()=>this.props.navigation.navigate("Login"),1000,{

                     'trailing': false
                     })}
                  style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}><Image  
                    style={{height:65,width:65,borderRadius:65/2}}   source={require('../static/images/avatar.png')}/><Text style={{marginVertical:8,fontSize:StyleConfig.fontSize.size_14,color:'#fff'}}>立即登录</Text></TouchableOpacity>}
        </View> 
        {this.renderPayItem(PayList)}
        {this.renderLinkItem(LinkList)}
      </View>:<LoadingImg isModal={this.state.isLoading}/>}
      </ScrollView>
    
  }
}