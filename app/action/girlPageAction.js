/**
 * Created by Administrator on 2017/6/3.
 */
import {
    START_FETCH_GIRL_PAGERDATA,
    COMPLETE_FETCH_GIRL_PAGERDATA
    }from '../contants/type';
import HttpUtil from '../utils/HttpUtil';

export let fetchGirlPagerData = (url,params,isLoading)=>{ //导入用对象解构赋值或

        return (dispatch)=>{

            //loading加载
            dispatch(
                {
                    type:START_FETCH_GIRL_PAGERDATA,
                    isLoading
                }
            );

            //开始真正请求网络
            HttpUtil.fetchGet(url,
                params,
                (responseData)=>{
                    //请求成功dispatch分发数据到reducer
                    dispatch(
                        {
                            type:COMPLETE_FETCH_GIRL_PAGERDATA,
                            //responseData即为请求网络返回的数据(此处为json对象，在HttpUtil里已经转化为一个json对象)
                            data:responseData.result.bookList, //result.bookList拿到json数组
                            isSuccess:true
                        }
                    );
                },
                (error)=>{
                    //请求失败
                    dispatch(
                        {
                            type:COMPLETE_FETCH_GIRL_PAGERDATA,
                            error,
                            isSuccess:false
                        }
                    );
                })
        }
}