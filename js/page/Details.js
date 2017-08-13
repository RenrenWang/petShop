import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    cropImage,
    ImageEditor,
    Alert,DeviceEventEmitter
} from 'react-native';
import _ from 'lodash';
import Toast, {DURATION} from 'react-native-easy-toast'
import  StyleConfig  from '../base/StyleConfig'
import Config  from '../config'

import Swiper from 'react-native-swiper';

import NavBar from '../components/NavBar'
import Loading from '../components/Loading'

import CommentItem from '../components/CommentItem'
import Panel from '../components/Panel'
import HTMLView from 'react-native-htmlview';
const {width, height} = Dimensions.get('window');

export default class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        
      this.state={
          data:[],
          swiperShow:false,
          banner:[],
          isShowD:false,
          plData:[],
          pbData:[],
          pbPrdData:[],
          isNavBarBg:false,
          isModal:false,
          numberGoods:1,
          isLoading:true
         
      }
      this.swiperHeight=300;
      this._scrollView=null;
    }

  componentDidMount(){
       this.getData();
  } 
    getData(){
       let  id=this.props.navigation.state.params.id;//91;//
       
        fetch(Config.PRODUCTDETAIL+id)
		.then((response) => response.json())
      .then((responseJson) => {
       
       
         if(responseJson.result=="success"){
         //    console.log(JSON.stringify(responseJson.prdSuri));
			this.setState({
					 data:responseJson,
                     plData:responseJson.plData,
                   
                     banner:[responseJson.prdNuri],
                     pbData:responseJson.pbData.length>0?responseJson.pbData[0]:responseJson.pbData,
                     pbPrdData:responseJson.pbPrdData
					})
			
            setTimeout(() => {
                        this.setState({
                            swiperShow: true,
                            isLoading:false
                        })
                    },0)
           }
      })
			.catch(error=>{
				// this.setState({
				// 	result:JSON.stringify(result)
				// })
				console.log(error);
			})
    }
      
      renderSwiper() {
    
        let swiperHeight =this.swiperHeight;
        if (this.state.swiperShow) {
            return (

                <Swiper
                    height={swiperHeight}

                    activeDotColor={StyleConfig.colors.mainColor}
                    horizontal={true}
                    style={{backgroundColor:StyleConfig.colors.SHCOlor}}

                    removeClippedSubviews={false}
                    dotColor="rgba(255,255,255,0.3)"

                    paginationStyle={{
                        bottom:6, left: 0, right: 10,
                       
                    }}

                >
                {this.state.banner.map((item,index)=>{
               
              
                     return   <View style={{
                        width,
                        height: swiperHeight,
                        justifyContent: 'center',
                        backgroundColor: StyleConfig.colors.bgColor
                    }}
                    key={index}
                    >

                        <Image 
                         resizeMethod="scale"
                         resizeMode="stretch"
                         style={{width,height:swiperHeight}} 
                         source={{uri:Config.BASEURLIMG+item}}
                         
                         //source={require('../static/images/banner_1.png')} 
                        />
                   
                    </View>
               
               
                      
                    
                  
                 
                })}
              
                   

                </Swiper>

            )
        } else {
            return <View style={{ width, height: swiperHeight, backgroundColor: StyleConfig.colors.bgColor}}></View>
        }
    }
    renderComment(){
     
        return(
             <View  style={{marginTop:10,paddingHorizontal:10,backgroundColor:"#fff"}}>
                   <View style={{borderBottomColor:StyleConfig.colors.lineColor,borderBottomWidth:1,backgroundColor:"#fff",flexDirection:'row',justifyContent:'space-between',paddingVertical:15}}>
                      <Text style={{fontSize:StyleConfig.fontSize.size_14,color:StyleConfig.colors.defaultFontColor}}>用户评价（{this.state.data.plCount?this.state.data.plCount:0}）</Text>
                     <View style={{flexDirection:'row'}}>
                         <Text style={{color:StyleConfig.colors.SHCOlor,fontSize:StyleConfig.fontSize.size_14}}>查看全部</Text>
                          <Image   style={{tintColor:StyleConfig.colors.SHCOlor,height:20,width:20}} source={require('../static/images/rightArrow.png')}/>
                     </View>
                   </View>
                   <View  key="comment">
                      {this.state.plData.length>0?<CommentItem  item={this.state.plData}/>:null}
                   </View>
                </View>
        )
    }

    
    renderBrand(pbData,pbPrdData){
        return (
            <View  style={{marginTop:10,backgroundColor:"#fff"}}>
                   <View style={{backgroundColor:"#fff",paddingHorizontal:10,flexDirection:'row',justifyContent:'space-between',paddingVertical:15,alignItems:'center'}}>
                     <View style={{flexDirection:'row'}}>
                        <Image   
                        resizeMode="stretch"
                        style={{height:40,width:80}} source={{uri:Config.BASEURL+pbData.brandLogouri}}/>
                        <View style={{justifyContent:'space-between',marginLeft:15}}>
                              <Text style={{fontSize:StyleConfig.fontSize.size_16,color:StyleConfig.colors.defaultFontColor}}>{pbData.brandName}</Text>
                               <Text style={{color:StyleConfig.colors.SHCOlor,fontSize:StyleConfig.fontSize.size_14}}>产地：{pbData.brandArea}</Text>
                        </View>
                     </View>
                     <View style={{flexDirection:'row'}}>
                         <Text style={{color:StyleConfig.colors.SHCOlor,fontSize:StyleConfig.fontSize.size_14}}>查看全部商品</Text>
                          <Image   style={{tintColor:StyleConfig.colors.SHCOlor,height:20,width:20}} source={require('../static/images/rightArrow.png')}/>
                     </View>
                   </View>
                   <View style={{paddingBottom:15}} >
                        <Text style={{paddingHorizontal:10,color:StyleConfig.colors.defaultFontColor,fontSize:StyleConfig.fontSize.size_14,lineHeight:23}}>{pbData.brandText}</Text>
                        <View style={{flexDirection:'row',marginTop:15}}>
                           
                              
                          {pbPrdData.map((item,index)=><View key={index} style={{paddingHorizontal:10,width:(width-15)/3,alignItems:'center',justifyContent:"center"}}>
                                <Image 
                                style={{height:(width-15)/3,width:(width-15)/3}} 
                                source={{uri:Config.BASEURL+item.prdUri}}/>
                               <View style={{alignItems:'flex-start'}}>
                                  <Text numberOfLines={1} style={{marginVertical:2,fontSize:StyleConfig.fontSize.size_16,color:StyleConfig.colors.defaultFontColor}}>{item.prdName}</Text>
                                  <Text style={{fontSize:StyleConfig.fontSize.size_18,color:StyleConfig.colors.mainColor}}>￥{item.prdZkprice}</Text> 
                               </View>
   
                            </View>)}  
                        </View>
                   </View>
                </View>
        )
    }

    addOrder(){
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
      fetch(Config.ADDCART+this.props.screenProps.user.pinfoId+'&prdNums='+this.state.numberGoods+'&prdIds='+this.props.navigation.state.params.id)//
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
             this.refs.toast.show('商品已加入购物车~~',DURATION.LENGTH_LONG);
              DeviceEventEmitter.emit('cartChange', "商品加入购物车");
         }
          
      })
    }
     renderBottom(){
        return( <View style={{backgroundColor:"#fff",flexDirection:'row',justifyContent:'flex-end',height:50,borderTopColor:StyleConfig.colors.lineColor,borderTopWidth:1}}>
                 
                
                  {/* <TouchableOpacity   
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
                </TouchableOpacity> */}
                <TouchableOpacity   
                   activeOpacity={1}
                    onPress={()=>this.props.navigation.navigate("Cart")}
                    style={{height:50,width:width/4,alignItems:'center',justifyContent:'center',borderLeftWidth:1,borderRightWidth:1,borderColor:StyleConfig.colors.lineColor}}
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
                        onPress={_.throttle(this.toOrder.bind(this,this.state.data.prdIds),1000,{

                      'trailing': false
                    })}
                    style={{height:51,width:width/4,backgroundColor:StyleConfig.colors.mainColor,alignItems:'center',justifyContent:'center'}}
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
       return this.props.navigation.navigate("Order", {prdIdsList:[id],prdNumsList:[this.state.numberGoods],NoCreacteOrder:false});
    }
  

    addNumber(){
        this.setState({
            numberGoods:this.state.numberGoods+1
        })
    }
    removeNumber(){
        this.setState({
            numberGoods:this.state.numberGoods>1?this.state.numberGoods-1:1
        })
    }
    _renderView(){
        return (
           <View style={{position:'absolute',bottom:0,height:height*0.6,width,backgroundColor:'#fff'}}>
                
                      <TouchableOpacity   
                          activeOpacity={1}
                          onPress={()=>this.setState({isModal:false})}
                          style={{position:'absolute',right:5,top:5}}
                        >
                             <Image style={{tintColor:StyleConfig.colors.SHCOlor,height:25,width:25}} source={require('../static/images/close.png')}/>
                      </TouchableOpacity>
                  <View style={{flexDirection:'row',padding:10}}>
                      <Image
                         style={{ width: 162/2, height:162/2 }} source={{uri:Config.BASEURLIMG+this.state.data.prdUri}} />
                         <View style={{marginLeft:10,flexDirection:'column',justifyContent:'center'}}>
                               <Text style={{color:StyleConfig.colors.mainColor,fontSize:StyleConfig.fontSize.size_18}}>￥{this.state.data.prdZkprice}</Text>
                               <Text numberOfLines={1} style={{marginVertical:2,fontSize:StyleConfig.fontSize.size_16,color:StyleConfig.colors.defaultFontColor}}>默认规格</Text>
                         </View>
                  </View> 
                  <View style={{borderStyle:"dashed",borderBottomWidth:1,borderBottomColor:StyleConfig.colors.lineColor}}></View>
                  <View style={{flex:1,justifyContent:'space-between'}}>
                  <View style={{padding:10}}>
                      <Text numberOfLines={1} style={{marginVertical:2,fontSize:StyleConfig.fontSize.size_16,color:StyleConfig.colors.defaultFontColor}}>数量</Text>
                      <View style={{borderWidth:1,borderColor:StyleConfig.colors.lineColor,height:35,width:110,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity   
                            activeOpacity={1}
                             onPress={this.removeNumber.bind(this)}
                            style={{borderRightWidth:1,borderRightColor:StyleConfig.colors.lineColor,width:30,alignItems:'center',justifyContent:'center'}}
                            >
                              <Text style={{fontSize:30}}>-</Text>                           
                           </TouchableOpacity>
                              <Text style={{flex:1,borderRightWidth:1,borderRightColor:StyleConfig.colors.lineColor,textAlign:'center'}}>{this.state.numberGoods}</Text>
                             <TouchableOpacity   
                            activeOpacity={1}
                             onPress={this.addNumber.bind(this)}
                            style={{width:30,alignItems:'center',justifyContent:'center'}}
                            >
                               <Text style={{fontSize:20}}>+</Text>
                            </TouchableOpacity>
                      </View>
                 </View>
                  <TouchableOpacity   
                    activeOpacity={1}
                    onPress={()=>this.setState({isModal:false})}
                    style={{marginTop:25,height:45,width,backgroundColor:StyleConfig.colors.mainColor,justifyContent:'center',alignItems:'center'}}
                  >
                       <Text style={{color:'#fff',fontSize:StyleConfig.fontSize.size_16}}>保  存</Text>
                   </TouchableOpacity>  
               </View>
            </View>
        )
    }
    render() {
       let data=this.state.data;
       let imgUrl=Config.BASEURL+data.prdSuri;

         let htmlContent="";
         if(data.prdImgData)
         data.prdImgData.map((item,index)=>{htmlContent+='<img src="'+Config.BASEURLIMG+item.lidFileuri+'" style="width:100%"/>'})
     
        return !this.state.isLoading?<View style={styles.container}>
                <Panel 
              
                isModal={this.state.isModal}
                renderView={this._renderView.bind(this)}
                />
          <NavBar
                    navBarStyles={{position:"absolute",zIndex:999,top:0,width,borderBottomColor:this.state.isNavBarBg?StyleConfig.colors.lineColor:"rgba(255,255,255,0)",borderBottomWidth:1}}
                    title={data.prdName}
                    titleStyle={{color:this.state.isNavBarBg?StyleConfig.colors.SHCOlor:"rgba(255,255,255,0)"}}
                    navBarbgColor={this.state.isNavBarBg?"#fff":"rgba(255,255,255,0)"}//StyleConfig.colors.bgColor
                    StatusBarColor={this.state.isModal?"rgba(0,0,0,0.5)":"#fff"}
                    barStyle="dark-content"
                    navBarLeft={true}
                    share={true}
                    iconStyle={{tintColor:StyleConfig.colors.SHCOlor}}
                    navBarLeftAction={()=>this.props.navigation.goBack()}
                    navBarRight={()=><Image  style={{ width:25,
                    height:25,tintColor:StyleConfig.colors.SHCOlor}} source={require('../static/images/share.png')} />}
                    navBarRightTwo={require('../static/images/rHome.png')}
             />
             <ScrollView
               ref={(scrollView) => { this._scrollView = scrollView}}
             
              
               onScroll={(event) => {
                  
                        this.setState({
                          isNavBarBg:event.nativeEvent.contentOffset.y>50?true:false,
                       })
                 
                     
                  }}
               scrollEventThrottle={500}
             
               showsVerticalScrollIndicator ={false}
             > 
              
                {this.renderSwiper()}
                <View style={{flexDirection:"column",backgroundColor:'#fff',padding:10}}>
                    <View style={{flexDirection:'column'}}>
                         <Text numberOfLines={1} style={{marginVertical:2,fontSize:StyleConfig.fontSize.size_16,color:StyleConfig.colors.defaultFontColor}}>{data.prdName}</Text>
                       <Text numberOfLines={2} style={{fontSize:StyleConfig.fontSize.size_14,color:StyleConfig.colors.hColor}}>{data.prdText}</Text>
                    </View>
            
                    <Text style={{marginTop:10,color:StyleConfig.colors.mainColor,fontSize:StyleConfig.fontSize.size_18,fontWeight:'600'}}>￥{data.prdZkprice}</Text>

                </View>
                <TouchableOpacity   
                   activeOpacity={1}
                   onPress={()=>this.setState({isModal:true})}
                   style={{backgroundColor:"#fff",flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10,paddingVertical:15,marginTop:10}}>
                      <Text style={{color:StyleConfig.colors.hColor,fontSize:StyleConfig.fontSize.size_14,color:StyleConfig.colors.defaultFontColor}}>规格数量选择({this.state.numberGoods})</Text>
                      <Image   style={{tintColor:StyleConfig.colors.SHCOlor,height:20,width:20}} source={require('../static/images/rightArrow.png')}/>
                </TouchableOpacity>
                {this.renderComment()}
                
                {this.state.pbData.brandName?this.renderBrand(this.state.pbData,this.state.pbPrdData):null}
                {/*<TouchableOpacity 
                onPress={()=>{this.setState({
                    isShowD:true
                })}}
                style={{backgroundColor:"#fff",flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10,paddingVertical:15,marginTop:10}}>
                      <Text style={{color:StyleConfig.colors.hColor,fontSize:StyleConfig.fontSize.size_14,color:StyleConfig.colors.defaultFontColor}}>商品详情</Text>
                      <Image   style={{tintColor:StyleConfig.colors.SHCOlor,height:20,width:20}} source={require('../static/images/rightArrow.png')}/>
                </TouchableOpacity>*/}
               <View style={{marginTop:10,flexDirection:'column',backgroundColor:'#fff',}}>
                     {/*<Text style={{textAlign:'center',fontSize:18,marginTop:5,}}>商品详情</Text>
                  
                        <Text>{this.state.data.prdText}{this.props.navigation.state.params.id}</Text>*/}
                        {/*   {data.prdSuri&&data.prdSuri!=""?<Text>{this.state.data.prdText}{this.props.navigation.state.params.id}-{JSON.stringify(data.prdSuri)}</Text>*/}
              {data.prdImgData?<HTMLView
               style={{justifyContent:'center',alignItems:'center'}}
               value={htmlContent}
              />:null}
                      {/*  <Image  
                        onLoadStart={this._onLoadStart.bind(this)}
                        onLoad={this._onLoad.bind(this)}
                        resizeMode="stretch"
                        resizeMethod="scale"
                       style={{width:300,height:300}} source={{uri:'http://wang201579.oss-cn-shanghai.aliyuncs.com/bigImg.jpg?x-oss-process=style/m'}}/>
                        */}
                    
                </View>
              
             </ScrollView>
               <Toast
                    ref="toast"
                    style={{backgroundColor:'rgba(255,255,255,0.8)'}}
                    position='bottom'
                    positionValue={120}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={1}
                    textStyle={{color:StyleConfig.colors.blackColor}}
                />
               {this.renderBottom()}
              
            </View>:<Loading/>
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },

});