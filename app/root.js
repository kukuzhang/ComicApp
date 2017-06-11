/**
 * Created by Administrator on 2017/6/2.
 * 一个平行容器里添加了4个堆容器实现4tab点击切换效果。
 * 1.注意：TabNavigator的图标只适用于，Android上无法用  By default the icon is only shown on iOS. Search the showIcon option below.
 * 2.StackNavigator自动监听Android back返回。在为定义一个全局的headerLeft时，navigate()到第二个界面自动带有一个back返回图标
   3，react-navigation ******里的3组件的navigationOptions里的属性可以相互使用***************
 */
import React,{Component}from 'react';
import {
    View,
    Image,
    Text,
    StatusBar,
    Platform,
    TouchableHighlight
    }from 'react-native';
import {StackNavigator,TabNavigator,DrawerNavigator} from 'react-navigation';
import HomePage from './components/home/homePage';
import DiscoverPage from './components/discover/discoverPage';
import ChoicePage from './components/choice/choicePage';
import MePage from './components/me/mePage';
import ChapterPage from './components/chapter/chapterPage';
import DetailPage from './components/detail/detailPage';

import {Provider} from 'react-redux';
import store from './store/store';

//主页
const homeNav = StackNavigator({
    homePage:{screen:HomePage},
    choicePage:{screen:ChoicePage},
    ChapterPage:{screen:ChapterPage},
    DetailPage:{screen:DetailPage}
},{
    navigationOptions:({navigation})=>(  //定义跳转到每一个界面的统一界面风格，可以在个界面的 static navigationOptions()方法里实现界面风差异化
        {
            tabBarLabel:'主页',
            headerStyle:{backgroundColor:'rgb(21,126,244)'},
            headerTitleStyle :{color:'white',fontSize:15,alignSelf:'center'},

            //打开Android侧滑的图标，设置了DrawerNav才启用
            //headerLeft:Platform.OS === 'ios' ? <Image/> :
            //    <TouchableHighlight
            //        onPress={()=>{
            //                navigation.navigate('DrawerOpen');
            //            }}
            //        underlayColor="transparent"
            //        >
            //        <Image
            //            source={require('./images/category.png')}
            //            style={{width:25,height:25,marginLeft:10}}
            //            />
            //    </TouchableHighlight>,

            //Android端侧滑抽屉文本和图标设置
            drawerLabel:'主页',
            drawerIcon:({focused})=>{  //设置默认图片和激活时的图片
                return (
                    focused ? <Image
                        source={require('./images/homep.png')}
                        style={{width:34,height:34}}
                        /> :
                        <Image
                            source={require('./images/home.png')}
                            style={{width:34,height:34}}
                        />
                )
            }
            //ios底部tab图标
            //tabBarIcon:<Image
            //                source={require('./images/homep.png')}
            //                style={{width:32,height:25,marginLeft:10}}
            //            />
        }
    )
});
//发现
const discoverNav = StackNavigator({
    discoverPage:{screen:DiscoverPage},
    ChapterPage:{screen:ChapterPage},
    DetailPage:{screen:DetailPage}
},{
    navigationOptions:({navigation})=>(
        {
            tabBarLabel:'发现',
            headerStyle:{backgroundColor:'rgb(21,126,244)'},
            headerTitleStyle :{color:'white',fontSize:15,alignSelf:'center'},

            //headerLeft:Platform.OS === 'ios' ? <Image/> :
            //    <TouchableHighlight
            //        onPress={()=>{
            //                    navigation.navigate('DrawerOpen');
            //                }}
            //        underlayColor="transparent"
            //        >
            //        <Image
            //            source={require('./images/category.png')}
            //            style={{width:25,height:25,marginLeft:10}}
            //            />
            //    </TouchableHighlight>,

            //Android端侧滑抽屉文本和图标设置
            drawerLabel:'发现',
            drawerIcon:<Image
                            source={require('./images/fxp.png')}
                            style={{width:34,height:34}}
                        />
        }
    )
});
//精选
const choiceNav = StackNavigator({
    choicePage:{screen:ChoicePage},
    ChapterPage:{screen:ChapterPage},
    DetailPage:{screen:DetailPage}
},{
    navigationOptions:({navigation})=>(
        {
            tabBarLabel:'精选',
            headerStyle:{backgroundColor:'rgb(21,126,244)'},
            headerTitleStyle :{color:'white',fontSize:15,alignSelf:'center'},

            //headerLeft:Platform.OS === 'ios' ? <Image/> :
            //    <TouchableHighlight
            //        onPress={()=>{
            //            navigation.navigate('DrawerOpen');
            //        }}
            //        underlayColor="transparent"
            //        >
            //        <Image
            //            source={require('./images/category.png')}
            //            style={{width:25,height:25,marginLeft:10}}
            //            />
            //    </TouchableHighlight>,

            //Android端侧滑抽屉文本和图标设置
            drawerLabel:'精选',
            drawerIcon:<Image
                            source={require('./images/choicep.png')}
                            style={{width:34,height:34}}
                        />
        }
    )
});
//我的
const meNav = StackNavigator({
    mePage:{screen:MePage}
},{
    navigationOptions:({navigation})=>(
    {
        tabBarLabel:'我的',
        headerStyle:{backgroundColor:'rgb(21,126,244)'},
        headerTitleStyle :{color:'white',fontSize:15,alignSelf:'center'},
        //headerLeft:<Text style={{color:'white',marginLeft:10}}>返回</Text>

        //headerLeft:Platform.OS === 'ios' ? <Image/> :
        //    <TouchableHighlight
        //        onPress={()=>{
        //                        navigation.navigate('DrawerOpen');
        //                    }}
        //        underlayColor="transparent"
        //        >
        //        <Image
        //            source={require('./images/category.png')}
        //            style={{width:25,height:25,marginLeft:10}}
        //            />
        //    </TouchableHighlight>,

        //Android端侧滑抽屉文本和图标设置
        drawerLabel:'我的',
        drawerIcon:<Image
                        source={require('./images/mep.png')}
                        style={{width:34,height:34}}
                    />
    }
    )
});

//TabBar
const  TabBar = TabNavigator({
    home:{screen:homeNav},
    discover:{screen:discoverNav},
    choice:{screen:choiceNav},
    me:{screen:meNav}
},{
        tabBarPosition:'bottom',
        swipeEnabled:false, //不可滑动
        animationEnabled:false //去除tab切换的动画效果
});

//侧滑
const  DrawerNav = DrawerNavigator({
    home:{screen:homeNav},
    discover:{screen:discoverNav},
    choice:{screen:choiceNav},
    me:{screen:meNav}
},{
    drawerWidth: 180,
    drawerPosition: 'left',
    contentOptions:{
        activeTintColor:'red'
    }
});

class Root extends Component{
    render(){
        return (
            <Provider store={store}>
                <View style={{flex:1}}>
                    <StatusBar
                        backgroundColor="rgb(21,126,244)"
                        barStyle="light-content"
                        />
                    <TabBar/>
                </View>
            </Provider>
        );
    }
}

export default Root;