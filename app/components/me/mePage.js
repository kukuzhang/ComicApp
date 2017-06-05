/**
 * 拍照、相册 react-native-image-picker
 * https://github.com/marcshilling/react-native-image-picker
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    PixelRatio,
    TouchableWithoutFeedback,
    TouchableHighlight,
    Platform,
    ToastAndroid,
    AlertIOS,
    Alert
    }
    from 'react-native';
import  ImagePicker  from 'react-native-image-picker';

//获取手机屏幕宽高
let Dimensions=require('Dimensions');
let ScreenWidth=Dimensions.get('window').width;
let ScreenHeight=Dimensions.get('window').height;


class MePage extends Component{

    static navigationOptions = {
        headerTitle:'我的'
    }

    constructor(props){
        super(props)
        this.state={
            avatarSource:null
        }
    }
    render(){
        let imageSource=this.state.avatarSource==null?require('../../images/yws.jpg'):this.state.avatarSource;
        return (
            <View style={styles.main}>
                <Image style={styles.backImage} source={require('../../images/our_bj.jpg')} resizeMode='cover'>
                    <TouchableWithoutFeedback
                        onPress={this.paizaoXainchePress.bind(this)}
                        underlayColor="transparent"
                        >
                        <Image style={styles.photo} source={imageSource}/>
                    </TouchableWithoutFeedback>
                    <Text style={{alignSelf:'center',color:'white',marginTop:5}}>ZT</Text>
                    <Text style={{alignSelf:'center',color:'white',marginTop:5}}>该起个啥铭呢</Text>
                </Image>
                <TouchableHighlight
                    style={styles.touchText}
                    onPress={this.itemTextPress.bind(this,1)}
                    underlayColor='#d2d2d2'
                    >
                    <Text style={styles.itemText}>登陆/注册</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.touchText}
                    onPress={this.itemTextPress.bind(this,2)}
                    underlayColor='#d2d2d2'
                    >
                    <Text style={styles.itemText}>资料修改</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.touchText}
                    onPress={this.itemTextPress.bind(this,3)}
                    underlayColor='#d2d2d2'
                    >
                    <Text style={styles.itemText}>关于我们</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.touchText}
                    onPress={this.itemTextPress.bind(this,4)}
                    underlayColor='#d2d2d2'
                    >
                    <Text style={styles.itemText}>设   置</Text>
                </TouchableHighlight>
            </View>
        );
    }
    //拍照和从相册选择图片
    paizaoXainchePress(){
        var photoOptions = {
            //底部弹出框选项
            title:'请选择',
            cancelButtonTitle:'取消',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'选择相册',
            quality:0.75,
            allowsEditing:true,
            noData:false,
            storageOptions: {
                skipBackup: true,
                path:'images'
            }
        }
        ImagePicker.showImagePicker(photoOptions,(response) =>{
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                let source = { uri: response.uri };
                this.setState({
                    avatarSource: source
                });
            }
        })
    }

    itemTextPress(index){
        switch(index){
            case 1:
                this.showTost("登陆/注册");
                break;
            case 2:
                this.showTost("资料修改");
                break;
            case 3:
                this.showTost("关于我们");
                break;
            case 4:
                this.showTost("设   置");
                break;
        }
    }
    showTost(msg) {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg,ToastAndroid.SHORT);
        } else {
            AlertIOS.alert(msg);
        }
    }
}
const styles=StyleSheet.create(
    {
        main:{
            flex:1
        },
        backImage:{
            width:ScreenWidth,
            height:150,
            justifyContent:'center',
            alignItems:'center'
        },

        photo:{
            width:45,
            height:45
        },
        touchItem:{
            flex:1,
            backgroundColor:'#f4f2f2',
            justifyContent:'center',
            alignItems:'center',
        },
        itemImage:{
            width:30,
            height:30
        },
        followView:{
            borderLeftWidth:1/PixelRatio.get(),
            borderLeftColor:'red'
        },
        messageView:{
            borderLeftWidth:1/PixelRatio.get(),
            borderLeftColor:'red'
        },
        font:{
            color:'#ec77cd'
        },
        itemText:{
            fontSize:15,
            color:'#515151',
            margin:10
        },
        touchText:{
            borderBottomWidth:1/PixelRatio.get(),
            borderBottomColor:'red'
        }
    }
);
export default MePage;