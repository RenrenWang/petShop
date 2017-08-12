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
    FlatList,
    Alert,
    DeviceEventEmitter,
    NativeModules
} from 'react-native';
import _ from 'lodash';
import StyleConfig from '../base/StyleConfig'
import Config  from '../config'
import NavBar from '../components/NavBar'
import Clear from 'react-native-clear-cache';
import { NavigationActions } from 'react-navigation'
export default class Setting extends React.Component {
    constructor(props){
        super(props)
        this.state={
            cacheSize:0,
            unit:"",
        }

    }

    componentDidMount(){
    //    NativeModules.Platform.getTotalCacheSize().then(size=>{
    //         this.setState({
    //             cacheSize:size
    //         })
    //    }).catch(e=>{
    //        console.log(e);
    //    })
    Clear.getCacheSize((value,unit)=>{
                this.setState({
                cacheSize:value, //缓存大小
                unit:unit  //缓存单位
                })
            });
    }
      logOut() {

        Alert.alert(
            '退出登录',
            '您确定要退出登录吗？',
            [

                { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: '确定', onPress: () => {

                        storage.remove({
                            key: 'user'
                        })
                         this.props.navigation.goBack(null); 
                         DeviceEventEmitter.emit('userNameDidChange', null);
                        // const resetAction = NavigationActions.reset({
                        //     index:0,
                        //     actions: [
                        //         NavigationActions.navigate({ routeName: 'Login' })
                        //     ]
                        // })
                      //  this.props.navigation.dispatch(resetAction)


                    }

                },
            ],
            { cancelable: false }
        )

    }

    clearSize(){
       Clear.runClearCache(()=>{
            
                  console.log("清除成功");
            
                  Clear.getCacheSize((value,unit)=>{
                  this.setState({
                    cacheSize:value, //缓存大小
                    unit:unit  //缓存单位
                  })
                });
                  
                });
    }
    render(){
          let {goBack, state} = this.props.navigation;
          let  list=[
                {name:"清除缓存",routerName:'',actions:this.clearSize.bind(this),text:this.state.cacheSize+''+this.state.unit},
                {name:"意见反馈",routerName:'',actions:()=>{}},
                {name:"关于我们",routerName:'',actions:()=>{}},
                {name:"帮助",routerName:'',actions:()=>{}},
               
          ];
           
        return(
            <View style={{flex:1}}>
                 <NavBar
                    title={"设置"}
                    StatusBarColor={"#fff"}
                    navBarbgColor={"#fff"}
                    barStyle="dark-content"
                    titleStyle={{ color: StyleConfig.colors.blackColor }}
                    iconStyle={{ tintColor: StyleConfig.colors.B6Color }}

                    navBarLeft={true}
                    navBarLeftAction={() => goBack()}
                    //navBarRight={()=><Image  style={{  width:25,
                    //   height:25,tintColor: StyleConfig.colors.B6Color}} source={require('../static/images/homeSearch.png')} />}
                    // navBarRightAction={()=>this.props.navigation.navigate('Search')} 
                   />
                  <View style={{marginTop:10}}> 
                   { list.map((item,index)=>{
                    return  <TouchableOpacity
                     key={index}
                      onPress={item.actions}
                      activeOpacity={1}
                      style={{height:50,paddingHorizontal:15,backgroundColor:'#fff',flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomWidth:1,borderBottomColor:StyleConfig.colors.lineColor}}>
                        <Text style={{fontSize:StyleConfig.fontSize.size_14,color:StyleConfig.colors.B6Color}}>{item.name}</Text>
                         {!item.text?<Image source={require('../static/images/rightArrow.png')} style={{tintColor: StyleConfig.colors.B6Color,height:18,width:18}}/>:
                         <Text>{item.text}</Text>}
                         </TouchableOpacity>
                      })
                    }
                  
                   <TouchableOpacity
                      onPress={this.logOut.bind(this)}
                         activeOpacity={1}
                    style={{height:45,backgroundColor:'#fff',marginVertical:10,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:StyleConfig.fontSize.size_16,color:StyleConfig.colors.B6Color}}>退出登录</Text>
                   </TouchableOpacity>
                  </View>  
            </View>
        )
    }
}