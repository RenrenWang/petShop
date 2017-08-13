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
    NativeModules
} from 'react-native';
import _ from 'lodash';
import StyleConfig from '../base/StyleConfig'
import Config  from '../config'
import NavBar from '../components/NavBar'
import CountDownTimer from 'react_native_countdowntimer' 
import Loading from '../components/Loading'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
export default class Cart extends React.Component {
    constructor(props) {
        super(props)

    }

      _pay(){

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
   if(!this.state.data.addrInfo)
      return Alert.alert(
                '提示',
                '未添加收货地址',
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
        );
 
     let url="http://118.178.224.224/appsrv/callRequestAction.action?pinfoIds="+this.props.screenProps.user.pinfoId+'&ordIds='+this.state.orddetData[0]['ordIds']+'&ordCd='+this.state.data.ordCd;
     fetch(url)
	 .then((response) => response.json())
     .then((responseJson) => {
       if(responseJson.result=="fail"){
       Alert.alert('订单支付失败，请稍后重试')
           
       }else if(responseJson.result=="success"){
    
         
  let str="timestamp=2017-08-07+22%3A00%3A01&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.02%22%2C%22subject%22%3A%22%E6%88%91%E7%9A%84%E8%AE%A2%E5%8D%95%22%2C%22body%22%3A%22%E6%88%91%E7%9A%84%E8%AE%A2%E5%8D%95%E5%86%85%E5%AE%B9%22%2C%22out_trade_no%22%3A%2220170725002%22%7D&sign_type=RSA2&charset=utf-8&method=alipay.trade.app.pay&app_id=2017072007829531&version=1.0&sign=WkrvzHUkqBTtL0HvMkn9Mhk3JFtnINtxm8efSEJbaOWANQY5tD6KCQeR5SkMgEX7JGX5ZERmLJdnG23JPMKAAksJvPYbnwWJyvWfdkpWlwI%2FCkHiFMooYYlxx60MFcJinpH7vI4fNy6b96JmKU8FZFErOWykk2kHeS9HJVokhZRcaF%2BZbJ2lYUxMQO6Y%2BLVE0WpGeB5fpwC%2BFI%2FAsCrUyr9yobUU7X2%2FbLMJpuWaMEKNR88bHkElYk9VoSKm%2BVjSXf1N9oFsgBBHjVSk2gYhvV%2Fpp288hdC2Sg%2FCyfLLnSjH3Am5DCvajgZ97lczbJKD7puEkQPWjjwFA%2FgqSIDyLQ%3D%3D";
        
        //JSON.stringify(responseJson.msg)
        let  result="";
        NativeModules.AlipayModule.pay(responseJson.msg).then((resultStatus)=>{
                  
              console.log(JSON.stringify(resultStatus))
               this.setState({ 
                        payResult:resultStatus
               })
              /*处理支付结果*/
              switch (JSON.stringify(resultStatus)) {
                 case "9000":
                    result="支付成功";
                   
                   break;
                 case "8000":
                    result='支付结果未知,请查询订单状态';
                   break;
                 case "4000":
                  result='订单支付失败'
                   break;
                 case "5000":
                    result='重复请求'
                   break;
                 case "6001":
                   result='用户中途取消'
                   break;
                       case "6002":
                   result='网络连接出错'
                   break;
                 case "6004":
                    result='支付结果未知,请查询订单状态'
                   break;
                 default:
                  result='其他失败原因'
                   break;
               }

             
              this.props.navigation.navigate("PayResult",{result});
           }).catch(err=> {
                  console.log(JSON.stringify(err));
                     result='支付参数错误'
              this.props.navigation.navigate("PayResult",{result});     
          });
       
        

        }
        
      
      }).catch(err=>{
      Alert.alert("请求失败");
     })
    
         
    }
    render() {
        let {goBack, state} = this.props.navigation;
        return (
            <View style={{ flex: 1, }}>
                <NavBar
                    title={"我的订单"}
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
                <ScrollableTabView
                    tabBarActiveTextColor={StyleConfig.colors.mainColor}
                    tabBarInactiveTextColor={StyleConfig.colors.blackColor}
                    initialPage={state.params.initialPage ? state.params.initialPage : 0}
                    renderTabBar={() => <DefaultTabBar backgroundColor='#fff' />}
                    tabBarUnderlineStyle={{ backgroundColor: StyleConfig.colors.mainColor, height: 2 }}
                    tabBarTextStyle={{ fontWeight: 'normal' }}
                >
                    <List tabLabel="全部"   navigation={this.props.navigation} urlType="A"  type="All"  pinfoId={this.props.screenProps.user.pinfoId}/>
                    <List tabLabel="待付款"   navigation={this.props.navigation}  urlType="N"   type="DFk" pinfoId={this.props.screenProps.user.pinfoId}/>
                    <List tabLabel="待发货"   navigation={this.props.navigation} urlType="Z"  type="DFh" pinfoId={this.props.screenProps.user.pinfoId}/>
                    <List tabLabel="待评价"   navigation={this.props.navigation}  urlType="P"   type="DPj" pinfoId={this.props.screenProps.user.pinfoId}/>
                    <List tabLabel="预定"   navigation={this.props.navigation}  urlType="Y" type="Yd" pinfoId={this.props.screenProps.user.pinfoId}/>
                </ScrollableTabView>
            </View>
        )
    }
}
class  List extends React.Component{
    constructor(props){
        super(props)
        this.state={
            list:[],
            listLength:0,
            isLoading:true,
            msg:"加载中...",
        }

    }
componentDidMount() {
   // alert(Config.SHOWADDREE+this.props.screenProps.user.pinfoId);
      fetch(Config.MYORDER+this.props.pinfoId+'&orderType='+this.props.urlType)//this.props.screenProps.user.pinfoId
      .then((response) => response.json())
      .then((responseJson) => {
       
        //responseJson.maxpage
         if(responseJson.result=="success"){
        
        //     alert(JSON.stringify(Clist))
             this.setState({
                list:responseJson.data,
                isLoading:false,
               listLength:responseJson.data.length
            })
        
           
         }else{
              this.setState({
                msg:"暂无数据",
                isLoading:true
            })
         }
          
      }).catch(e=>{
          console.log(e);
      })
       

    }

