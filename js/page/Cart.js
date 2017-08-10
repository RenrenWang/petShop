import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Button,
  Image,
  View,
  Dimensions,
  Text,
  PixelRatio,
  TouchableOpacity,
  Alert,
  DeviceEventEmitter
} from 'react-native';
import _ from 'lodash';
import StyleConfig from '../base/StyleConfig'
import NavBar from '../components/NavBar'
import ListTWoRow from '../components/ListTWoRow'
import MyListView from '../components/MyListView'
import Swipeout from 'rn-swipe-out';

const {width, height} = Dimensions.get('window');
 const  pi=PixelRatio.get();

import Config from '../config'

export default class Cart extends React.Component {
  static navigationOptions = {
    tabBarLabel: '购物车',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../static/images/cart.png')}
     style={{tintColor: tintColor,   height:26,
     width:26 }}
      />
    ),
  };
  constructor(props) {
    super(props)
    this.state = {
     
      cheackAll:{
              "prdName": "all",
              "name": "全选",
              "checked": false
            },
       list:[]
    }
  }


  
  onClick(data, index) {
 
   // alert(JSON.stringify(data));
    if (data.prdName&&data.prdName == "all") {
     
      let allItem = [];
      this.state.list.map((item, index) => {
       
        item.checked =!data.checked ;
         console.log(item);
         allItem.push(item);
      })
      let  cheackAll=this.state.cheackAll;
        cheackAll.checked=!data.checked;
       
      this.setState({
        list: allItem,
        cheackAll:cheackAll
      })
    }else{
    let allData = this.state.list;
    let itemIndex = allData[index];
    console.log(JSON.stringify(allData[index]['checked']));
  //  return;

    allData[index]['checked'] = !allData[index]['checked'];
    this.setState({
      list: allData

    })

    }



  }
  renderCheckBox(data, index) {
    /*var leftText = data.name;
 
    return (
        <CheckBox
            style={{width:100,justifyContent:'center',alignItems:'center'}}
            onClick={()=>this.onClick(data,index)}
            isChecked={data.checked}
            rightText={isText?leftText:""}
            checkedImage={}
            unCheckedImage={}
        />);*/

    return <TouchableOpacity
     activeOpacity={1}
     onPress={this.onClick.bind(this, data, index)} style={{ width: 66, alignItems: 'center', justifyContent: 'center' }}>{data.checked ? <Image source={require('../static/images/check.png')} style={{ height: 18, width: 18 }} /> : <Image source={require('../static/images/unCheck.png')} style={{ height: 18, width: 18 }} />}</TouchableOpacity>;
  }

  addFavorite(){
    alert("移动到收藏夹");
  }
  deleteItem(index){
       let list=this.state.list;
    Alert.alert(
            '',
            '将商品“'+list[index]['prdName']+'”从购物车移除',
            [

                { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: '确定', onPress: () => {
                 
                    fetch(Config.CARTSHOPING+this.props.screenProps.user.pinfoId+'&homeType=DEL'+'&prdIds='+list[index]['prdIds'])//
                        .then((response) => response.json())
                        .then((responseJson) => {
                         // if(responseJson.result=="success"||responseJson.msg=="无数据"){
                              _.pullAt(list,index);
                              this.setState({
                                    list
                                })
                        ///  }
                            
                        })

                    }

                },
            ],
            { cancelable: false }
        )
 
    
     
  }
 
  
  setSwiperoutOption(activeOne,activeTwo){
    return  [
      // {
      //   text: '移至收藏夹',
      //   style: {
      //     backgroundColor: '#f9cdad'
      //   },
      //   onPress:activeOne
      // },
       {
        text: '删除',
        style: {
          backgroundColor: '#fc9d9a'
        },
        onPress: activeTwo
      }];
  }
  renderCart(data) {
    if(!this.state.list)
    return null;
     
    let itemHeight = 162/2;
    let items = [];

    this.state.list.map((item, index) => {
   
      let activeOne=this.setSwiperoutOption(this.addFavorite.bind(this),this.deleteItem.bind(this,index));
      items.push(<Swipeout onPress={this.onClick.bind(this, item, index)}  key={index}  right={activeOne}>
        <TouchableOpacity
        
          activeOpacity={1}
          style={{ flexDirection: 'row', alignItems: 'center',  }}
        >

           <TouchableOpacity
     activeOpacity={1}
     onPress={this.onClick.bind(this,item, index)} style={{ width: 66, alignItems: 'center', justifyContent: 'center' }}>{item.checked ? <Image source={require('../static/images/check.png')} style={{ height: 18, width: 18 }} /> : <Image source={require('../static/images/unCheck.png')} style={{ height: 18, width: 18 }} />}</TouchableOpacity>
          {/*{item.shpIds?this.renderCheckBox(item, index):null}*/}
          <View style={{paddingVertical:10, flex: 1,  alignItems: 'center', flexDirection: 'row',borderBottomWidth:1,borderColor:StyleConfig.colors.lineColor}}>
            {/*resizeMode='stretch' */}
            <Image

              style={{ width: 162/2, height:162/2 }} source={{uri:Config.BASEURL+item.prdUri}} />
            <View style={{ flex: 1,marginLeft:8, paddingHorizontal: 5, flexDirection: 'column', justifyContent: 'space-between', height: itemHeight,  }}>
              <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text numberOfLines={1} style={{ color: StyleConfig.colors.defaultFontColor, fontSize: StyleConfig.fontSize.size_16,marginRight:3 }}>{item.prdName}</Text>
                  <Text style={{ color: StyleConfig.colors.hColor, fontSize: StyleConfig.fontSize.size_16 }}>x{item.prdNums}</Text>
                </View>

                {/*<Text numberOfLines={2} style={{ color: StyleConfig.colors.hColor, fontSize: StyleConfig.fontSize.size_14 }}>{this.props.index}{item.path}</Text>*/}
              </View>
              <View style={{ flex: 1, marginTop: 6, flexDirection: 'row', alignItems: 'center' }}>

                <Text style={{ fontSize: StyleConfig.fontSize.size_18, color: StyleConfig.colors.defaultFontColor }}>￥{item.prdZkprice}</Text>

              </View>


            </View>

          </View>

        </TouchableOpacity>
      
      </Swipeout>)
    })
    return (
      <View style={{ flexDirection: 'column',backgroundColor:'#fff'}}>
        {items}
      </View>
    )
  }
  sunRmb(){
    let totality=0;
  this.state.list.map((item,indx)=>{
        if(item.checked){
          totality+=item.prdZkprice*item.prdNums;
        }
    })
    return totality;
  }
  _renderHeader() {
    return (
      <View style={{ flexDirection: 'column', width, marginLeft: -5, backgroundColor: StyleConfig.colors.bgColor }}>
        {this.state.list.length > 0 ? this.renderCart(this.state.data) : <View style={{ flexDirection: 'column', alignItems: 'center', height: height * 0.4, justifyContent: 'center', backgroundColor: StyleConfig.colors.bgColor }}>
          <Image style={{ height: 90, width: 93 }} source={require('../static/images/cartcatImg.png')} />
          <Text style={{ textAlign: 'center', paddingVertical: 5, fontSize: StyleConfig.fontSize.size_14 }}>主人，感觉肚子空空的</Text>
        </View>}

        <View style={{ height: 45, marginTop: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
          <Text style={{ fontSize: StyleConfig.fontSize.size_16 }}>猜你喜欢</Text>
        </View>
      </View>
    )
  }
    
   componentDidMount() {
   if(this.props.screenProps.user)
   {

         this.subscription = DeviceEventEmitter.addListener('cartChange',() => {
                    fetch(Config.CARTSHOPING+this.props.screenProps.user.pinfoId)//this.props.screenProps.user.pinfoId
      .then((response) => response.json())
      .then((responseJson) => {
       
        //responseJson.maxpage
         if(responseJson.result=="success"){
             let Clist=responseJson.data;
             Clist.map((item,index)=>{
                 Clist[index]['checked']=false
             });
        //     alert(JSON.stringify(Clist))
             this.setState({
                list:Clist
            })
        
           
         }
          
       })
            })
      fetch(Config.CARTSHOPING+this.props.screenProps.user.pinfoId)//this.props.screenProps.user.pinfoId
      .then((response) => response.json())
      .then((responseJson) => {
       
        //responseJson.maxpage
         if(responseJson.result=="success"){
             let Clist=responseJson.data;
             Clist.map((item,index)=>{
                 Clist[index]['checked']=false
             });
        //     alert(JSON.stringify(Clist))
             this.setState({
                list:Clist
            })
        
           
         }
          
      })
   }
      
    
       

    }
  componentWillUnmount() {
        // 移除
        if(this.subscription)
        this.subscription.remove();
        }
     toOrder(){
       let prdIdsList=[];
       let prdNumsList=[];
         this.state.list.map((item,indx)=>{
           if(item.checked){
            prdIdsList.push(item.prdIds);
            prdNumsList.push(item.prdNums);
         }
       })
      // alert(prdIdsList.join(','));
      return this.props.navigation.navigate("Order", {"prdIdsList":prdIdsList,prdNumsList:prdNumsList,NoCreacteOrder:false});
    }
  render() {

    return this.props.screenProps.user?<View style={{ flex: 1, flexDirection: 'column' }}>
        <NavBar
          title={"购物车"}
          navBarbgColor={StyleConfig.colors.mainColor}
         
        />

        {/*<FlatList
            data={this.state.data}
          //extraData={this.state}
            //keyExtractor={this._keyExtractor}
           columnWrapperStyle={{justifyContent:'space-between',paddingHorizontal:10,marginTop:10}}
            numColumns={2}
            renderItem={(item)=><ListTWoRow itemHeight={110}  item={item} />}
            onEndReached={this._onEndReached.bind(this)}
            onEndReachedThreshold={0.5}
          />*/}

     
        <MyListView
          swipeEnabled={true}
          contentContainerStyle={{ backgroundColor: '#fff', paddingHorizontal: 5, flexWrap: 'wrap', justifyContent: 'space-between', flexDirection: 'row' }}
          animationEnabled={true}
          removeClippedSubviews={false}
          renderHeader={this._renderHeader.bind(this)}
          url={Config.CLIVE+this.props.screenProps.user.pinfoId}
          navigation={this.props.navigation}
          itemType={3}
          listItemBgColor={StyleConfig.colors.bgColor}
          isReturnTop={false}
        />
          {this.state.list.length > 0 ?<View style={{
          height: 50, justifyContent: 'space-between', flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1,
          borderColor:StyleConfig.colors.lineColor, backgroundColor: '#fff'
        }}>
          <View style={{  flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            {this.renderCheckBox(this.state.cheackAll)}
            <Text style={{ color: StyleConfig.colors.hColor, fontSize: StyleConfig.fontSize.size_14, marginLeft: 0, }}>全选</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: StyleConfig.colors.mainColor, fontSize: StyleConfig.fontSize.size_14, marginRight: 15, }}>￥{this.sunRmb()}</Text>
            <TouchableOpacity
              activeOpacity={1}

                 onPress={_.throttle(this.toOrder.bind(this),1000,{

                      'trailing': false
                    })}
              style={{
                height: 50,
                width: 100,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center', backgroundColor:this.sunRmb()>0?StyleConfig.colors.mainColor:"#cfcfcf",
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  alignItems: 'center',

                  fontSize: 14,
                  color: StyleConfig.colors.B6Color, color: '#fff'
                }}
              >下单</Text>
            </TouchableOpacity>
          </View>
        </View>:null}
      </View>:<View style={{flex:1}}>
        <NavBar
          title={"购物车"}
          navBarbgColor={StyleConfig.colors.mainColor}
         
        />
            <View style={{flex:1,backgroundColor:"rgba(0,0,0,0.3)",
                justifyContent: 'center',alignItems:'center'}}>
                    <View style={{height:width*0.5,width:width*0.8,backgroundColor:'#fff',borderRadius:10,   justifyContent: 'center',alignItems:'center'}}>
                             <Text style={{marginVertical: 25,fontSize:StyleConfig.fontSize.size_16}}>您还未登录，请先登录</Text>
                              <TouchableOpacity
                    activeOpacity={0.8}
                    style={{  borderRadius: 5,width:width*0.6, backgroundColor:StyleConfig.colors.mainColor, height: 40, alignItems: 'center', justifyContent: 'center' }}
                    onPress={()=>this.props.navigation.navigate("Login")}
                >
                    <Text style={{ color: "#fff", fontSize: 16 }} >登录</Text>
                </TouchableOpacity>
                    </View>
            </View>
        </View>
    }
   
 
}