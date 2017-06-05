import React,{Component,PropTypes} from 'react';
import {
    StyleSheet,
    View,Text,
    ListView,
    Image,
    PixelRatio,
    InteractionManager
    }from 'react-native';
import {connect} from 'react-redux';
import {fetchDetailPagerData} from '../../action/detailPageAction';
import {CHAPTERCONTENT_URL} from '../../contants/api';
import window from '../../contants/window';

class DetailPage extends Component{
    static navigationOptions = ({ navigation }) => ({
        headerTitle : navigation.state.params.comicName+" - "+navigation.state.params.name,
        tabBarVisible:false
    });
    constructor(props){
        super(props);
        let  ds=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state={
            dataSource:ds
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
        let {isLoading,array,isSuccess} = this.props;
        let contentView = isLoading===true ? <Text style={{alignSelf:'center',margin:5}}>数据加载中...</Text>:
            isSuccess === false ?<Text style={{alignSelf:'center',margin:10}}>数据加载失败，请检查网络连接</Text>:
                <ListView
                    style={{flex:1}}
                    removeClippedSubviews={false}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource.cloneWithRows(array)}
                    renderRow={(rowData)=>this._renderRow(rowData)}
                    />
        return contentView;
    }
    _renderRow = (rowData)=>{
        let imageUrl = rowData.imageUrl;
        return (
            <View style={{height:window.height,width:window.width,borderBottomWidth:1/PixelRatio.get(),borderBottomColor:'gray'}}>
                <Text style={{marginLeft:5}}>{rowData.id}</Text>
                <Image
                    source={{uri:imageUrl}}
                    style={{flex:1}}
                    />
            </View>
        );
    }
    //load network data
    componentDidMount(){
        let params={
            comicName:this.props.navigation.state.params.comicName,
            id:this.props.navigation.state.params.id
        }
        //所有组件渲染完成后在load data
        InteractionManager.runAfterInteractions(
            ()=>{this.props.requestNet(CHAPTERCONTENT_URL,params,true)}
        );
    }
}
export default DetailPage = connect(
    (state)=>{
        let {array,isLoading,isSuccess} = state.detailPageReducer;
        return  {array,isLoading,isSuccess};
    }
    ,
    {
        requestNet:fetchDetailPagerData
    }
)(DetailPage);