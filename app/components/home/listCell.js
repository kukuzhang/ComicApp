/**
 * Created by Administrator on 2017/6/3.
 */
import React,{Component,PropTypes} from 'react';
import {
    View,Text,Image,TouchableHighlight,StyleSheet,PixelRatio
    } from 'react-native';
class ListCell extends Component{
    //调用属性和属性的数据类型
    static get defaultProps(){
        return {
            rowData:{}
        }
    }
    static propTypes={
        rowData:PropTypes.object.isRequired
    }
    render() {
        //获取实列化该组件时，传入的item数据
        let {
            coverImg,
            name,
            area,
            des,
            finish
            } = this.props.rowData;
        let finishImage = finish===false ? null :
            <Image
                source={require('../../images/ic_over.png')}
                style={{position:'absolute',top:-7,right:-7}}
            />;
        return (
            <TouchableHighlight
                style={styles.touch}
                onPress={()=>{
                    this.props.itemClickCallBak(name);
                }}
                underlayColor='gray'
                >
                <View style={styles.itemView}>
                    <Image
                        source={{uri:coverImg}}
                        style={styles.image}
                        />
                    <View style={{marginLeft:20}}>
                        <Text style={[styles.text,{fontSize:18}]}>{name}</Text>
                        <Text style={styles.text}>{area}</Text>
                        <Text style={styles.text} numberOfLines={1}>{des}</Text>
                    </View>
                    {finishImage}
                </View>
            </TouchableHighlight>
        )
    }

}
const styles=StyleSheet.create(
    {
        touch:{
            height:100,
            backgroundColor:'white',
            borderBottomColor:'gray',
            borderBottomWidth:1/PixelRatio.get()
        },
        itemView:{
            flex:1,
            flexDirection:'row',
            alignItems:'center',
            marginLeft:15
        },
        text:{
            marginTop:5
        },
        image:{
            width:100,
            height:80,
            borderRadius:8
        }
    }
);
export default ListCell;