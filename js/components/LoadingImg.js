import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Modal,
    Platform,
    ActivityIndicator
} from 'react-native'
import StyleConfig from '../base/StyleConfig'

export default class Loading extends React.Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     isModal: true,

        // }
    }
   
    render() {
        return (
           <Modal

                visible={this.props.isModal}
                transparent={true}
                onRequestClose={() => { Platform.OS === 'android' ? null : null }}
            >
                <View style={{flex:1, justifyContent: "center", alignItems: 'center' }}>

                     <View style={{height:100,width:100,backgroundColor:'rgba(0,0,0,0.5)',borderRadius:15, flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
                          <ActivityIndicator
                            animating={this.props.isModal}
                            style={{height: 80}}
                            color={'#fff'}
                            size="large"
                          />
                           {/*<Text style={{ color: StyleConfig.colors.defaultFontColor, fontSize: StyleConfig.fontSize.size_14,color:"#fff"}}>{this.props.msg ? this.props.msg : '加载中'}</Text>*/}
                     </View>

                </View>
            </Modal>
        )
    }
}