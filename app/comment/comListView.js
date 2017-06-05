/**
 * Created by Administrator on 2017/6/3.
 * 复用的Listview
 */
import React,{Component} from 'react';
import {
        ListView,
    Text
    } from 'react-native';
import ComCell from './comCell';
class ComListView extends Component{
    constructor(props){
        super(props)
        let ds=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state={
            dataSource:ds
        }
    }
    render(){
        let {arrayData} = this.props;
        return <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource.cloneWithRows(arrayData)}
            renderRow={this._renderRow}
            />
    }
    _renderRow = (rowData)=>{
        return <ComCell rowData={rowData} itemClickCallBack={(comicName)=>{
                this.props.itemClickCallBack(comicName);
            }
        }/>
    }
}
export default ComListView;