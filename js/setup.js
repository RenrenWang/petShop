import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Image,
    Text,
AsyncStorage,
DeviceEventEmitter
} from 'react-native';

import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import  StyleConfig  from './base/StyleConfig'
import Home  from './page/Home'
import Cart  from './page/Cart'
import Storage from 'react-native-storage';
import SpecialOffer  from './page/SpecialOffer'
import Me  from './page/Me'
import  SetTime  from './page/SetTime'
import  Login  from './page/Login'
import  Register  from './page/Register'
import Classify  from './page/Classify'
import  NavBar  from './components/NavBar'
import  SetMeal  from './page/SetMeal'
import  SetMealD  from './page/SetMealD'
import  Details  from './page/Details'
import  AllOrderForm  from './page/AllOrderForm'
import  MyPet  from './page/MyPet'
import  Search  from './page/Search'
import  ShippingAddress  from './page/ShippingAddress'
import  AddShippingAddress  from './page/AddShippingAddress'
import  Order  from './page/Order'
import  Setting  from './page/Setting'
import  PayResult from './page/PayResult'

global.storage=new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,

  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,
    
  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: 1000 * 3600 * 24*30,
    
  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,
    
  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync方法，无缝返回最新数据。
  // sync方法的具体说明会在后文提到
  // 你可以在构造函数这里就写好sync的方法
  // 或是写到另一个文件里，这里require引入
  // 或是在任何时候，直接对storage.sync进行赋值修改
  
})  
const TabScreen = TabNavigator({
    Home: {
        screen: Home,

      

    },
    SpecialOffer: {
        screen: SpecialOffer,
         navigationOptions: ({navigation}) => ({


        })
   

    },
    Cart: {
        screen: Cart,
         navigationOptions: ({navigation}) => ({


        })

    },
    Me:{
        screen:Me,

        navigationOptions: ({navigation}) => ({


        })

    },

},
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
  
        lazy: true,
        // initialRouteName: "Home",
        swipeEnabled: false,
         
        animationEnabled: false,
        tabBarOptions: {
            tabStyle: {
                backgroundColor: "#fff"
            },
            style: {
                height: 50,
                backgroundColor: "#fff"
            },
            labelStyle:{
             fontSize: StyleConfig.fontSize.size_12,
            
            },
            showIcon: true,
            indicatorStyle: { height: 0 },

            //activeBackgroundColor:"#e64275",
            activeTintColor: StyleConfig.colors.mainColor,
           
        }
    }


);

const RootScene = StackNavigator({
    // WelcomePage: {
    //   screen: WelcomePage,
    // },
    TabScreen: {
        screen: TabScreen,
         
    },
Classify:{
   screen:Classify,
},
Login:{
 screen:Login,
   navigationOptions: ({navigation}) => ({
         header:()=><NavBar
               title={"登录"}
                navBarbgColor={ StyleConfig.colors.mainColor}
                navBarLeftAction={()=>navigation.goBack()}
               navBarLeft={true}
               />
       }), 

 
},
Register:{
 screen:Register,
   navigationOptions: ({navigation}) => ({
         header:()=><NavBar
               title={"注册"}
                navBarbgColor={ StyleConfig.colors.mainColor}
                navBarLeftAction={()=>navigation.goBack()}
               navBarLeft={true}
               />
       }), 

 
},

SetTime:{
  screen:SetTime,
    navigationOptions: ({navigation}) => ({
         header:()=><NavBar
                    title={"限时购"}
                    navBarbgColor={ StyleConfig.colors.mainColor}
                    navBarLeft={true}
                    navBarLeftAction={()=>navigation.goBack()}
                
                     navBarRight={()=><Image  style={{  width:25,
     height:25,tintColor:"#fff"}} source={require('./static/images/share.png')} />}
                    share={true}
                 />
       }), 
 },
 SetMeal:{
      screen:SetMeal,
    navigationOptions: ({navigation}) => ({
         header:()=><NavBar
                    title={"套餐"}
                    navBarbgColor={ StyleConfig.colors.mainColor}
                    navBarLeft={true}
                    navBarLeftAction={()=>navigation.goBack()}
                    navBarRight={()=><Image  style={{ width:25,
                    height:25,tintColor:"#fff"}} source={require('./static/images/share.png')} />}
                   share={true}
                 />
             }), 
 },
SetMealD:{
      screen:SetMealD,
    navigationOptions: ({navigation}) => ({
         header:()=><NavBar
                    title={"套餐详情"}
                    navBarbgColor={ StyleConfig.colors.mainColor}
                    navBarLeft={true}
                    navBarLeftAction={()=>navigation.goBack()}
                    navBarRight={()=><Image  style={{ width:25,
                    height:25,tintColor:"#fff"}} source={require('./static/images/share.png')} />}
                   share={true}
                 />
             }), 
 },

 
 Details:{
      screen:Details,
    navigationOptions: ({navigation}) => ({
         header:()=>null,
       }), 
 },
  AllOrderForm:{
      screen:AllOrderForm,
    navigationOptions: ({navigation}) => ({
         header:()=>null,
       }), 
 },
  MyPet:{
      screen:MyPet,
    navigationOptions: ({navigation}) => ({
          header:()=><NavBar
                    title={"我的宠物"}
                    navBarbgColor={ StyleConfig.colors.mainColor}
                    navBarLeft={true}
                    navBarLeftAction={()=>navigation.goBack()}
                
         />,
       }), 
 },
  Search:{
      screen:Search,
   
 },
  ShippingAddress:{
      screen:ShippingAddress,
   
 }, AddShippingAddress:{
      screen:AddShippingAddress,
   
 }, Order:{
      screen:Order,
   
 },
  Setting:{
      screen:Setting,
   
 }, PayResult:{
      screen:PayResult,
   
 },
 
    
}, {
        //Android页面左右切入
        headerMode: 'screen',
        initialRouteName:'TabScreen',
        transitionConfig:()=>({
            screenInterpolator:CardStackStyleInterpolator.forHorizontal, 
        }),
        navigationOptions: {

            header: null,
            gesturesEnabled: true
        },
    });





export default  class setUp extends Component {
      constructor(props){
          super(props)
          this.state={
                user:null
              
          }
      }

       componentWillMount(){
          this.subscription = DeviceEventEmitter.addListener('userNameDidChange',(user) => {
                  this.setState({
                        user:user
                  })
            })
      
          storage.load({
            key: 'user',
        }).then(ret => {
          
          this.setState({

               user:ret
               
          })
        }).catch(err => {
            

        })
           
    }
    componentWillUnmount() {
       if(this.subscription)
        this.subscription.remove();
    }
    render() {
      
        return (
            <RootScene  screenProps={{user:this.state.user}}/>
        );
    }
}
