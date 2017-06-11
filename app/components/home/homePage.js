/**
 * Created by Administrator on 2017/6/2.
 * 注意：但vp的item的数据不改变，或不在刷新时可以用 react-static-container 库来优化vp的数据加载,从而达到性能优化或内存优化
 * 注意：export default AAA 无需对象解构赋值
 *      export let AAA 里要拿到 AAA 就必须对象解构赋值
 */
import React,{Component,PropTypes} from 'react';
import {
    View,Text,
    Button,Image,
    TouchableHighlight,
    ListView,
    InteractionManager,
    BackAndroid,
    ToastAndroid
    } from 'react-native';
import StaticContainer from 'react-static-container';

import ViewPager from 'react-native-viewpager';
import window from '../../contants/window';
import ListCell from './listCell';
import {connect} from 'react-redux';//引入connrect关联reducer里的数据变动，若有变化则刷新UI

import {BOOK_URL} from '../../contants/api'; //export let aaa 方式
import {fetchMainPagerData} from '../../action/mianPageAction'; //export let aaa 方式

let IMGS = [
    'http://imgs.juheapi.com/comic_xin/5559b86938f275fd560ad6d6.jpg',
    'http://imgs.juheapi.com/comic_xin/5559b86938f275fd560ad61f.jpg',
    'http://imgs.juheapi.com/comic_xin/5559b86938f275fd560ad6d0.jpg',
    'http://imgs.juheapi.com/comic_xin/5559b86938f275fd560ad6d8.jpg',
    'http://imgs.juheapi.com/comic_xin/5559b86938f275fd560ad640.jpg',
    'http://imgs.juheapi.com/comic_xin/5559b86938f275fd560ad6d3.jpg'
];
let params = {
    type:"少年漫画",
    skip:45
}
class HomePage extends Component{
    static navigationOptions = {
        title:'主页'
        //header:null  //去除默认的头视图
    }
    //init vp lv data
    constructor(props){
        super(props);
        let vpDs = new ViewPager.DataSource({pageHasChanged:(p1,p2)=>p1!==p2});
        let lvDs = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state={
            vpdataSource:vpDs.cloneWithPages(IMGS),
            lvdataSource:lvDs.cloneWithRows([])
        }
    }
    static get defaultProps(){
        return {
            isLoading: true,
            isSuccess:false,
            array: []
        }
    }
    static propTypes={
        isLoading:PropTypes.bool.isRequired,
        isSuccess:PropTypes.bool.isRequired,
        array:PropTypes.arrayOf(PropTypes.object).isRequired
    }

    render(){
        let {isLoading,array,isSuccess} = this.props;//redux架构请求数据后的结构赋值
        let contentView = isLoading===true ? <Text style={{alignSelf:'center',margin:5}}>数据加载中...</Text>:
            isSuccess === false ?<Text style={{alignSelf:'center',margin:10}}>数据加载失败，请检查网络连接</Text>:
                <ListView
                    style={{flex:1}}
                    enableEmptySections={true}
                    dataSource={this.state.lvdataSource.cloneWithRows(array)}
                    renderRow={this._renderListItem}
                    renderHeader ={this._renderHeader}
                    />
        return contentView;
    }
    _renderListItem = (rowData)=>{
        return  <ListCell itemClickCallBak={(comicName)=>{
            //获取react-navagation的导航器对象进行页面跳转
            this.props.navigation.navigate("ChapterPage",{comicName});
        }
        } rowData={rowData}/>
    }
    /**
     * 注：若函数内部使用到了this,可以将此函数改为一个箭头函数。或通过bind(this)来绑定当前类的实列对象
     */
    _renderHeader = ()=>{
        return(
            <StaticContainer>
                <View
                    style={{width:window.width,height:150}}
                    >
                    <ViewPager
                        style={{flex:1}}
                        dataSource={this.state.vpdataSource}
                        renderPage={this._vpItemRender.bind(this)}
                        autoPlay={true}
                        isLoop={true}
                        />
                </View>
            </StaticContainer>
        );
    }
    //url自动传入
    _vpItemRender(url){
        return (
            <TouchableHighlight
                style={{flex:1}}
                onPress={()=>this._vpItemClick(url)}
                underlayColor='red'
                >
                <Image
                    source={{uri:url}}
                    style={{flex:1}}
                    />
            </TouchableHighlight>
        );
    }
    _vpItemClick = (url)=>{
        alert(url);
    }

    //请求网络获取数据
    componentDidMount(){
        //性能优化1
        InteractionManager.runAfterInteractions(
            ()=>{  this.props.requestNet(BOOK_URL,params,true) }
        );
        BackAndroid.addEventListener('androidBack', this._customAlertHandleBack.bind(this));
    }

    //组件卸载
    componentWillUnmount(){
        BackAndroid.removeEventListener('androidBack', this._customAlertHandleBack.bind(this));
    }

    _customAlertHandleBack(){
        if(this.props.navigation.state.routeName === "homePage"){
            //2s内按back退出
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                return false;
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
            return true;
        }
    }
}
export default HomePage = connect(
    (state)=>{
        let {array,isLoading,isSuccess} = state.HomePageReducer; //data,isLoading对象解构赋值后自动添加作为该类属性
        return {array,isLoading,isSuccess};
    },{
        requestNet:fetchMainPagerData   //此Action关联的是主页数据的变动
    }
)(HomePage);