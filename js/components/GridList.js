import React, { Component } from 'react';
import {

  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
 
  Platform,

} from 'react-native';
import _ from 'lodash';
import  StyleConfig  from '../base/StyleConfig'
const {width, height} = Dimensions.get('window');
export default class GridList extends React.Component {
  constructor(props) {
    super(props)

  }
   _onPress(routerName,classId,name){
     return this.props.navigation.navigate(routerName, {classId,name});
   }
  renderGridItems(imgList) {
    var gridItems = [];
    for (let i = 0; i < imgList.length; i++) {
      gridItems.push(
        <TouchableOpacity style={styles.gridItem} key={i} onPress={_.throttle(this._onPress.bind(this,imgList[i]['routerName'],imgList[i]['classId'],imgList[i]['name']),1000,{

  'trailing': false
})}>
          <Image  source={imgList[i]['imgUrl']} key={i} style={styles.gridItemImg} />
          {
           (imgList[i]['name']&&this.props.showText)? <Text style={styles.gridItemText}>{imgList[i]['name']}</Text> : null
          }
        </TouchableOpacity>)
    }
    return gridItems;
  }
  render() {
    return (
      <View style={styles.grid}>
               {this.renderGridItems(this.props.gridList)}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  grid: {

    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  gridItem: {
  
    width: width / 5,
    height:152*(width/StyleConfig.pixSize),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
 

  },
  gridItemImg: {
    
    width: (width-180) / 5,
    height: (width-180) / 5,

  },
  gridItemText: {
    marginTop:5,
    fontSize: 13,
    color: '#6b6b6b',
    backgroundColor: 'transparent',

  }
})