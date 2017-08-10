import React, { Component } from 'react';
import {
   StyleSheet,
    Text,
    View,

    Image,
    TouchableOpacity,
    Modal,
    Dimensions,
    Platform,
    PixelRatio,
    ScrollView
} from 'react-native';
const {width, height} = Dimensions.get('window');
import Config from '../config'
import ClassifyHeader from '../components/ClassifyHeader'

import MyListView from '../components/MyListView'
import StyleConfig from '../base/StyleConfig'

const filters = [
    { id: 1, name: "综合", subPrdType: "A" },
    { id: 2, name: "销量", subPrdType: "D" },
    { id: 3, name: "价格", subPrdType: "C" },
    { id: 4, name: "筛选",icon:require('../static/images/filter.png'), subPrdType: "ALL" }

];
export default class Classify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemActive: 0,
            type: "A",
            isModal:false,
            classList:[],
            rFilters:{},
            filterStr:"",
            orderBy:"A",
            searchStr:""
            
            
        }
    }
    /*_navBarRight() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                    <Image
                        style={{ tintColor: "#fff", width: 28, height: 28 }}
                        source={require('../images/select.png')} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        style={{ tintColor: "#fff", width: 28, height: 28 }}
                        source={require('../images/home.png')} />
                </TouchableOpacity>
            </View>
        )
    }*/
    componentDidMount() {
    // CWCATCLASS:BASEURL+'/shoppingAction.action?catClassInfo=',
    // ZLCATCLASS:BASEURL+'/shoppingAction.action?zlClassInfo==',
    // LYCATCLASS:BASEURL+'/shoppingAction.action?lyClassInfo=',
    // YPCATCLASS:BASEURL+'/shoppingAction.action?ypClassInfo=',
        let url=null;
      switch(this.props.navigation.state.params.classId){
           case "CW":
           url=Config.CWCATCLASS;break;
            case "ZL":
           url=Config.ZLCATCLASS;break;
            case "LY":
           url=Config.LYCATCLASS;break;
            case "YP":
           url=Config.YPCATCLASS;break;
      }   
      fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
       
        //responseJson.maxpage
         if(responseJson.result=="success"){
            console.log(JSON.stringify(responseJson.fieldsData));
            let data= responseJson.fieldsData;
             let rFilters=[];
             data.map((item,index)=>{
                 if(item.classData){
                     data=data;
                     rFilters.push({"f":index,"s":-1,"codeName":"","type":item.type});
                 }
              
                   
                
            })
             this.setState({
                classList:data,
                rFilters
            })

            
         }
          
      })
       

    }
//   shouldComponentUpdate(nextProps,nextState){
       
