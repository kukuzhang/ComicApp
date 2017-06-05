/**
 * Created by Administrator on 2017/6/2.
 */
import React,{Component,PropTypes} from 'react';
import {
    View,Text,
    InteractionManager
    } from 'react-native';
import {connect} from 'react-redux';
import {fetchDiscoverPagerData} from '../../action/discoverPageAction';
import ComListView from '../../comment/comListView';

import {BOOK_URL} from '../../contants/api'; //export let aaa 方式
let params = {
    type:"青年漫画"
}

class DiscoverPage extends Component{
    static navigationOptions = {
        title: '发现'
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
                <ComListView
                    arrayData={array}
                    itemClickCallBack = {(comicName)=>{
                    this.props.navigation.navigate("ChapterPage",{comicName});
                }}
                    />
        return contentView;
    }

    //请求网络获取数据
    componentDidMount(){
        //性能优化2
        InteractionManager.runAfterInteractions(
            ()=>{  this.props.requestNet(BOOK_URL,params,true) }
        );
    }
}
export default DiscoverPage = connect(
    (state)=>{
        let {array,isSuccess,isLoading} = state.DiscoverPageReducer; // 关联DiscoverPageReducer里的数据
        return {array,isSuccess,isLoading};
    },
    {
        requestNet:fetchDiscoverPagerData// 关联fetchDiscoverPagerData里的数据请求
    }
)(DiscoverPage);