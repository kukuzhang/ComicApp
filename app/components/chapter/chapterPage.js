import React,{Component,PropTypes} from 'react';
import {
    StyleSheet,
    View,Text,
    ListView,
    Image,
    PixelRatio,
    TouchableHighlight,
    InteractionManager
    } from 'react-native';
import {fetchChapterPagerData } from '../../action/chaptePageAction';
import {connect} from 'react-redux';
import { CHAPTER_URL } from '../../contants/api';


class ChapterPage extends Component{
    //箭头函数式 navigationOptions
    static navigationOptions = ({ navigation }) => ({
        headerTitle : navigation.state.params.comicName,
        tabBarVisible:false
    });
    constructor(props){
        super(props);
        let  ds=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state={
            dataSource:ds.cloneWithRows([])
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
        let comicName = this.props.navigation.state.params.comicName;
        let id = rowData.id;
        let name = rowData.name;
        let params = {comicName,id,name};
        return (
            <TouchableHighlight
                onPress={()=>{this.props.navigation.navigate('DetailPage',params)}}
                style={styles.itemView}
                underlayColor="white"
                >
                <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <Text style={{marginLeft:20}}>{rowData.name}</Text>
                    <Image
                        style={{width:23,height:25,marginRight:20}}
                        source={require('../../images/ql_right.png')}
                        />
                </View>
            </TouchableHighlight>
        );
    }

    //load network data
    componentDidMount(){
        //所有组件渲染完成后在load data
        InteractionManager.runAfterInteractions(
            ()=>{this.props.requestNet(CHAPTER_URL,{comicName:this.props.navigation.state.params.comicName},true)}
        );
    }
   
}
const styles=StyleSheet.create(
    {
        itemView:{
            height:50,
            backgroundColor:'#c1c1ea',
            borderBottomWidth:1/PixelRatio.get(),
            borderBottomColor:'black'
        }
    }
);
export default ChapterPage = connect(
    (state)=>{
        let {array,isLoading,isSuccess} = state.chapterPageReducer
        return {array,isLoading,isSuccess};
    },
    {
        requestNet:fetchChapterPagerData
    }
)(ChapterPage);
