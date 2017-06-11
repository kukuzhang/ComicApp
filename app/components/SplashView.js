/**
 * Created by Administrator on 2017/6/11.
 */
import React,{Component} from 'react';
import {
    StyleSheet,View,Image,
    StatusBar,
    Text
    }from 'react-native';

import Root from '../root.js';
import window from '../contants/window.js';
class SplashView extends Component{
    constructor(props){
        super(props)
        this.state={
            isShow:false
        }
    }
    render(){
        let contentView = this.state.isShow ? <Root/> :
            <View style={{flex:1}}>
                <StatusBar
                    translucent={true}
                    backgroundColor="transparent"
                    barStyle="light-content"
                    />
                <Image style={{width:window.width,height:window.height}}
                       resizeMode='stretch'
                       source={require('../images/splash.png')}/>
            </View>
        return contentView;
    }
    componentDidMount(){
        //2s后进行页面切换
        setTimeout(()=>{
           this.setState({
               isShow:true
           });
        },3000);
    }
}

export default SplashView;