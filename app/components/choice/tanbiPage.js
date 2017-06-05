import React,{Component,PropTypes} from 'react';
import {
    View,Text,
    InteractionManager
    } from 'react-native';
import ComListView from '../../comment/comListView';

import {connect} from 'react-redux';
import {fetchTanbiPagerData} from '../../action/tanbiPageAction';
import {BOOK_URL} from '../../contants/api'; //export let aaa 方式

let params = {
    type:"耽美漫画"
}

class TanbiPage extends Component{
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
        let {isLoading,array,isSuccess} = this.props;
        let contentView = isLoading===true ? <Text style={{alignSelf:'center',margin:5}}>数据加载中...</Text>:
            isSuccess === false ?<Text style={{alignSelf:'center',margin:10}}>数据加载失败，请检查网络连接</Text>:
                <ComListView
                    arrayData={array}
                    isLoading={isLoading}
                    itemClickCallBack = {(comicName)=>{
                    this.props.itemClickCallBack(comicName)
                    }}
                />
        return contentView;
    }

    //请求网络获取数据
    componentDidMount(){
        //性能优化
        InteractionManager.runAfterInteractions(
            ()=>{  this.props.requestNet(BOOK_URL,params,true) }
        );
    }
}
export default TanbiPage = connect(
    (state)=>{
        let {array,isSuccess,isLoading} = state.tanbiPageReducer;
        return {array,isSuccess,isLoading};
    },
    {
        requestNet:fetchTanbiPagerData
    }
)(TanbiPage);

