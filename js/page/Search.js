import React from 'react'
import {
    Image,
    View,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    TextInput,

} from 'react-native'
import _ from 'lodash';
import StyleConfig from '../base/StyleConfig'
import Config from '../config'
import ClassifyHeader from '../components/ClassifyHeader'
const {width, height} = Dimensions.get('window');
export default class Search extends React.Component {
    constructor(props) {
        super(props)
        this.placeholder = "搜索"
        this.state = {
            keyCode: ""
        }
    }
    render() {
        let {goBack, state} = this.props.navigation;

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, height: 50, backgroundColor: StyleConfig.colors.mainColor }}>
                    <View style={{ flex: 1, position: 'relative' }}>
                        <TextInput
                            underlineColorAndroid='transparent'
                            style={{ padding: 0, paddingLeft: 10, paddingRight: 30, height: 32, backgroundColor: '#fff', borderRadius: 5 }}
                            onChangeText={(keyCode) => this.setState({ keyCode })}
                            value={this.state.keyCode}
                            placeholder={this.placeholder}
                            placeholderTextColor={StyleConfig.colors.mainColor}
                           selectionColor={"#999"} 
                        />
                        <Image style={{ tintColor: StyleConfig.colors.mainColor, height: 20, width: 20, position: 'absolute', right: 5, top: 6 }} source={require('../static/images/search.png')} />
                    </View>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={()=>this.props.navigation.goBack()}
                    >
                        <Text style={{ fontSize: StyleConfig.fontSize.size_14, color: "#fff", marginLeft: 8 }}>取消</Text>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor:"#fff"}}>
                    <View style={{
                        borderLeftWidth: 3,
                        borderColor: StyleConfig.colors.mainColor,
                        margin: 10,
                       
                        paddingHorizontal: 5,
                    }}>
                        <Text
                            style={{
                                fontSize: StyleConfig.fontSize.size_14
                            }}
                        >热门搜索</Text>

                    </View>
                    <View style={{flexWrap:'wrap',flexDirection:'row'}}>
                         <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingVertical:5,paddingHorizontal:5,borderColor:StyleConfig.colors.lineColor,borderWidth:1,margin:5}}>
                              <Text style={{fontSize:StyleConfig.fontSize.size_14}}>标签一</Text>
                          </View>
                          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingVertical:5,paddingHorizontal:5,borderColor:StyleConfig.colors.lineColor,borderWidth:1,margin:5}}>
                              <Text style={{fontSize:StyleConfig.fontSize.size_14}}>标签一</Text>
                          </View>
                           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingVertical:5,paddingHorizontal:5,borderColor:StyleConfig.colors.lineColor,borderWidth:1,margin:5}}>
                              <Text style={{fontSize:StyleConfig.fontSize.size_14}}>标签一标签一标签一</Text>
                          </View>
                           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingVertical:5,paddingHorizontal:5,borderColor:StyleConfig.colors.lineColor,borderWidth:1,margin:5}}>
                              <Text style={{fontSize:StyleConfig.fontSize.size_14}}>标签一标签一标签一</Text>
                          </View>
                    </View>
                </View>
            </View>
        )
    }
}