import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Button,
    Image,
    View,
    Text,
Dimensions,
TouchableOpacity,
StatusBar
} from 'react-native';
import _ from 'lodash';

import  StyleConfig  from '../base/StyleConfig'
import HomeHeader from '../components/HomeHeader'
import GridList  from '../components/GridList'
import SetTimeItem  from '../components/SetTimeItem'
import Swiper from 'react-native-swiper'
import MyListView  from '../components/MyListView'
import  Config from '../config'
import Timing from '../components/Timing'
const {width, height} = Dimensions.get('window');// prdType分类：CW-宠物/ZL-主粮/LY-零食/YP-日用品/TC-套餐;
// subPrdType代表四类，默认A->按时间倒顺,价格C大到小,人气D销量大到小。
// 实现商品名称检索条件
let kindList = [
  { imgUrl: require('../static/images/kind_1.png'), name: "宠物",classId:'CW',routerName:"Classify"},
  {  imgUrl: require('../static/images/kind_2.png'), name: "主粮",classId:'ZL' ,routerName:"Classify"},
  { imgUrl: require('../static/images/kind_3.png'), name: "零食",classId:'LY' ,routerName:"Classify"},
  { imgUrl: require('../static/images/kind_4.png'), name: "日用品",classId:'YP',routerName:"Classify"},
  {imgUrl: require('../static/images/kind_5.png'), name: "套餐",classId:'TC' ,routerName:"SetMeal"},


];
export default class Home extends React.Component {
  static navigationOptions = {
    tabBarLabel: '主页',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ focused,tintColor }) => (
      
       <Image
        source={focused?require('../static/images/homeActive.png'):require('../static/images/home.png')}
        style={{height:28,width:28}}
      />
    ),
  };
  constructor(props){
    super(props)
   this.state={
     swiperShow:false,
     banner:[],
     setTimeGoods:[],
     endTime:new Date().getTime(),
     searchStr:""
   }
  
  }
  
    componentDidMount() {

       
      fetch(Config.HOMEGOODS)
      .then((response) => response.json())
      .then((responseJson) => {
       
        //responseJson.maxpage
         if(responseJson.result=="success"){
          
             this.setState({
                banner:responseJson.lbData,
                setTimeGoods:responseJson.xlData,
                 endTime:responseJson.xlData.length>0?responseJson.xlData[0]['endDate']:new Date().getTime()
            })
            setTimeout(() => {
            this.setState({
                swiperShow: true,
              
            })
           },0)
           
         }
          
      })
       

    }
    

  
  renderSwiper() {
    
        let swiperHeight =150;
        if (this.state.swiperShow) {
            return (

                <Swiper
                    height={swiperHeight}

                    activeDotColor={StyleConfig.colors.mainColor}
                    horizontal={true}

       
                    removeClippedSubviews={false}
                    dotColor="rgba(255,255,255,0.3)"
                    dotStyle={{height:6,width:6}}
                    activeDotStyle={{height:6,width:6}}
                    paginationStyle={{
                        bottom:5,
                       
                    }}
                  loop={true}
                  autoplay={true}
                  
                >
                {this.state.banner.map((item,index)=>{
               
              
                     return <TouchableOpacity
                    activeOpacity={1}
                      onPress={_.throttle(()=>this.props.navigation.navigate("Details", {id:item.prdIds}),1000,{

    'trailing': false
  })}style={{
                        width,
                        height: swiperHeight,
                        justifyContent: 'center',
                        backgroundColor: 'transparent'
                    }}
                    key={index}
                    >

                        <Image 
                         resizeMethod="scale"
                         resizeMode="stretch"
                         style={{width,height:swiperHeight}} 
                        source={{uri:Config.BASEURLIMG+item.prdNuri}}
                       // source={{uri:"https://img.alicdn.com/imgextra/i2/161/TB2EEsLblEOyuJjy0FdXXbzApXa_!!161-0-luban.jpg_q50.jpg"}}
                         //
                        // source={require('../static/images/banner_1.png')} 
                        />
                   
                    </TouchableOpacity>
               
               
                      
                    
                  
                 
                })}
              
                   

                </Swiper>

            )
        } else {
            return <View style={{ width, height: swiperHeight, backgroundColor: "#fff" }}></View>
        }
    }
   renderTime(){
              if(this.state.swiperShow){ return<Timing endTime={this.state.endTime} mLeft={15}/> }else{return null}
    }

  _renderHeader(){

   
      return <View>

             {this.renderSwiper()}
           <GridList key="kind" gridList={kindList} showText={true} navigation={this.props.navigation} />
           <View style={{flex:1,flexDirection:'column',marginTop:10,backgroundColor:'#fff'}}>
               <View style={{paddingHorizontal:10,height:40,alignItems:'center',flexDirection:'row'}}>
                     <Text style={{paddingLeft:10,borderLeftWidth:3,borderColor:StyleConfig.colors.mainColor,color:StyleConfig.colors.blackColor,fontSize:StyleConfig.fontSize.size_16}}>艾宠限时购</Text>
                       {this.renderTime()}
               </View>
               {this.state.setTimeGoods.map((item,index)=>{
                   if(index==0){
                    
                
               return <SetTimeItem item={item} key={index} isHome={true} navigation={this.props.navigation}/>
                       
                   }
                 
               })} 
              
               {/*<SetTimeItem item={this.state.setTimeGoods[0]}/>*/}
           </View>
            {/*<View style={{flex:1,flexDirection:'column',marginTop:10,backgroundColor:'#fff',}}>*/}
               <View style={{marginTop:10,height:40,justifyContent:'center',flexDirection:'column',paddingHorizontal:10,backgroundColor:'#fff'}}>
                     <Text style={{paddingLeft:10,borderLeftWidth:3,borderColor:StyleConfig.colors.mainColor,color:StyleConfig.colors.blackColor,fontSize:StyleConfig.fontSize.size_16}}>艾宠优选</Text>
              </View>
               
           {/*</View>*/}
      </View>
  }
  chageKeyCode(KeyCode){
      this.setState({
          searchStr:KeyCode
      })
  }
  render() {
    return (
       <View style={{flex:1,flexDirection:'column'}}>
            <HomeHeader   navigation={this.props.navigation} chageKeyCode={this.chageKeyCode.bind(this)}/>
          
                <MyListView
                swipeEnabled={true}
               
                animationEnabled={true}
                removeClippedSubviews={false}
                renderHeader={this._renderHeader.bind(this)}
                url={Config.HOMEGOODS+"&prdName="+((this.state.searchStr&&this.state.searchStr!="")?this.state.searchStr:"")}
                navigation={this.props.navigation}
                itemType={2}
                style={{flexWrap: 'wrap',alignItems:'center',flexDirection:'row'}}
                
                />
           
       </View>
    );
  }
}