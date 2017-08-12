import React from 'react'
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    TextInput,
    ScrollView,
    DeviceEventEmitter,
    NativeModules,
    Alert
} from "react-native"
import _ from 'lodash';
const {width, height} = Dimensions.get('window');
import Config from '../config'
import StyleConfig from '../base/StyleConfig'
import NavBar from '../components/NavBar'

export default class Order extends React.Component {
    constructor(props) {
        super(props)
        this.placeholder="订单留言内容";
        this.state = {
            data: {},
            orddetData:[],
            sumRmb:0,
            content:"",
            addreerDefault:"",
            payResult:0
        }
    }
    componentDidMount() {

        this.getData();
        this.subscription = DeviceEventEmitter.addListener('ordeRChange',() => {
                this.getData();

        })
       
      
    }
     componentWillUnmount() {
        // 移除
        this.subscription.remove();
        }
    getData(){
          let prdIdsList = this.props.navigation.state.params.prdIdsList;//91;//
        let prdNumsList = this.props.navigation.state.params.prdNumsList;
        let url=this.props.navigation.state.params.NoCreacteOrder?(Config.BROWERORDER + this.props.screenProps.user.pinfoId +'&ordIds='+this.props.navigation.state.params.ordIds+'&ordCd='+this.props.navigation.state.params.ordCd):(Config.ORDER + this.props.screenProps.user.pinfoId + '&prdIdsList=' + prdIdsList.join(',') + '&prdNumsList=' + prdNumsList.join(','));
       // alert(isCreateOrderStr);
       
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
             console.log(JSON.stringify(responseJson));

                // if (responseJson.result == "success") {
                    let  sumRmb=0;
                    responseJson.orddetData.map((item,index)=>{
                        sumRmb+=item.orddetZkprice*item.orddetNums
                    })    
                    this.setState({
                        data: responseJson,
                        orddetData:responseJson.orddetData,
                        sumRmb
                    })

               // }

            })
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
     console.log(url);
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

              Alert.alert(
                '提示',
                result,
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
             );
            //  this.props.navigation.navigate("PayResult",{result});
           }).catch(err=> {
                 
                   
                      Alert.alert(
                '支付异常，请稍后重试',
                result,
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
             );
              //this.props.navigation.navigate("PayResult",{result});     
          });
       
        

        }
        
      
      }).catch(err=>{
      Alert.alert("请求失败");
     })
    
         
    }
    render() {
        return (
           <View 
             style={{ flex: 1 }}>
                <NavBar
                    title={"确认订单"}
                    navBarbgColor={StyleConfig.colors.mainColor}
                    navBarLeft={true}
                    navBarLeftAction={() => this.props.navigation.goBack()}

                />
            <ScrollView   horizontal={false}>
                
                {this.state.data.addrInfo ? <TouchableOpacity
                    activeOpacity={1}
                    onPress={_.throttle(() => this.props.navigation.navigate("ShippingAddress"), 1000, {

                        'trailing': false
                    })} style={{ flexDirection: 'row', backgroundColor: '#fff', justifyContent: "space-between", alignItems: 'center', paddingHorizontal: 5, paddingVertical: 6, marginVertical: 10 }}>
                    <Image
                        style={{ tintColor: StyleConfig.colors.SHCOlor, height: 50, width: 50 }}
                        source={require('../static/images/addree.png')}
                    />
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ flex: 1, color: StyleConfig.colors.hColor, fontSize: StyleConfig.fontSize.size_14, color: StyleConfig.colors.defaultFontColor }}>{this.state.data.addrInfo}</Text>
                        <Image style={{ tintColor: StyleConfig.colors.SHCOlor, height: 20, width: 20 }} source={require('../static/images/rightArrow.png')} />
                    </View>
                </TouchableOpacity> : <TouchableOpacity
                    activeOpacity={1}
                    onPress={_.throttle(() => this.props.navigation.navigate("AddShippingAddress"), 1000, {

                        'trailing': false
                    })} style={{ flexDirection: 'row', backgroundColor: '#fff', justifyContent: "space-between", alignItems: 'center', paddingHorizontal: 5, paddingVertical: 6, marginVertical: 10 }}>
                        <Image
                            style={{ tintColor: StyleConfig.colors.SHCOlor, height: 50, width: 50 }}
                            source={require('../static/images/addree.png')}
                        />
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ flex: 1, color: StyleConfig.colors.hColor, fontSize: StyleConfig.fontSize.size_14, color: StyleConfig.colors.defaultFontColor }}>添加收货地址</Text>
                            <Image style={{ tintColor: StyleConfig.colors.SHCOlor, height: 20, width: 20 }} source={require('../static/images/rightArrow.png')} />
                        </View>
                    </TouchableOpacity>}

                <View style={{ backgroundColor: '#fff' }}>
                    <Text style={{paddingHorizontal: 10,paddingVertical:13, fontSize: StyleConfig.fontSize.size_16 }}>购买清单</Text>
                    {this.state.orddetData.map((item,index)=>{
                        return <View key={index} style={{paddingHorizontal: 10, paddingVertical: 10,backgroundColor:StyleConfig.colors.bgColor,  alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderColor:"#fff" }}>

                        <Image

                            style={{ width: 162 / 2, height: 162 / 2 }} source={{ uri: Config.BASEURL + item.prdUri }} />
                        <View style={{ flex: 1, marginLeft: 8, paddingHorizontal: 5, flexDirection: 'column', justifyContent: 'space-between',  }}>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text numberOfLines={1} style={{ color: StyleConfig.colors.defaultFontColor, fontSize: StyleConfig.fontSize.size_16, marginRight: 3 }}>{item.prdName}</Text>
                                    <Text style={{fontSize: StyleConfig.fontSize.size_16, color: StyleConfig.colors.defaultFontColor  }}>￥{item.orddetZkprice}</Text>
                                </View>

                                {/*<Text numberOfLines={2} style={{ color: StyleConfig.colors.hColor, fontSize: StyleConfig.fontSize.size_14 }}>{this.props.index}{item.path}</Text>*/}
                            </View>
                            <View style={{alignSelf:'flex-end',marginTop: 6, flexDirection: 'row', alignItems: 'center' }}>

                                <Text style={{color: StyleConfig.colors.hColor, fontSize: StyleConfig.fontSize.size_16 }}>x{item.orddetNums}</Text>

                            </View>


                        </View>

                    </View>
                    })}
                </View>

                <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'#fff',paddingVertical:13,paddingHorizontal:10,borderBottomColor:StyleConfig.colors.lineColor,borderBottomWidth:1}}>
                        <Text style={{ fontSize: StyleConfig.fontSize.size_16 }}>商品总额</Text>
                        <Text style={{ fontSize: StyleConfig.fontSize.size_14 }}>￥{this.state.sumRmb}</Text>
                </View>
                <View style={{ backgroundColor:'#fff'}}>
                   {/* <View style={{borderBottomColor:StyleConfig.colors.lineColor,borderBottomWidth:1}}>
                      <Text style={{paddingHorizontal: 10,paddingVertical:13, fontSize: StyleConfig.fontSize.size_16 }}>订单留言</Text>
                    </View> */}
                     <TextInput
                        underlineColorAndroid='transparent'
                        style={{  height: 65,paddingHorizontal:10,width: width ,flex:1 }}
                        onChangeText={(content) => this.setState({ content })}
                        value={this.state.content}
                        placeholder={this.placeholder}
                        placeholderTextColor={StyleConfig.colors.dText}
                         selectionColor={"#999"} 
                       
                    />
               </View>
                <View style={{backgroundColor:"#fff",marginVertical:10}}>
                    <View style={{borderBottomColor:StyleConfig.colors.lineColor,borderBottomWidth:1}}>
                         <Text style={{paddingHorizontal: 10,paddingVertical:13, fontSize: StyleConfig.fontSize.size_16 }}>支付方式</Text>
                    </View>
                    <Image 
                     resizeMode="contain"
                     style={{height:60,width}}
                    source={require('../static/images/alipay.png')}/>
               </View>
               
               
               </ScrollView>
                <View style={{backgroundColor:"#fff",flexDirection:'row',justifyContent:'flex-end',alignItems:'center',height:50,borderTopColor:StyleConfig.colors.lineColor,borderTopWidth:1}}>
                    <View style={{flexDirection:'row',marginRight:10,flex:1,justifyContent:'flex-end'}}>
                         <Text style={{color:StyleConfig.colors.blackColor,fontSize:StyleConfig.fontSize.size_14}}>实付款：</Text>
                         <Text style={{color:StyleConfig.colors.mainColor,fontSize:StyleConfig.fontSize.size_14}}>￥{this.state.sumRmb}</Text>
                    </View>
                    {this.state.payResult==9000?<TouchableOpacity   
                        activeOpacity={1}
                     
                    style={{height:50,width:width/4,backgroundColor:StyleConfig.colors.mainColor,alignItems:'center',justifyContent:'center'}}
                    >
                    <Text style={{color:"#fff",fontSize:StyleConfig.fontSize.size_14}}>订单已支付</Text>
                  </TouchableOpacity>:<TouchableOpacity   
                        activeOpacity={1}
                      onPress={this._pay.bind(this)}
                    style={{height:50,width:width/4,backgroundColor:StyleConfig.colors.mainColor,alignItems:'center',justifyContent:'center'}}
                    >
                    <Text style={{color:"#fff",fontSize:StyleConfig.fontSize.size_14}}>确认支付</Text>
                  </TouchableOpacity>}
                  
                </View>
            </View> 
        )
    }
}