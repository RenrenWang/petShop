import  React  from 'react'
import{
   Image,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
   TextInput,
  Alert
}  from 'react-native'
import _ from 'lodash';
import  StyleConfig  from '../base/StyleConfig'
import Tool from '../util/Tool';
import  Config from '../config'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Loading from '../components/Loading'
const {width, height} = Dimensions.get('window');
export  default  class MyPet  extends React.Component{
    constructor(props){
        super(props)
        this.placeholderPetName="请输入宠物的名字"
        this.placeholderPetBreed="请输入宠物的品种"
        this.state={
            petName:"",
             petBreed:'',
             isDateTimePickerVisible: false,
             carDirthday:"请输入宠物生日",
             formatcarEntertime:"选填",
             sex:true,
             type:1,
             isLogin:true
        }
    }
 _showDateTimePicker = (n) => this.setState({ isDateTimePickerVisible: true,type:n });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    
   if(this.state.type==1){
     this.setState({
        carDirthday:Tool.format(date,true)
    })
   }else{
     this.setState({
        formatcarEntertime:Tool.format(date,true)
    })
   }
   
    this._hideDateTimePicker();
  };
 
  componentDidMount(){

     fetch(Config.MYPET+this.props.screenProps.user.pinfoId)//this.props.screenProps.user.pinfoId
      .then((response) => response.json())
      .then((responseJson) => {
       //  alert(JSON.stringify(responseJson))
        //responseJson.maxpage
         if(responseJson.result=="success"){
        
          // alert(JSON.stringify(responseJson))
             this.setState({
                data:responseJson.data[0],
                petName:responseJson.data[0].carName,
                petBreed:responseJson.data[0].carClass,
                carDirthday:Tool.format(responseJson.data[0].carDirthday,true),
                formatcarEntertime:Tool.format(responseJson.data[0].formatcarEntertime,true),
                sex:(responseJson.data[0].carSex=="男"||responseJson.data[0].carSex=="性别")?true:false
            })
        
           
         }
           this.setState({
              isLogin:false
          })
      })
  }

  save(){
    //  console.log(Config.MYPET+this.props.screenProps.user.pinfoId+'&dataType=SAVE&carName='+this.state.petName+'&carSex='+(this.state.sex?"男":'女')+'&carClass='+this.state.petBreed+'&carDirthday='+this.state.carDirthday+'&carEntertime='+this.state.formatcarEntertime);
       fetch(Config.MYPET+this.props.screenProps.user.pinfoId+'&dataType=SAVE&carName='+this.state.petName+'&carSex='+(this.state.sex?"男":'女')+'&carClass='+this.state.petBreed+'&carDirthday='+this.state.carDirthday+'&carEntertime='+this.state.formatcarEntertime)//this.props.screenProps.user.pinfoId
      .then((response) => response.json())
      .then((responseJson) => {
//alert(JSON.stringify(responseJson))
        //responseJson.maxpage
         if(responseJson.result=="success"){
        
          Alert.alert(
                        '',
                       "保存成功",
                        [
                            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            { text: '确定', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false }
                    );
             
        
           
         }
         
      })
  }
  selectSex(sex){
    this.setState({
        sex:sex
    })
  }
    
    render(){
       console.log("formatcarEntertime---->"+this.state.formatcarEntertime)
        return(!this.state.isLogin?<ScrollView 
             horizontal={false}
             style={{flex:1,flexDirection:'column'}}>
            <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
                <View style={{height:160,alignItems:'center',justifyContent:'center'}}>
                       <View style={{position:'relative',alignItems:'center',justifyContent:'center'}}>
                           <Image    style={{height:100,width:100,position:'relative',top:5}} source={require('../static/images/petAvatar.png')}/>
                           <Image   style={{height:16,width:20,position:'absolute',right:8,bottom:0}} source={require('../static/images/camera.png')}/>
                          
                       </View>
                </View>
                <View style={{flexDirection:'column',flex:1,backgroundColor:'#fff'}}>
                    <View style={{paddingHorizontal:15}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomColor:StyleConfig.colors.lineColor,borderBottomWidth:1}}>
                                <Text style={{color:StyleConfig.colors.blackColor,fontSize:StyleConfig.fontSize.size_16}}>宠物名称</Text>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={{paddingLeft:10,textAlign:'right',color: "#999",width:130,height: 50,alignSelf:'flex-end' }}
                                    onChangeText={(petName) => this.setState({ petName })}
                                    value={this.state.petName}
                                    underlineColorAndroid={"transparent"}
                                placeholder={this.placeholderPetName}
                               placeholderTextColor={StyleConfig.colors.hColor}
                                selectionColor={"#999"} 
                                />

                            </View>
                    </View>
                     <View style={{paddingHorizontal:15,backgroundColor:'#fff'}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomColor:StyleConfig.colors.lineColor,borderBottomWidth:1}}>
                                <Text style={{color:StyleConfig.colors.blackColor,fontSize:StyleConfig.fontSize.size_16}}>宠物性别</Text>
                                <View
                                style={{flexDirection:'row',alignItems:'center',paddingLeft:10,width:130,height: 50,alignSelf:'flex-end',justifyContent:'flex-end'}}
                                >
                                <TouchableOpacity
                                 onPress={this.selectSex.bind(this,true)}
                                  activeOpacity={1}
                                  style={{marginHorizontal:5}}
                                >
                                    <Image   style={{tintColor:this.state.sex?"#548bee":StyleConfig.colors.hColor,width:40/1.8,height:50/1.8}} source={require('../static/images/sex.png')}/>
                                </TouchableOpacity> 
                                 <TouchableOpacity
                                 onPress={this.selectSex.bind(this,false)}
                                  activeOpacity={1}
                                    style={{marginHorizontal:5}}
                                >
                                    <Image   style={{tintColor:!this.state.sex?StyleConfig.colors.mainColor:StyleConfig.colors.hColor,width:40/1.8,height:50/1.8}} source={require('../static/images/sex.png')}/>
                                </TouchableOpacity> 
                                </View>

                          </View>
                    </View>
                     <View style={{paddingHorizontal:15,backgroundColor:'#fff'}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomColor:StyleConfig.colors.lineColor,borderBottomWidth:1}}>
                                <Text style={{color:StyleConfig.colors.blackColor,fontSize:StyleConfig.fontSize.size_16}}>宠物品种</Text>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={{paddingLeft:10,textAlign:'right',color: "#999",width:130,height: 50,alignSelf:'flex-end' }}
                                    onChangeText={(petBreed) => this.setState({ petBreed })}
                                    value={this.state.petBreed}
                                    underlineColorAndroid={"transparent"}
                                 placeholder={this.placeholderPetBreed}
                                placeholderTextColor={StyleConfig.colors.hColor}
                                 selectionColor={"#999"} 
                                />

                            </View>
                    </View>
                    <View style={{paddingHorizontal:15,backgroundColor:'#fff'}}>
                        <TouchableOpacity 
                         activeOpacity={1}
                        onPress={this._showDateTimePicker.bind(this,1)} style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomColor:StyleConfig.colors.lineColor,borderBottomWidth:1}}>
                                <Text style={{color:StyleConfig.colors.blackColor,fontSize:StyleConfig.fontSize.size_16}}>宠物生日</Text>
                                <View 
                                style={{flexDirection:'row',alignItems:'center',paddingLeft:10,width:130,height: 50,alignSelf:'flex-end',justifyContent:'flex-end'}}
                                >
                                <Text style={{color:StyleConfig.colors.hColor,fontSize:StyleConfig.fontSize.size_14}}>{this.state.carDirthday}</Text>
                                
                                <Image   style={{tintColor:StyleConfig.colors.hColor,height:16,width:16}} source={require('../static/images/rightArrow.png')}/>
                                </View>

                            </TouchableOpacity>
                    </View>
                    <View style={{paddingHorizontal:15,backgroundColor:'#fff'}}>
                          <TouchableOpacity 
                          activeOpacity={1}
                          onPress={this._showDateTimePicker.bind(this,2)} style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomColor:StyleConfig.colors.lineColor,borderBottomWidth:1}}>
                                <Text style={{color:StyleConfig.colors.blackColor,fontSize:StyleConfig.fontSize.size_16}}>进家时间</Text>
                                <View 
                                style={{flexDirection:'row',alignItems:'center',paddingLeft:10,width:130,height: 50,alignSelf:'flex-end',justifyContent:'flex-end'}}
                                >
                                <Text style={{color:StyleConfig.colors.hColor,fontSize:StyleConfig.fontSize.size_14}}>{this.state.formatcarEntertime}</Text>
                                
                                <Image   style={{tintColor:StyleConfig.colors.hColor,height:16,width:16}} source={require('../static/images/rightArrow.png')}/>
                                </View>

                            </TouchableOpacity>
                    </View>
                      
                </View>
                 <TouchableOpacity   
                                            activeOpacity={1}
                                          onPress={this.save.bind(this)}
                                        style={{alignSelf:'center',borderRadius:10,marginTop:25,height:45,width:width*0.9,backgroundColor:StyleConfig.colors.mainColor,justifyContent:'center',alignItems:'center'}}
                                        >
                                             <Text style={{color:'#fff',fontSize:StyleConfig.fontSize.size_16}}>保  存</Text>
                     </TouchableOpacity>            
           
            </ScrollView>:<Loading/>
        )
    }
}