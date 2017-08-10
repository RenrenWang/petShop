import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import  StyleConfig  from '../base/StyleConfig'

export default class Loading extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
          <View style={{flex:1,flexDirection:'column',justifyContent:"center",alignItems:'center'}}>
               
                  <Text style={{color:StyleConfig.colors.defaultFontColor,fontSize:StyleConfig.fontSize.size_14}}>{this.props.msg?this.props.msg:'加载中...'}</Text>
                  
           </View>
        )
    }
}