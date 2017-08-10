import React, { Component } from 'react';
import {
   
    Text,
    View,

    Image,
    TouchableOpacity,
    Modal,
    Dimensions,
DeviceEventEmitter,
    FlatList
} from 'react-native';
import _ from 'lodash';
const {width, height} = Dimensions.get('window');
import Config from '../config'
import  StyleConfig  from '../base/StyleConfig'
import NavBar  from '../components/NavBar'
export default class ShippingAddress extends React.Component{
    constructor(props){
        super(props)
        this.state={
            list:[]
        }
    }



 componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener('addreeChange',() => {
      this.getData();

    })
     this.getData();

    }
   componentWillUnmount() {
        // 移除
        this.subscription.remove();
   }
    getData(){
            fetch(Config.SHOWADDREE+this.props.screenProps.user.pinfoId)//this.props.screenProps.user.pinfoId
                .then((response) => response.json())
                .then((responseJson) => {
                
                    //responseJson.maxpage
                    if(responseJson.result=="success"){
                    
                    //     alert(JSON.stringify(Clist))
                        this.setState({
                            list:responseJson.data
                        })
                    
                    
                    }
                    
                })
       
    }
    _renderItem(item){
    return(
        <FlatListItem
            item={item}
            navigation={this.props.navigation} 
        />
        )
    }
    render(){
        return(
            <View style={{flex:1}}>
                  <NavBar
                    title={"收货地址"}
                    navBarbgColor={ StyleConfig.colors.mainColor}
                    navBarLeft={true}
                    navBarLeftAction={()=>this.props.navigation.goBack()}
                    navBarRight={()=>this.state.list.length<=0?<Text style={{fontSize:StyleConfig.fontSize.size_14,color:"#fff"}}>新增</Text>:null}
                    navBarRightAction={_.throttle(()=>this.props.navigation.navigate("AddShippingAddress",{isAdd:true}),1000,{

    'trailing': false
  })}
                  />
                {this.state.list.length<=0?<View style={{ flexDirection: 'column', alignItems: 'center', height: height * 0.6, justifyContent: 'center',}}>
                         <Image style={{ height: 90, width: 93 }} source={require('../static/images/cartcatImg.png')} />
                         <Text style={{ marginTop:15,textAlign: 'center', paddingVertical: 5, fontSize: StyleConfig.fontSize.size_14 }}>主人，您还没有收货地址哦</Text>
                </View>: <FlatList
                    horizontal={false}
                    data={this.state.list}
                   renderItem={({item}) =>this._renderItem(item)}
                     keyExtractor={(item, index) =>index}
                 />}
              <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ margin: 25, borderRadius: 5, borderColor:StyleConfig.colors.mainColor,borderWidth:1, height: 45, alignItems: 'center', justifyContent: 'center' }}
                    onPress={_.throttle(()=>this.props.navigation.navigate("AddShippingAddress",{isAdd:true}),1000,{

    'trailing': false
  })}
                >
                    <Text style={{ color:StyleConfig.colors.mainColor, fontSize: 16 }} >新增地址</Text>
                </TouchableOpacity>

                
            </View>
        )
    }
}

 class  FlatListItem extends React.PureComponent{
   constructor(props){
     super(props);

   } 
   render(){
     let item= this.props.item;
      return(
          <View style={{marginTop:10,flexDirection:'row',backgroundColor:'#fff',padding:10}}>
              <View style={{flexDirection:'column',width:55}}>
                    <Text numberOfLines={1}  style={{alignSelf:'center',fontSize:StyleConfig.fontSize.size_16,color:StyleConfig.colors.blackColor}}>{item.addrName}</Text>
                    {item.addrDefaultflag=="Y"?<Text style={{alignSelf:'center',width:40,textAlign:'center',fontSize:StyleConfig.fontSize.size_12,borderColor:StyleConfig.colors.mainColor,borderWidth:1,color:StyleConfig.colors.mainColor}}>默认</Text>:null}
              </View> 
              <View style={{flex:1,flexDirection:'column',marginHorizontal:10}}>
                  <Text style={{fontSize:StyleConfig.fontSize.size_16,color:StyleConfig.colors.blackColor}}>{item.addrPhone}</Text>
                  <Text    style={{color:StyleConfig.colors.SHCOlor}}>{item.addrInfo}</Text>
              </View>

            <TouchableOpacity
                  activeOpacity={1}
                   onPress={_.throttle(()=>this.props.navigation.navigate("AddShippingAddress", {"addree":item,isAdd:false}),1000,{

                'trailing': false
              })}>
                  <Image    style={{alignSelf:'center',tintColor:StyleConfig.colors.SHCOlor,height:25,width:25}}  source={require('../static/images/edit.png')}/>
             </TouchableOpacity>
          </View>
      )
     
     }
}