 removeOrder(ordIds,pIndex){

     let list=this.state.list;

      Alert.alert(
            '',
            '取消订单：'+list[pIndex]['ordCd'],
            [

                { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: '确定', onPress: () => {
                 
                  fetch((Config.REMOVEORDER+this.props.pinfoId+'')+'&ordIds='+ordIds)//this.props.screenProps.user.pinfoId
                    .then((response) => response.json())
                    .then((responseJson) => {
                      //  alert(JSON.stringify(responseJson))
                        //responseJson.maxpage
                        if(responseJson.result=="success"){
                        
                       // alert(JSON.stringify(responseJson))
                            _.pullAt(list,pIndex);
                                this.setState({
                                    list,
                                    listLength:list.length
                            })
                        
                        }
                        
                    })

                    }

                },
            ],
            { cancelable: false }
        )
   // alert(Config.SHOWADDREE+this.props.screenProps.user.pinfoId);
     
       

   
    }
    _renderItem(item,index){
      
        return <TabContent   pIndex={index} removeOrder={this.removeOrder.bind(this)} navigation={this.props.navigation} pinfoId={this.props.pinfoId} type={this.props.type} item={item}/>
    }
    render(){
        console.log(this.state.listLength);
        return  !this.state.isLoading?<View style={{flex:1}}>
                 {this.state.listLength>0?<FlatList
                    horizontal={false}
                    data={this.state.list}
                    extraData={this.state}
                    renderItem={({item,index}) =>this._renderItem(item,index)}
                    keyExtractor={(item, index) =>index}
               />:<Loading msg={"暂无数据"}/>}
        </View>:<Loading msg={this.state.msg}/>
       
    }
}
class TabContent extends React.Component {
    constructor(props) {
        super(props)
    }
    /*renderAll(){
      return <View style={{ height: 45,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                       <TouchableOpacity activeOpacity={1}
                           style={{paddingHorizontal:10,marginHorizontal:10,paddingVertical:5,flexDirection:'row',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:StyleConfig.colors.lineColor}}
                         >
                            <Text style={{color:'#fff',fontSize:StyleConfig.fontSize.size_13,color:StyleConfig.colors.blackColor}}>再次购买</Text>
                        </TouchableOpacity>
                         <TouchableOpacity activeOpacity={1}
                           style={{paddingHorizontal:10,paddingVertical:5,flexDirection:'row',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:StyleConfig.colors.lineColor}}
                         >
                            <Text style={{color:'#fff',fontSize:StyleConfig.fontSize.size_13,color:StyleConfig.colors.blackColor}}>查看评价</Text>
                        </TouchableOpacity>
                   </View>;
    }

    renderDFk(){
     return <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between', height: 45, borderBottomColor: StyleConfig.colors.lineColor, borderBottomWidth: 1 }}>
                       <Text style={{fontSize:StyleConfig.fontSize.size_14,color:StyleConfig.colors.blackColor}}>应付：￥325.5</Text>
                        <TouchableOpacity activeOpacity={1}
                           style={{padding:5,flexDirection:'row',borderRadius:5,alignItems:'center',justifyContent:'center',backgroundColor:StyleConfig.colors.mainColor}}
                         >
                            <Text style={{color:'#fff',fontSize:StyleConfig.fontSize.size_13}}>付款：</Text>
                        
                             <CountDownTimer
                                date={(new Date(new Date().getTime()+60*60*60*8))-4}
                                //date={Math.round(new Date()/1000)+60*60*60*60}
                            
                            
                                mins=':'
                                segs=''
                                isHours={true}
                                hoursStyle={{backgroundColor:StyleConfig.colors.mainColor,color:'#fff'}}
                                minsStyle={{backgroundColor:StyleConfig.colors.mainColor,color:'#fff'}}
                                secsStyle={{backgroundColor:StyleConfig.colors.mainColor,color:'#fff'}}
                                firstColonStyle={{color:'#fff'}}
                                secondColonStyle={{color:'#fff'}}
                            />
                         </TouchableOpacity>
                   </View>
    }
    renderDPj(){
         return <View style={{ height: 45,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                       <TouchableOpacity activeOpacity={1}
                           style={{paddingHorizontal:10,marginHorizontal:10,paddingVertical:5,flexDirection:'row',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:StyleConfig.colors.lineColor}}
                         >
                            <Text style={{color:'#fff',fontSize:StyleConfig.fontSize.size_13,color:StyleConfig.colors.blackColor}}>再次购买</Text>
                        </TouchableOpacity>
                         <TouchableOpacity activeOpacity={1}
                           style={{paddingHorizontal:10,paddingVertical:5,flexDirection:'row',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:StyleConfig.colors.lineColor}}
                         >
                            <Text style={{color:'#fff',fontSize:StyleConfig.fontSize.size_13,color:StyleConfig.colors.blackColor}}>马上评价</Text>
                        </TouchableOpacity>
                   </View>;
    }
   renderDFh(){
         return <View style={{ height: 45,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                       <TouchableOpacity activeOpacity={1}
                           style={{paddingHorizontal:10,marginHorizontal:10,paddingVertical:5,flexDirection:'row',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:StyleConfig.colors.lineColor}}
                         >
                            <Text style={{color:'#fff',fontSize:StyleConfig.fontSize.size_13,color:StyleConfig.colors.blackColor}}>再次购买</Text>
                        </TouchableOpacity>
                         <TouchableOpacity activeOpacity={1}
                           style={{paddingHorizontal:10,paddingVertical:5,flexDirection:'row',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:StyleConfig.colors.lineColor}}
                         >
                            <Text style={{color:'#fff',fontSize:StyleConfig.fontSize.size_13,color:StyleConfig.colors.blackColor}}>查看评价</Text>
                        </TouchableOpacity>
                   </View>;
    }*/
    renderBottom(type){
      switch(type){
          case "All":
            return this.renderAll();
          break;
          case "DFk":
           return this.renderDFk();
          break;
          case "DFh":
            return this.renderDFh();
          break;
          case "DPj":
            return this.renderDPj();
            
          break;
      }
    }

  

