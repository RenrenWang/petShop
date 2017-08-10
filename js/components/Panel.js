import  React  from 'react'
import {
    Text,
    View,
   
    Image,
    Modal,
    Dimensions,
    TouchableOpacity,
    Platform, animation,StatusBar
}  from  'react-native'
import _ from 'lodash';
import  StyleConfig  from '../base/StyleConfig'
import  Config from '../config'

const {width,height} = Dimensions.get('window');
export   default   class Panel extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
    
     
        return(
          <Modal
              
                
                animationType={this.props._animationType?this.props._animationType:"slide"}
                visible={this.props.isModal}
                transparent={true}
                onRequestClose={() => { Platform.OS === 'android' ? null : null }}
                style={{flex:1,backgroundColor:"rgba(0,0,0,0.5)"}}
            >   
                <TouchableOpacity 
                activeOpacity={1}
                style={{flex:1,backgroundColor:"rgba(0,0,0,0.5)"}}
                onPress={this.props.action}
                >
         
                     
                      {this.props.renderView()}
                     
                </TouchableOpacity>
          </Modal>
        )
    }
}