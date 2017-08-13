import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
Button,
Image,
View,
ScrollView,
Dimensions,
Text,
TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import  StyleConfig  from '../base/StyleConfig'
import MyListView  from '../components/MyListView'
import  Config from '../config'
import HomeHeader from '../components/HomeHeader'
import SetTimeItem from '../components/SetTimeItem'
import Timing from '../components/Timing'
import Loading from '../components/Loading'
import Swiper from 'react-native-swiper'

const {width, height} = Dimensions.get('window');

export default class SpecialOffer extends React.Component {
    constructor(props){
        super(props);
        this.state={
            banner:[],
            swiperShow:false,
            setTimeGoods:[],
            endTime:new Date().getTime(),
            isLoading:true,
            error:"加载中..."
        }
    }
componentDidMount() {
      fetch(Config.SETTIME)
      .then((response) => response.json())
      .then((responseJson) => {
       
        //responseJson.maxpage
         if(responseJson.result=="success"){
        
             this.setState({
                banner: [responseJson.lbData[0]],
                endTime:responseJson.lbData[0]['endDate']?responseJson.lbData[0]['endDate']:this.state.endTime,
                setTimeGoods:responseJson.data,
                isLoading:false
            })
            setTimeout(() => {
            this.setState({
                swiperShow: true
            })
           },0)
           
         }
          
      })
      .catch(err=>{
          this.setState({
              isLoading:true,
              error:"网络加载失败，请稍后重试"
          })
      })
       

    }
 renderSwiper() {
        let swiperHeight = 290*(width/StyleConfig.pixSize);
        if (this.state.swiperShow) {
            return (

                <Swiper
                    height={swiperHeight}

                    activeDotColor={StyleConfig.colors.mainColor}
                    horizontal={true}


                    removeClippedSubviews={false}
                    dotColor="rgba(255,255,255,0.3)"

                    paginationStyle={{
                        bottom:6, left: 0, right: 10
                    }}

                >
                {this.state.banner.map((item,index)=>{
                    
                   
                   return  <TouchableOpacity
                    activeOpacity={1}
                      onPress={_.throttle(()=>this.props.navigation.navigate("Details", {id:item.prdIds}),1000,{

    'trailing': false
  })}
  style={{
                        width,
                        height: swiperHeight,
                        justifyContent: 'center',
                        backgroundColor: 'transparent'
                    }}
                    key={index}
                    >

                        <Image 
                         resizeMode="cover"
                         style={{width,height:swiperHeight}} 
                         source={{uri:Config.BASEURLIMG+item.prdNuri}} />
                   
                    </TouchableOpacity>
                })}
               
              
                   

                </Swiper>

            )
        } else {
            return <View style={{ width, height: swiperHeight, backgroundColor: "#fff" }}></View>
        }
    }
    
  render() {
    return (
      <View style={{flex:1,flexDirection:'column'}}>
           
             {!this.state.isLoading?<ScrollView 
              horizontal={false}
             style={{flex:1,flexDirection:'column'}}>
            {this.renderSwiper()}
            <View style={{backgroundColor:'#fff',flexDirection:'row',paddingHorizontal:10,height:45,alignItems:'center',justifyContent:'space-between'}}>
                     <Text style={{color:StyleConfig.colors.blackColor,fontSize:StyleConfig.fontSize.size_16}}>限时限量抢购中</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                          <Text style={{color:StyleConfig.colors.hColor,fontSize:StyleConfig.fontSize.size_14}}>距离结束</Text>
                          <Timing endTime={this.state.endTime} mLeft={10}/>
                    </View>
            </View>
                   {this.state.setTimeGoods.map((item,index)=>{
                 
                   return <View  key={index} style={{flexDirection:'column',backgroundColor:'#fff',marginTop:10}}><Timing endTime={item.endDate?item.endDate:new Date()} mTop={5} mLeft={10}/><SetTimeItem item={item} key={index}  navigation={this.props.navigation}/></View>
               })} 
         
             
           </ScrollView>:<Loading/>}
       </View>
    );
  }
}