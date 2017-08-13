import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
Button,
Image,
View,
Dimensions,
ScrollView,
Text,
TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import  StyleConfig  from '../base/StyleConfig'
import MyListView  from '../components/MyListView'
import  Config from '../config'
import HomeHeader from '../components/HomeHeader'
import Swiper from 'react-native-swiper'
import LoadingImg from '../components/LoadingImg'
const {width, height} = Dimensions.get('window');
export default class SpecialOffer extends React.Component {
  static navigationOptions = {
    tabBarLabel: '套餐',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../static/images/specialOffer.png')}
        style={ [{tintColor: tintColor},StyleConfig.tabIcon]}
      />
    ),
  };
  constructor(props){
      super(props)
      this.state={
            meal:[],
            swiperShow:false,
          
         
            isLoading:true,
          
      }
  }
// componentDidMount() {
//       fetch(Config.MEAL)
//       .then((response) => response.json())
//       .then((responseJson) => {
       
//         //responseJson.maxpage
//          if(responseJson.result=="success"){
//               //alert(JSON.stringify(responseJson.mealData));     
//              this.setState({
//                 meal:responseJson.mealData,
               
//                 isLoading:false
//             })
//             setTimeout(() => {
//             this.setState({
//                 swiperShow: true
//             })
//            },0)
           
//          }
          
//       })
//       .catch(err=>{
//           this.setState({
//               isLoading:true,
//               error:"网络加载失败，请稍后重试"
//           })
//       })
       

//     }

    componentDidMount() {
        fetch(Config.MEAL)
        .then((response) => response.json())
        .then((responseJson) => {
         
          //responseJson.maxpage
           if(responseJson.result=="success"){
               
               this.setState({
                  banner:responseJson.lbData,
                
                  
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
        let swiperHeight = 150;
        if (this.state.swiperShow) {
            return (<Swiper
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
                    
                   
                   return   <View style={{
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
                   
                    </View>
                })}
               
              
                   

                </Swiper>

            )
        } else {
            return <View style={{ width, height: swiperHeight, backgroundColor: "#fff" }}></View>
        }
    }
     _onPress(id,name){ 
     return this.props.navigation.navigate("SetMealD", {id});
   }
  render() {
    return (
      <View style={{flex:1,flexDirection:'column'}}>
           
     
            <MyListView
            swipeEnabled={true}
           renderHeader={this.renderSwiper.bind(this)}
            animationEnabled={true}
            removeClippedSubviews={false}
            url={Config.MEAL}

            navigation={this.props.navigation}
            typeItem={"TC"}
            />
         
           
            {/* <ScrollView 
                horizontal={false}
                style={{flex:1,flexDirection:'column'}}>
                {/*{this.renderSwiper()}
                <View style={{backgroundColor:'#fff',flexDirection:'row',paddingHorizontal:10,height:45,alignItems:'center',justifyContent:'space-between'}}>
                    
                    
                </View>
                    {this.state.meal.map((item,index)=>{
                    
                    return <TouchableOpacity
                        activeOpacity={1}
                        onPress={_.throttle(this._onPress.bind(this,item.gcollIds),1000,{

        'trailing': false
    })}
                key={index} style={{flexDirection:'column',backgroundColor:'#fff',marginTop:10}}>
                                    <Text style={{color:StyleConfig.colors.mainColor,paddingLeft:5,paddingVertical:6,fontSize:StyleConfig.fontSize.size_18}}>{item.gcollName}</Text>
                                    <Image  
                                    resizeMethod="scale"
                                    resizeMode="stretch"
                                    style={{height:300,width}}   source={{uri:Config.BASEURL+item.gcollImguri}}/>
                            </TouchableOpacity>
                })} 
            
                
            </ScrollView> */}
      
       </View>
    );
  }
}