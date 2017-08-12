import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
   TouchableOpacity,
  StatusBar,
   Platform,
   Share,Dimensions
} from 'react-native';
const STATUS_BAR_HEIGHT=20;
import  Config from '../config'
import  StyleConfig  from '../base/StyleConfig'
const {width,height} = Dimensions.get('window');
 /*{this.props.title?
               <View  style={styles.navBarCenter}>
                       <Text style={[styles.tips,styles.navBartitleStyle]}>{this.props.title}</Text>
               </View>:
               <TouchableOpacity style={[styles.navBarCenter,styles.selectbox]}>
                       <Image source={require('../../res/images/select.png')} style={[styles.nabBaricon,styles.selectIcon]}/>
                       <Text style={styles.tips}>{this.state.text}</Text>
                     
               </TouchableOpacity>}*/
export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state =({ text: '搜索商品',result:"" });
  }


  _shareText() {
    Share.share({
      message: "http://www..com/",
      url: 'http://www.com/',
      title: '艾宠'
    }, {
      dialogTitle: '分享',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ],
      tintColor: 'green'
    })
    .then(this._showResult)
    .catch((error) => this.setState({result: 'error: ' + error.message}));
  }

  _showResult(result) {
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        this.setState({result: 'shared with an activityType: ' + result.activityType});
      } else {
        this.setState({result: 'shared'});
      }
    } else if (result.action === Share.dismissedAction) {
      this.setState({result: 'dismissed'});
    }
  }
  render() {
    return (
 <View style={{paddingTop:Platform.OS==='ios'?STATUS_BAR_HEIGHT:0,backgroundColor:this.props.navBarbgColor?this.props.navBarbgColor:'#000'}}>    
  
    <StatusBar
     backgroundColor={this.props.StatusBarColor?this.props.StatusBarColor:StyleConfig.colors.mainColor}
     barStyle={this.props.barStyle?this.props.barStyle:"light-content"}
    
   /> 
          <View style={styles.navBar}> 
          {  this.props.navBarLeft?  
              <View style={styles.navBarLeft} >
                 <TouchableOpacity onPress={()=>this.props.navBarLeftAction()}>{/**/}
                        <Image source={require('../static/images/arrow.png')} style={[styles.nabBaricon,styles.leftIcon,this.props.iconStyle?this.props.iconStyle:{}]}/>
                 </TouchableOpacity>
              </View>:null
        }
              <View  style={styles.navBarCenter}>
                       <Text numberOfLines={1} style={[styles.tips,styles.navBartitleStyle,this.props.titleStyle?this.props.titleStyle:{}]}>{this.props.title}</Text>
             </View>
            {
               this.props.navBarRight?  
               <View style={styles.navBarRight}>
                    {this.props.navBarRightTwo?<TouchableOpacity
                     onPress={this.props.navBarRightTwoAction?this.props.navBarRightTwoAction:()=>{}}
                     style={{marginHorizontal:10}}
                     >
                        <Image source={this.props.navBarRightTwo} style={[styles.nabBaricon,styles.leftIcon,this.props.iconStyle?this.props.iconStyle:{}]}/>
                     </TouchableOpacity>:null}
                      <TouchableOpacity onPress={()=>this.props.share?this._shareText():this.props.navBarRightAction()}>{/**/}
                        {/*<Image source={this.props.navBarRight} style={[styles.nabBaricon,styles.leftIcon,this.props.iconStyle?this.props.iconStyle:{}]}/>*/}
                        {this.props.navBarRight()}
                     </TouchableOpacity>
                          {/*<Text style={[styles.tips,styles.navBartitleStyle]}>dsdsds</Text>*/}
                          {/*{this.props.navBarRight}*/}
               </View>:null
            }
          </View>
        </View>
    );
  }
}

const styles=StyleSheet.create({
    navBar:{
    
       flexDirection:'row',
       alignItems:'center',
       height:50,
      
       paddingHorizontal:10,
       justifyContent:'space-between',
       
    },
    nabBaricon:{
     tintColor:"#fff",
     width:25,
     height:25
    },
    navBarLeft:{
      flexDirection:'row'
    },
    navBarRight:{
     
       flexDirection:'row'
    },
    selectIcon:{
      width:26,
     height:26
    },
    tips:{
     color:"#fff",
     fontSize:14,
     marginLeft:5,
    },
    navBarCenter:{
      position:'absolute',
      height:30,
     
      left:50,
      right:50,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
  
     // borderRadius:15,
    //  paddingHorizontal:15,
  },
  navBartitleStyle:{
    fontSize:18,
   textAlign:'center'
   
  },
  selectbox:{
    borderBottomWidth:1,
    borderColor:"#fff",
  }
})

