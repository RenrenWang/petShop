import React, { Component } from 'react';
import {
  ListView,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated
} from 'react-native'

import _ from 'lodash';
import ListItem from './ListItem';
import HomeListItem from './HomeListItem';
import  StyleConfig  from '../base/StyleConfig'
import ListTWoRow from './ListTWoRow';
import LoadingImg from './LoadingImg'
const {width, height} = Dimensions.get('window');
const ITEMHEIGHT = 110;
export default class MyListView extends React.Component {

  constructor(props, context) {
    super(props, context);
    this._data = [];
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.page=1;

    this.state = {
     
      dataSource: this.ds.cloneWithRows(this._data),
      isShowLoadIcon: true,
      footerText:"加载中...",
      httpError:false,
      isRefreshing:false,
      showTop:false,
      isLoading:false,
      retunrTopPosition:-35,
      isFirst:true,
      noDate:false
    };
    this._renderFooter = this._renderFooter.bind(this);
  }
  componentDidMount(){
     
     this.getData();
      
  }

componentWillReceiveProps(nextProps){

 if(this.props.url!=nextProps.url){
    //this.getData();
  this._data = [];
  this.setState ({
      dataSource:this.ds.cloneWithRows(this._data),
   
      footerText:"加载中...",
   
      isRefreshing:false,
      isFirst:true,
      noDate:false,
      httpError:false
    });
    this.page=1;
     
 }
  
}
componentDidUpdate(prevProps, prevState){
  
      if(prevProps.url!=this.props.url){
      //  alert(this.props.url);
      
        this.getData();
       
      }
}

// componentWillUnmount(){
 
//     this.cancelable.cancel();
// }
  _onScroll(event){
  let scrollView = event.nativeEvent;
  let y = scrollView.contentOffset.y;

     this.setState({
       retunrTopPosition:y>height?25:-35
     }) 
   

  }

  returnTop(){
   return(<TouchableOpacity
          onPress={() => {
            //this._flatList.scrollToEnd();
           this.listView.scrollTo({y:0,animated:true})
          }}

          style={{ position: 'absolute', right: 10, bottom: this.state.retunrTopPosition, zIndex: 9999 }}
        >
          <Image style={{ tintColor: '#bbb', height: 32, width: 42 }} source={require('../static/images/toTop.png')} />
        </TouchableOpacity>)
  }
  render() {
  //  refreshControl={
  //           <RefreshControl
  //             refreshing={this.state.isRefreshing}
  //             onRefresh={this._onRefresh.bind(this)}
  //               tintColor="#999"
  //             title="Loading..."
  //             titleColor="#999"
  //             colors={[StyleConfig.colors.mainColor]}
  //             progressBackgroundColor="#fff"
  //           />}
    return (
     <View style={{flex:1,position:'relative'}}>
       
       {this.props.isReturnTopthis?this.returnTop():null} 
   
        <ListView
          ref={(listView)=>this.listView=listView}
          initialListSize={8}
         
          onScroll={ _.debounce(this._onScroll.bind(this),500,{
        'leading': true,
        'trailing': false
         })}
          dataSource={this.state.dataSource}
          {...this.props}
        //  renderRow={(this.props.itemKind&&this.props.itemKind==2)?this._renderRow_2.bind(this):this._renderRow.bind(this)}
 

            renderRow={(item,sectionId,rowId)=>{
                  if(this.props.itemType==2){
                     return  this._renderRow_2(item,sectionId,rowId);
                  }else if(this.props.itemType==3){
                     return  this._renderRow_3(item,sectionId,rowId);
                  }else{
                       return this._renderRow(item,sectionId,rowId);
                  }
                }
            }
          onEndReachedThreshold={ITEMHEIGHT * 2}
          onEndReached={this._onEndReached.bind(this)}
       
          style={styles.container}
          pageSize={3}
          enableEmptySections={true}
          renderFooter={() =>this._renderFooter()}
          renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>this.props.separatorType==2?this._renderSeparator_2():this._renderSeparator()}
        />
    </View> 
    );
  }
 getData() {
  
    if(!this.state.noDate){
       this.setState({
          isLoading:true
        }); 
       console.log(this.props.url+'&pageno='+this.page);
      fetch(this.props.url+'&pageno='+this.page++)
      .then((response) => response.json())
      .then((responseJson) => {

        if(responseJson.result=="success"){
          let data=[];
          if(this.props.typeItem==="TC"){
          
            data=responseJson.mealData
          
          }else{
           data=responseJson.data;
          }
         
          console.log(JSON.stringify(data));
          if(data.length<=0&&data){
            return  this.setState({
               dataSource: this.ds.cloneWithRows(this._data),
               
               isFirst: false,
                isLoading:false,
               noDate:true,
               footerText:this.state.isFirst?"暂无数据":"已加载全部数据",
             });
            
          }
             
                
           this._data = this._data.concat(data);
           this.setState({
               dataSource: this.ds.cloneWithRows(this._data),
               
               isFirst: false,
                isLoading:false,
               noDate:responseJson.maxpage<this.page?true:false,
               footerText: responseJson.maxpage<this.page?"已加载全部数据":"加载中...",
               
             });
    
        }else{
          this.setState({
          
            
            isFirst: false,
             isLoading:false,
            noDate:true,
            footerText:this.state.isFirst?"暂无数据":"已加载全部数据",
          });
        }
      }).catch((error) => {
         
           console.log(error);
           this._data = [];
            this.setState({
                dataSource: this.ds.cloneWithRows(this._data),
                isFirst: false,
                noDate:true,
                footerText:"网络加载失败，请稍后重试...",
                isLoading:false,
                httpError:true
              });
        });
      }
  }
  _renderSeparator (sectionID, rowID, adjacentRowHighlighted){
     return <View style={{ height: 1, backgroundColor: '#eeeeee'}} key={rowID} />;
  }
    _renderSeparator_2 (sectionID, rowID, adjacentRowHighlighted){
     return <View style={{ height: 10, backgroundColor: '#eeeeee'}} key={rowID} />;
  }
  _renderFooter() {
    return <View style={{width, paddingVertical:10, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
        <Text>{this.state.footerText}</Text>
      </View>;

  }
  _onEndReached() {
   
 

    if (!this.state.noDate&&!this.state.isFirst) {
      console.log("到底执行" + this.page);
      this.getData();
     
    }
 }
 _onRefresh() {
    this.setState({isRefreshing: true});
    this.getData();
  }
  _renderRow(item,sectionID,rowId) {

return<ListItem itemHeight={ITEMHEIGHT}  typeItem={this.props.typeItem?this.props.typeItem:null}   navigation={this.props.navigation} item={item} />;
  }
  _renderRow_2(item,sectionID,rowId){
    
     //   let result=rowId==0?<FirstItem itemHeight={ITEMHEIGHT} item={item}/>:<HomeListItem itemHeight={ITEMHEIGHT} item={item} />;
    return <HomeListItem itemHeight={120} index={rowId} item={item}  navigation={this.props.navigation} />
    
  }
  _renderRow_3(item,sectionID,rowId){
      return <ListTWoRow   classId={(this.props.classId&&this.props.classId=="CW")?this.props.classId:false} itemHeight={ITEMHEIGHT} listItemBgColor={this.props.listItemBgColor}  navigation={this.props.navigation}  index={rowId} item={item} />
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,

  
  
    flexDirection: 'column',
    backgroundColor: "#eeeeee",


  },
  button: {
    padding: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
  },
  row: {
    padding: 4,
  },
});