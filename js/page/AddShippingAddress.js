import React, { Component } from 'react';
import {
   
    Text,
    View,

    Image,
    TouchableOpacity,
    Modal,
    Dimensions,
    Platform,
    PixelRatio,
    ScrollView,
    TextInput,
    Alert,
    DeviceEventEmitter
} from 'react-native';
const {width, height} = Dimensions.get('window');
import Config from '../config'
import  StyleConfig  from '../base/StyleConfig'
import NavBar  from '../components/NavBar'
export default class AddShippingAddress extends React.Component{
    constructor(props){
        super(props)
        this.placeholderUsername="请输入用户名"
        this.placeholderPhoneNumbre="请输入联系电话"
        this.placeholderAddrInfo="请输入详细地址"
        this.placeholderAddreeZip="请输入邮政编码"
        this.state={
            username:"",
            phoneNumbre:"",
            addrInfo:"",
            defaultAddree:true,
            addreeZip:"",
           
        }
    }

componentDidMount(){
      
        if(!this.props.navigation.state.params.isAdd){
           let addree=this.props.navigation.state.params.addree;
           this.setState({
               username:addree.addrName,
               phoneNumbre:addree.addrPhone,
               addrInfo:addree.addrInfo,
               addreeZip:addree.addrZip,
               defaultAddree:addree.addrDefaultflag=="Y"?true:false
           })    
        }
  }

    saveAddree(){
  if (!this.state.username || this.state.username.length <= 0) {

            return Alert.alert(
                '',
                '姓名不能为空',
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
        }

        if (!this.state.phoneNumbre || (this.state.phoneNumbre.length!=11)) {

            return Alert.alert(
                '',
                '手机号格式有误',
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
        }
          if (!this.state.addrInfo || this.state.addrInfo.length <= 0) {

            return Alert.alert(
                '',
                '地址不能为空',
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
        }
            if (!this.state.addreeZip || this.state.addreeZip.length <= 0) {

            return Alert.alert(
                '',
                '邮编不能为空',
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
        }

 let isAdd=this.props.navigation.state.params.isAdd;
 let msg=!isAdd?'修改成功':'地址添加成功';
  let  url=!isAdd?Config.UPDATEADDREE+this.props.screenProps.user.pinfoId+'&addrIds='+this.props.navigation.state.params.addree.addrIds+'&addrName='+this.state.username+'&addrPhone='+this.state.phoneNumbre+'&addrInfo='+this.state.addrInfo+'&addrZip='+this.state.addreeZip+'&addrDefaultflag='+(this.state.defaultAddree?"Y":"N"):Config.ADDADDREE+this.props.screenProps.user.pinfoId+'&'+'addrName='+this.state.username+'&addrPhone='+this.state.phoneNumbre+'&addrInfo='+this.state.addrInfo+'&addrZip='+this.state.addreeZip+'&addrDefaultflag='+(this.state.defaultAddree?"Y":"N");
      fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
       
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
            if(!isAdd)
             DeviceEventEmitter.emit('ordeRChange', "收货地址更新");
             return Alert.alert(
                '',
                msg,
                [
                    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    { text: '确定', onPress: () => this.props.navigation.goBack() },
                ],
                { cancelable: false }
            );
           
         }
          
      })

        
    }
    render(){
        return(
            <View style={{flex:1}}>
                  <NavBar
                    title={this.props.navigation.state.params.isAdd?"添加收货地址":"编辑收货地址"}
                    navBarbgColor={ StyleConfig.colors.mainColor}
                    navBarLeft={true}
                    navBarLeftAction={()=>this.props.navigation.goBack()}
                   
                  />
                     <View style={{paddingHorizontal:15,backgroundColor:'#fff'}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomColor:StyleConfig.colors.lineColor,borderBottomWidth:1}}>
                                <Text style={{color:StyleConfig.colors.blackColor,fontSize:StyleConfig.fontSize.size_16}}>姓名:</Text>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={{flex:1,paddingLeft:10,color: "#999",height: 50 }}
                                    onChangeText={(username) => this.setState({ username })}
                                    value={this.state.username}
                                    underlineColorAndroid={"transparent"}
                                 placeholder={this.placeholderUsername}
                                placeholderTextColor={StyleConfig.colors.hColor}
                                 selectionColor={"#999"} 
                                />

                        </View>
                         <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomColor:StyleConfig.colors.lineColor,borderBottomWidth:1}}>
                                <Text style={{color:StyleConfig.colors.blackColor,fontSize:StyleConfig.fontSize.size_16}}>联系电话:</Text>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={{flex:1,paddingLeft:10,color: "#999",height: 50 }}
                                    onChangeText={(phoneNumbre) => this.setState({ phoneNumbre })}
                                    value={this.state.phoneNumbre}
                                    underlineColorAndroid={"transparent"}
                                 placeholder={this.placeholderPhoneNumbre}
                                placeholderTextColor={StyleConfig.colors.hColor}
                                 selectionColor={"#999"} 
                                />

                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomColor:StyleConfig.colors.lineColor,borderBottomWidth:1}}>
                                <Text style={{color:StyleConfig.colors.blackColor,fontSize:StyleConfig.fontSize.size_16}}>详细地址:</Text>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={{flex:1,paddingLeft:10,color: "#999",height: 50 }}
                                    onChangeText={(addrInfo) => this.setState({ addrInfo })}
                                    value={this.state.addrInfo}
                                    underlineColorAndroid={"transparent"}
                                 placeholder={this.placeholderAddrInfo}
                                placeholderTextColor={StyleConfig.colors.hColor}
                                 selectionColor={"#999"} 
                                />

                        </View>
                         <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomColor:StyleConfig.colors.lineColor,borderBottomWidth:1}}>
                                <Text style={{color:StyleConfig.colors.blackColor,fontSize:StyleConfig.fontSize.size_16}}>邮政编码:</Text>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={{flex:1,paddingLeft:10,color: "#999",height: 50 }}
                                    onChangeText={(addreeZip) => this.setState({ addreeZip })}
                                    value={this.state.addreeZip}
                                    underlineColorAndroid={"transparent"}
                                 placeholder={this.placeholderAddreeZip}
                                placeholderTextColor={StyleConfig.colors.hColor}
                                 selectionColor={"#999"} 
                                />
                          
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomColor:StyleConfig.colors.lineColor,borderBottomWidth:1}}>
                                <Text style={{color:StyleConfig.colors.blackColor,fontSize:StyleConfig.fontSize.size_16}}>设置为默认地址:</Text>
                                <View style={{flex:1}}>
                                  
                                    <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={()=>this.setState({defaultAddree:!this.state.defaultAddree})} style={{height: 50, width: 66, alignItems: 'center', justifyContent: 'center' }}>{this.state.defaultAddree ? <Image source={require('../static/images/check.png')} style={{ height: 18, width: 18 }} /> : <Image source={require('../static/images/unCheck.png')} style={{ height: 18, width: 18 }} />}</TouchableOpacity>
                               
                            
                                </View>
                          
                        </View>
                     </View>
                  <TouchableOpacity   
                    activeOpacity={1}
                    onPress={this.saveAddree.bind(this)}
                    style={{marginTop:30,height:45,width:width-20,marginHorizontal:10,backgroundColor:StyleConfig.colors.mainColor,justifyContent:'center',alignItems:'center'}}
                  >
                       <Text style={{color:'#fff',fontSize:StyleConfig.fontSize.size_16}}>保  存</Text>
                   </TouchableOpacity>  
            </View>
        )
    }
}