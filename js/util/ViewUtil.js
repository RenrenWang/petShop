import React  from 'react'
import {
  View,
  Text,
  Image
}from 'react-native'
import Colors  from '../../res/style/colors'
export default class ViewUtil {

 
   static commentItem() {
        return <View style={{ backgroundColor: "#fff", flexDirection: 'column', padding: 10, justifyContent: 'space-between', borderBottomColor: Colors.dColor, borderBottomWidth: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ height: 35, width: 35, tintColor: Colors.c9Color }} source={require('../../res/images/myIcon.png')} />
                    <Text style={{ fontSize: 16, marginLeft: 15, color: Colors.buleColor }}>用户名</Text>
                </View>
                <Text style={{ fontSize: 16, marginLeft: 15 }}>2017-05-06 13:21</Text>
            </View>
            <Text style={{ marginTop: 20, fontSize: 16, color: Colors.defaultFontColor }}>评论内容评论内容评论内容评论内容</Text>
        </View>
    }
}
