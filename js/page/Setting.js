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
import { NavigationActions } from 'react-navigation'
export default class Setting extends React.Component {
    constructor(props){
        super(props)
        this.state={
            cacheSize:0
        }

    }

    componentDidMount(){
       NativeModules.Platform.getTotalCacheSize().then(size=>{
            this.setState({
                cacheSize:size
            })
       }).catch(e=>{
           console.log(e);
       })
        
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
       // alert(NativeModules.Platform.cacheSize);
      NativeModules.Platform.clearAllCache().then(result=>{
         if(result){
              this.setState({
                cacheSize:"0k"
            })
         }
             
      }).catch(err=>{
           console.log(err)
      })
    }
    render(){
          let {goBack, state} = this.props.navigation;
          let  list=[
                {name:"清除缓存",routerName:'',actions:()=>{},text:this.state.cacheSize},
                {name:"意见反馈",routerName:'',actions:this.clearSize},
                {name:"关于我们",routerName:''},
                {name:"帮助",routerName:''},
               
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
                      onPress={this.clearSize.bind(this)}
                      activeOpacity={1}
                      style={{height:50,paddingHorizontal:5,backgroundColor:'#fff',flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomWidth:1,borderBottomColor:StyleConfig.colors.lineColor}}>
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