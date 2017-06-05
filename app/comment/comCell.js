import React,{Component,PropTypes} from 'react';
import {
    View,
    Text,Image,
    TouchableHighlight
} from 'react-native';
class ComCell  extends Component{
    //调用属性和属性的数据类型
    static get defaultProps(){
        return {
            rowData:{}
        }
    }
    static propTypes={
        rowData:PropTypes.object.isRequired
    }
    render(){
        let {
            coverImg,
            des,
            name
            } = this.props.rowData;
        return (
            <TouchableHighlight
                style={{height:250,backgroundColor:'white',padding:3}}
                onPress={()=>{
                    this.props.itemClickCallBack(name)
                }}
                underlayColor="gray"
                >
                <View>
                    <Image
                        source={{uri:coverImg}}
                        style={{height:200}}
                        />
                    <Text
                        numberOfLines={2}
                        style={{margin:5}}
                        >{des}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}
export default ComCell;