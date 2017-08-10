import  React  from 'react'
import {
    Text,
    View,
    Button,
    Image,
    Dimensions,
    TouchableOpacity
}  from  'react-native'
import _ from 'lodash';
import  StyleConfig  from '../base/StyleConfig'
import  Config from '../config'
import Tool from '../util/Tool';
const {width,height} = Dimensions.get('window');
export   default   class CommentItem extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
     let item= this.props.item;
     
        return(
          <View style={{flexDirection:'column',backgroundColor:"#fff",flexDirection:'column', paddingVertical: 10, justifyContent: 'space-between', borderBottomColor: StyleConfig.colors.lineColor, borderBottomWidth: 0 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ height: 40, width: 40,borderRadius:20 }} source={require('../static/images/avatar.png')} />
                    <Text style={{ fontSize: StyleConfig.fontSize.size_16, marginLeft: 10, color: StyleConfig.colors.defaultFontColor }}>{item[0]['pinfoName']}</Text>
                </View>
                <Text style={{ fontSize: StyleConfig.fontSize.size_14, marginLeft: 15 }}>{Tool.format(item[0]['commDate'])}</Text>
            </View>
            <View>
                <Text style={{ marginVertical:15, fontSize: StyleConfig.fontSize.size_16, color: StyleConfig.colors.defaultFontColor,paddingHorizontal:5 }}>{item[0]['commText']}</Text>
                <View style={{flexDirection:'row'}}>
                   {item[1]['imgdata'].map((sitem,index)=><Image key={index}  style={{height:80,width:80,marginRight:10,borderRadius:8}} source={{uri:Config.BASEURL+sitem.commimgUri}}/>)}
                   
                </View>
            </View>
        </View>
        )
    }
}