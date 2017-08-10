import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';

import CountDownTimer from 'react_native_countdowntimer' 
export default class Timing extends Component {
    constructor(props) {
        super(props);
        this.countDown=null;
        this.state = {
            endTime:this.props.endTime
        }

    }


    shouldComponentUpdate(nextProps,nextState){
           if(nextProps.endTime==this.props.endTime){
               
             return true
           }else{
               return false;
           }
    }
    //componentWillMount(){

    //       let self = this;
    //         this.countDown = Countdown.init({
    //         startTime: '2016-01-01 19:35:11:0',//new Date().Format("yyyy-MM-dd hh:mm:ss"),
    //         // endTime: new Date(this.props.endTime).Format("yyyy-MM-dd hh:mm:ss"),
    //         unit: {
    //             day: true,
    //             hour: true,
    //             minute: true,
    //             second: true
    //         },
    //         onStart() {
    //             console.log('start!');
    //         },
    //         onChange(value) {
    //             // console.log(value)
    //             // like: { day: 107,hour: 20,minute: 41,second: 10 }
    //             console.log(value);
    //             self.setState({
    //                 time: value
    //             })

    //         },
    //         onStop() {
    //             console.log('stop!');
    //         }
    //     });
    //    this.countDown.start = function () { };
    // }
    // componentDidMount(){
    //      this.countDown.start = function () { };
    // }
    // componentWillUpdate(){
    //   this.countDown.start = function () { };
    // }
   

    render() {
   
        
     
        return (
            /*<View style={{ flexDirection: 'row',alignItems:'center',marginLeft:this.props.mLeft?this.props.mLeft:0}}>
               {this.state.time.day>=0?<View style={styles.box}><View style={styles.item}> 
                     <Text style={styles.timeText}>{this.state.time.day}</Text>
                </View><Text style={styles.semicolon}>:</Text></View>:null} 
                     {this.state.time.hour>=0?<View style={styles.box}><View style={styles.item}> 
                     <Text style={styles.timeText}>{this.state.time.hour}</Text>
                </View><Text style={styles.semicolon}>:</Text></View>:null} 
                   {this.state.time.minute>=0?<View style={styles.box}><View style={styles.item}> 
                     <Text style={styles.timeText}>{this.state.time.minute}</Text>
                </View><Text style={styles.semicolon}>:</Text></View>:null} 
                
                   {this.state.time.second>=0?<View style={styles.box}><View style={styles.item}> 
                     <Text style={styles.timeText}>{this.state.time.second}</Text>
                </View></View>:null} 
               
            </View>*/
            <View style={{ marginTop:this.props.mTop?this.props.mTop:0,marginLeft:this.props.mLeft?this.props.mLeft:0}}>
            <CountDownTimer
                 date={new Date(this.state.endTime)}
                //date={Math.round(new Date()/1000)+60*60*60*60}
                days={{plural: '天',singular: '天'}}
                hours=':'
                mins=':'
                segs=''
                daysStyle={[styles.timeText,styles.daysText]}
                hoursStyle={styles.timeText}
                minsStyle={styles.timeText}
                secsStyle={styles.timeText}
               
                />
          </View>
        );
    }
}


const styles = StyleSheet.create({
    box:{
        flexDirection:'row',
        alignItems:'center'
    },
 
    timeText:{
        height:20,
        width:25,
        backgroundColor:'#000',
        marginHorizontal:3,
        justifyContent:'center',
        borderRadius:2,
        color:'#fff',
        fontSize:14,
        textAlign:'center'
    },
    daysText:{
        height:20,
        width:40,
    },
    semicolon:{
      
        fontSize:14,
        color:"#000",
        
    }
})