//   }
   selectFilters(index,sindex,codeName){
       
       console.log(JSON.stringify(this.state.rFilters));
      let data=this.state.rFilters;
      data[index]['s']=data[index]['s']==sindex?-1:sindex;
      data[index]['codeName']=codeName;
      this.setState({
          rFilters:data
      })
       
    }
    _resetting(){
      let data=this.state.rFilters;
       this.state.rFilters.map((item,index)=>{ 
         data[index]['s']=-1;
         data[index]['codeName']="";
     }) 
      this.setState({
          rFilters:data
      })
     
      
    }
  _confirm(){
      let str="";
     this.state.rFilters.map((item,index)=>{ 
         if(item.s!=-1)
         str+="&"+item.type+"="+item.codeName
     }) 
     this.setState({
         filterStr:str
     })
     console.log(str);
     this._setModalVisible(false)
  }

    renderItem(data,index){
       let  items=[];
     
      if(data){


           {data.map((sitem,sindex)=>{
      items.push(<TouchableOpacity   
                   activeOpacity={1} 
                    key={sindex} 
                    onPress={this.selectFilters.bind(this,index,sindex,sitem.codeName)}
                    style={{borderRadius:6,marginHorizontal:10,marginVertical:5,backgroundColor:(this.state.rFilters)[index]['f']==index&&(this.state.rFilters)[index]['s']==sindex?StyleConfig.colors.mainColor:"#e9e9e9",height:32,width:(width*0.8-60)/3,alignItems:'center',justifyContent:'center'}}>
                     <Text style={{color:(this.state.rFilters)[index]['f']==index&&(this.state.rFilters)[index]['s']==sindex?"#fff":StyleConfig.colors.HSCOlor,fontSize:StyleConfig.fontSize.size_12}}>{sitem.codeValue}</Text>
                    {/*<Text style={{fontSize:StyleConfig.fontSize.size_12}}>{JSON.stringify((this.state.rFilters)[index]['f'])}</Text>*/}
                  </TouchableOpacity>)
                })}

      return items;
      }else{
          return null;
      }
    }


   renderRighFilterItem(data){
       
       let  List=[];
 
          data.map((item,index)=>{
               List.push(<View 
                 key={index}
                 style={{flexDirection:'column',borderBottomColor:StyleConfig.colors.hBgColor,borderBottomWidth:2}}>
                <View style={{
                      borderLeftWidth:3,
                      borderColor:StyleConfig.colors.mainColor,
                      margin:10,
                      marginVertical:5,
                      paddingHorizontal:5,
                      }}>
                     <Text
                  style={{
                     fontSize:StyleConfig.fontSize.size_16}}
                 >{item.title}</Text>
                 
                </View>
              <View style={{flexWrap:'wrap',flexDirection:'row'}}>
                   {this.renderItem(item.classData,index)}
                   {/*<Text>{let m=item.classData;  JSON.stringify((item.classData)[0]}</Text>*/}
                </View>
             </View>)
          })      
              
       return(
           <ScrollView 
             horizontal={false}
           style={{flex:1}}
            style={{flex:1}}>
              {List}
           </ScrollView>
       )
   }
   _setModalVisible(visible){
       
        console.log("------>"+this.state.filterStr);
            this.setState({
                isModal:visible
            })
    }
    renderRighFilter(){
        let styles={
            footerItem:{
              flex:1,
              justifyContent:'center',
              alignItems:'center'
            },
            footerItemText:{
                color:StyleConfig.colors.cColor,
                fontSize:StyleConfig.fontSize.size_16
            }
        }
       return(
          <Modal 
               
                 visible={this.state.isModal}
                 transparent={true}
                 onRequestClose={() =>{Platform.OS ==='android'?null:null}}
                 >
              
              <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.3)'}}>
                  <View style={{width:width*0.8,flex:1,backgroundColor:'#fff',justifyContent:'flex-end',alignSelf:'flex-end',flexDirection:'column'}}>
                   
                         {this.renderRighFilterItem(this.state.classList)}
                    
                     
                      <View style={{height:45,flexDirection:'row', borderTopWidth:1,
        borderColor:StyleConfig.colors.lineColor}}>
                              <TouchableOpacity 
                               activeOpacity={1}
                               style={styles.footerItem}
                               onPress={this._setModalVisible.bind(this,false)}
                               >
                                 <Text
                                    style={styles.footerItemText}
                                 >取消</Text>
                              </TouchableOpacity>
                               <TouchableOpacity 
                               activeOpacity={1}
                                 onPress={this._resetting.bind(this)}
                                style={styles.footerItem}
                               >
                                 <Text
                                   style={styles.footerItemText}
                                   >重置</Text>
                              </TouchableOpacity>
                               <TouchableOpacity 
                                activeOpacity={1}
                                onPress={this._confirm.bind(this)}
                                style={[styles.footerItem,{backgroundColor:StyleConfig.colors.mainColor}]}
                               >
                                 <Text
                                  style={[styles.footerItemText,{color:"#fff"}]}
                                 >确定</Text>
                              </TouchableOpacity>
                              
                      </View>
                  </View>
              </View>
         </Modal>
       )
    }

    _filterItemActive(index,subPrdType) {
   if(subPrdType=="ALL"){
          this._setModalVisible(!this.state.isModal)
     }else{

          if(subPrdType=="C"){
             this.setState({
               orderBy:this.state.orderBy=="A"?"D":"A"
             })
          }
          this.setState({
            itemActive: index,
            type: subPrdType
        }) 
     }
         
      
       
       
    }

    renderFilters(_filters) {

        let ViewList = [];
        _filters.map((item, index) => {
            ViewList.push(
                <TouchableOpacity 
                 activeOpacity={1}
                 key={index}
                 onPress={this._filterItemActive.bind(this,index,item.subPrdType)}
                 style={[styles.filterItem,{flexDirection:'row'}]} key={item.id}>

                    {item.subPrdType=="ALL"?<Image  style={{height:18,width:18,tintColor: StyleConfig.colors.B6Color, paddingVertical: 6}} source={item.icon}/>:<Text  style={[styles.filterItemFont, index == this.state.itemActive ? styles.filterItemFontActive : null]}>{item.name}</Text>}
                    {item.subPrdType=="C"?<View style={{flexDirection:'column',justifyContent:'center',marginLeft:5}}>
                        <Image style={{height:10,width:10,tintColor:this.state.orderBy=="A" ? "#000" : StyleConfig.colors.hColor}} source={require('../static/images/sTop.png')}/>
                        <Image  style={{height:10,width:10,tintColor:this.state.orderBy=="D" ? "#000" : StyleConfig.colors.hColor}} source={require('../static/images/sBottom.png')}/>
                    </View>:null}
                </TouchableOpacity>);
        })

        return (
            <View style={styles.filters}>
                {ViewList}
            </View>
        )
    }
   chageKeyCode(KeyCode){
      this.setState({
          searchStr:KeyCode
      })
  }
    render() {
        let {goBack, state} = this.props.navigation;

        return (
            <View style={styles.container}>
                {/*<Text>{this.state.filterStr}</Text>*/}
                <ClassifyHeader
                    navigation={this.props.navigation}
                    navBarLeftAction={() => goBack()}
                    selectName={state.params.name}
                    chageKeyCode={this.chageKeyCode.bind(this)}
                />
               

                    {this.renderFilters(filters)}
               
                   {this.renderRighFilter()}
                {/*<MyListView
                    removeClippedSubviews={false}
                    // renderHeader={this._renderHeader.bind(this)}
                    url={Config.ClASSIFY + '&prdType=' + state.params.classId + '&subPrdType=' + this.state.type}
                    navigation={this.props.navigation}
                />*/}
                 <MyListView
                    swipeEnabled={true}
                    contentContainerStyle={{paddingHorizontal:5,flexWrap: 'wrap',justifyContent:'space-between',flexDirection:'row'}}
                    animationEnabled={true}
                    removeClippedSubviews={false}
                
                    url={Config.ClASSIFY + '&prdType=' + state.params.classId + '&subPrdType=' + this.state.type+"&orderBy="+this.state.orderBy+this.state.filterStr+"&prdName="+((this.state.searchStr&&this.state.searchStr!="")?this.state.searchStr:"")}
                    navigation={this.props.navigation}
                    itemType={3}
                    classId={state.params.classId}
              />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    filters: {
      
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#fff",
        height:45,
        borderBottomWidth:1,
        borderColor:StyleConfig.colors.lineColor
      
        
    },
    filterItem: {
     
    flex:1,
     flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
      

    },

    filterItemFont: {
       
        // backgroundColor: "#eeeff3",
        paddingVertical: 6,
        textAlign: 'center',
        alignItems: 'center',

        fontSize: 14,
       color: StyleConfig.colors.B6Color
    },
    filterItemFontActive: {
        // borderColor: "#e64275",
        // backgroundColor: "#fff",
        color: StyleConfig.colors.mainColor
    }

})