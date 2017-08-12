import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
Button,
Image,
View,
Dimensions
} from 'react-native';
import  StyleConfig  from '../base/StyleConfig'
import MyListView  from '../components/MyListView'
import  Config from '../config'
import HomeHeader from '../components/HomeHeader'
const {width, height} = Dimensions.get('window');
export default class SpecialOffer extends React.Component {
  static navigationOptions = {
    tabBarLabel: '特价',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
   
    tabBarIcon: ({ focused,tintColor }) => (
      
       <Image
        source={focused?require('../static/images/specialOfferActive.png'):require('../static/images/specialOffer.png')}
         style={{height:28,width:28}}
      />
    ),
  };
  constructor(props){
    super(props)
    this.state={
      searchStr:""
    }
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
        
            url={Config.HOMEGOODS+"&prdName="+((this.state.searchStr&&this.state.searchStr!="")?this.state.searchStr:"")}
            navigation={this.props.navigation}
         
            />
     
       </View>
    );
  }
}