    renderGoodsItem(data){
    let list=[];
    data.map((item,index)=>{
        list.push( <TouchableOpacity
                    activeOpacity={1}
                      onPress={_.throttle(()=>this.props.navigation.navigate("Details", {id:item.prdIds}),1000,{

    'trailing': false
  })} key={index} style={{flexDirection:'row',paddingVertical:15, borderBottomColor: StyleConfig.colors.lineColor, borderBottomWidth: 1}}>
                       <Image

                          style={{ width: 162/2, height:162/2 }} source={{uri:Config.BASEURLIMG+item.prdUri}} />
                          <View style={{marginLeft:10,flex:1,justifyContent:'center'}}>
                               <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:5}}>
                                    <Text style={{fontSize:StyleConfig.fontSize.size_14,color:StyleConfig.colors.blackColor}}>{item.prdName}</Text>
                                    <Text style={{fontSize:StyleConfig.fontSize.size_14,color:StyleConfig.colors.blackColor}}>x{item.orddetNums}</Text>
                               </View>
                               <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:5}}>
                                    <Text style={{flex:1,marginLeft:3,fontSize:StyleConfig.fontSize.size_12,color:StyleConfig.colors.hColor}}>{item.prdText}</Text>
                                    <Text style={{fontSize:StyleConfig.fontSize.size_12,color:StyleConfig.colors.mainColor}}>￥{item.orddetZkheji}</Text>
                               </View>
                          </View>
                   </TouchableOpacity>)
        })
     return  list;
    }
    sumRmb(data){
        let sum=0;
         data.map((item,index)=>{
            sum+=Number(item.orddetZkheji)*Number(item.orddetNums)
         })  
         return sum;
    }

     renderYD(item){
        return   <View style={{ flex: 1}}>
                <View style={{ marginTop: 10, backgroundColor: '#fff',paddingHorizontal:15,justifyContent:'center' }}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between', height: 45, borderBottomColor: StyleConfig.colors.lineColor, borderBottomWidth: 1 }}>
                        <Text>预定编号：{item.ordCd}</Text>
                        <TouchableOpacity 
                        activeOpacity={1} 
                      //  onPress={()=>this.props.removeOrder(item.ordIds)}
                        >
                            <Text style={{color:StyleConfig.colors.mainColor}}>取消预订</Text>
                         </TouchableOpacity>
                    </View>
                   
                   {this.renderGoodsItem(item.detOrdData)}
                    <View style={{ height: 45,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                         <Text style={{fontSize:StyleConfig.fontSize.size_14,color:StyleConfig.colors.blackColor}}>付款金额：￥{this.sumRmb(item.detOrdData)}</Text>
                           {/*<View style={{flexDirection:'row'}}>
                                <TouchableOpacity activeOpacity={1}
                                style={{paddingHorizontal:10,marginHorizontal:10,paddingVertical:5,flexDirection:'row',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:StyleConfig.colors.lineColor}}
                                >
                                    <Text style={{color:'#fff',fontSize:StyleConfig.fontSize.size_13,color:StyleConfig.colors.blackColor}}>交易成功</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1}
                                style={{paddingHorizontal:10,paddingVertical:5,flexDirection:'row',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:StyleConfig.colors.lineColor}}
                                >
                                    <Text style={{color:'#fff',fontSize:StyleConfig.fontSize.size_13,color:StyleConfig.colors.blackColor}}>立即评价</Text>
                                </TouchableOpacity>
                           </View>*/}
                             <TouchableOpacity activeOpacity={1}
                           style={{padding:5,flexDirection:'row',borderRadius:5,alignItems:'center',justifyContent:'center',backgroundColor:StyleConfig.colors.mainColor}}
                         >
                            <Text style={{color:'#fff',fontSize:StyleConfig.fontSize.size_13}}>立即下单</Text>
                        
                             {/*<CountDownTimer
                                date={(new Date(new Date().getTime()+60*60*60*8))-4}
                                //date={Math.round(new Date()/1000)+60*60*60*60}
                            
                            
                                mins=':'
                                segs=''
                                isHours={true}
                                hoursStyle={{backgroundColor:StyleConfig.colors.mainColor,color:'#fff'}}
                                minsStyle={{backgroundColor:StyleConfig.colors.mainColor,color:'#fff'}}
                                secsStyle={{backgroundColor:StyleConfig.colors.mainColor,color:'#fff'}}
                                firstColonStyle={{color:'#fff'}}
                                secondColonStyle={{color:'#fff'}}
                            />*/}
                         </TouchableOpacity>
                      </View>
                </View>
           </View>
    }
     renderDPJ(item){
        return   <View style={{ flex: 1}}>
                <View style={{ marginTop: 10, backgroundColor: '#fff',paddingHorizontal:15,justifyContent:'center' }}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between', height: 45, borderBottomColor: StyleConfig.colors.lineColor, borderBottomWidth: 1 }}>
                        <Text>订单编号：{item.ordCd}</Text>
                        <TouchableOpacity activeOpacity={1} 
                       //   onPress={this.removeOrder.bind(this,item.ordIds)}
                        >
                            <Text style={{color:StyleConfig.colors.mainColor}}>交易成功</Text>
                         </TouchableOpacity>
                    </View>
                   
                   {this.renderGoodsItem(item.detOrdData)}
                    <View style={{ height: 45,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                         <Text style={{fontSize:StyleConfig.fontSize.size_14,color:StyleConfig.colors.blackColor}}>付款金额：￥{item.ordZfsumm}</Text>
                         {/* {this.sumRmb(item.detOrdData)} */}
                           <View style={{flexDirection:'row'}}>
                                <TouchableOpacity activeOpacity={1}
                                style={{paddingHorizontal:10,marginHorizontal:10,paddingVertical:5,flexDirection:'row',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:StyleConfig.colors.lineColor}}
                                >
                                    <Text style={{color:'#fff',fontSize:StyleConfig.fontSize.size_13,color:StyleConfig.colors.blackColor}}>交易成功</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1}
                                style={{paddingHorizontal:10,paddingVertical:5,flexDirection:'row',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:StyleConfig.colors.lineColor}}
                                >
                                    <Text style={{color:'#fff',fontSize:StyleConfig.fontSize.size_13,color:StyleConfig.colors.blackColor}}>立即评价</Text>
                                </TouchableOpacity>
                           </View>
                      </View>
                </View>
           </View>
    }
    renderDFH(item){
        return   <View style={{ flex: 1}}>
                <View style={{ marginTop: 10, backgroundColor: '#fff',paddingHorizontal:15,justifyContent:'center' }}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between', height: 45, borderBottomColor: StyleConfig.colors.lineColor, borderBottomWidth: 1 }}>
                        <Text>订单编号：{item.ordCd}</Text>
                        <TouchableOpacity activeOpacity={1} 
                       //   onPress={this.removeOrder.bind(this,item.ordIds)}
                        >
                            <Text style={{color:StyleConfig.colors.mainColor}}>已付款</Text>
                         </TouchableOpacity>
                    </View>
                   
                   {this.renderGoodsItem(item.detOrdData)}
                    <View style={{ height: 45,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                         <Text style={{fontSize:StyleConfig.fontSize.size_14,color:StyleConfig.colors.blackColor}}>付款金额：￥{item.ordZfsumm}</Text>
                         {/* {this.sumRmb(item.detOrdData)} */}
                           <View style={{flexDirection:'row'}}>
                                <TouchableOpacity activeOpacity={1}
                                style={{paddingHorizontal:10,marginHorizontal:10,paddingVertical:5,flexDirection:'row',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:StyleConfig.colors.lineColor}}
                                >
                                    <Text style={{color:'#fff',fontSize:StyleConfig.fontSize.size_13,color:StyleConfig.colors.blackColor}}>已付款</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1}
                                style={{paddingHorizontal:10,paddingVertical:5,flexDirection:'row',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:StyleConfig.colors.lineColor}}
                                >
                                    <Text style={{color:'#fff',fontSize:StyleConfig.fontSize.size_13,color:StyleConfig.colors.blackColor}}>等待发货</Text>
                                </TouchableOpacity>
                           </View>
                      </View>
                </View>
           </View>
    }


      toOrderAndD(ordIds,ordCd){
      
     return this.props.navigation.navigate("Order", {ordIds,ordCd,NoCreacteOrder:true});
    }
    renderDFK(item){
         return   <View style={{ flex: 1}}>
                <View style={{ marginTop: 10, backgroundColor: '#fff',paddingHorizontal:15,justifyContent:'center' }}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between', height: 45, borderBottomColor: StyleConfig.colors.lineColor, borderBottomWidth: 1 }}>
                        <Text>订单编号：{item.ordCd}</Text>
                        <TouchableOpacity activeOpacity={1} 
                    onPress={this.props.removeOrder.bind(this,item.ordIds,this.props.pIndex)}
                        >
                            <Text>取消订单</Text>
                         </TouchableOpacity>
                    </View>
                   
                   {this.renderGoodsItem(item.detOrdData)}
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between', height: 45, borderBottomColor: StyleConfig.colors.lineColor, borderBottomWidth: 1 }}>
                       <Text style={{fontSize:StyleConfig.fontSize.size_14,color:StyleConfig.colors.blackColor}}>应付：￥{this.sumRmb(item.detOrdData)}</Text>
                       {/* {this.sumRmb(item.detOrdData)} */}
                        <TouchableOpacity activeOpacity={1}
                            onPress={_.throttle(this.toOrderAndD.bind(this,item.ordIds,item.ordCd),1000,{

                      'trailing': false
                    })}
                           style={{padding:5,flexDirection:'row',borderRadius:5,alignItems:'center',justifyContent:'center',backgroundColor:StyleConfig.colors.mainColor}}
                         >
                            <Text style={{color:'#fff',fontSize:StyleConfig.fontSize.size_13}}>立即付款</Text>
                        
                             {/*<CountDownTimer
                                date={(new Date(new Date().getTime()+60*60*60*8))-4}
                                //date={Math.round(new Date()/1000)+60*60*60*60}
                            
                            
                                mins=':'
                                segs=''
                                isHours={true}
                                hoursStyle={{backgroundColor:StyleConfig.colors.mainColor,color:'#fff'}}
                                minsStyle={{backgroundColor:StyleConfig.colors.mainColor,color:'#fff'}}
                                secsStyle={{backgroundColor:StyleConfig.colors.mainColor,color:'#fff'}}
                                firstColonStyle={{color:'#fff'}}
                                secondColonStyle={{color:'#fff'}}
                            />*/}
                         </TouchableOpacity>
                   </View>
                </View>
           </View>
    }
   
    renderM(item){
        switch(item.ordStatus){
            case "N":
            return  this.renderDFK(item);break;
            case "Z":
            return  this.renderDFH(item);break;
            case "S":
            return  this.renderDPJ(item);break;
            case "Y":
            return  this.renderYD(item);break;
        }
    }
    render() {
     
        return (
            <View style={{ flex: 1,flexDirection:'column'}}>
                {this.renderM(this.props.item)}
           </View>
           
        )
    }
}