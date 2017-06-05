/**
 * Created by Administrator on 2017/6/3.
 */
import {
    START_FETCH_DETAIL_PAGERDATA,
    COMPLETE_FETCH_DETAIL_PAGERDATA
    }from '../contants/type';
import HttpUtil from '../utils/HttpUtil';

export let fetchDetailPagerData = (url,params,isLoading)=>{ //导入用对象解构赋值或

        return (dispatch)=>{

            //loading加载
            dispatch(
                {
                    type:START_FETCH_DETAIL_PAGERDATA,
                    isLoading
                }
            );
            //开始真正请求网络
            HttpUtil.fetchGet(url,
                params,
                (responseData)=>{
                    console.log("数据请求成功***");
                    console.log(responseData);
                    //请求成功dispatch分发数据到reducer
                    dispatch(
                        {
                            type:COMPLETE_FETCH_DETAIL_PAGERDATA,
                            //responseData即为请求网络返回的数据(此处为json对象，在HttpUtil里已经转化为一个json对象)
                            data:responseData.result.imageList,
                            isSuccess:true
                        }
                    );
                },
                (error)=>{
                    console.log("数据请求失败***");
                    console.log(error);
                    //请求失败
                    dispatch(
                        {
                            type:COMPLETE_FETCH_DETAIL_PAGERDATA,
                            error,
                            isSuccess:false
                        }
                    );
                })
        }
}