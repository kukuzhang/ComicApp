/**
 * Created by Administrator on 2017/6/2.
 */
import React,{Component} from 'react';
import {
    View,Text
    } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import GirlPage from './girlPage';
import TanbiPage from './tanbiPage';

class ChoicePage extends Component{
    static navigationOptions = {
        title: '精选'
    }
    render(){
        return (
           <ScrollableTabView
               //tabBarTextStyle ={{backgroundColor:'red'}}//字体背景颜色
               //tabBarBackgroundColor='#c1c1ea'//ScrollableTabView背景颜色
               tabBarInactiveTextColor='black'//默认字体颜色
               tabBarActiveTextColor='rgb(21,126,244)'//选中，激活时字体颜色
               tabBarUnderlineStyle={{backgroundColor:'rgb(21,126,244)'}} //指示器颜色
               >
                <GirlPage tabLabel="少女漫画"  itemClickCallBack = {this._itemClick}/>
                <TanbiPage tabLabel="耽美漫画" itemClickCallBack = {this._itemClick}/>
           </ScrollableTabView>
        )
    }

    //通过方法回调的方式实现item的点击方法回调执行
    _itemClick=(comicName)=>{
        //获取react-navagation的导航器对象进行页面跳转
        this.props.navigation.navigate("ChapterPage",{comicName});
    }
}
export default ChoicePage;