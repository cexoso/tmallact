/**
 * Created by ding on 15-5-17.
 */
// JavaScript Document

$(document).ready(function (e) {

    

});

// ajax function
function callAjax(url, type, data, callback, async) {
    $.ajax({
        url: url,// + '?m=' + Math.random(),
        data: data,
        async: async || true,
        type: type || 'GET',
        dataType: 'json',
        success: function (json) {
            $('#loading').fadeOut();
            if (callback != undefined && typeof callback == 'function') {
                if (json == null || typeof json == 'undefined') {
                    //wb._debug('!!!data is wrong', json);
                }
                else {
                    callback.call(this, json);
                }
            }
        }
    });
}

function setShareData() {

   //分享到朋友圈
    wx.onMenuShareTimeline({
       title: "PaTica 双11福利大放送",
        link: location.href,
		desc: "双11抢当人气王！邀请好友助力，集赞并截图，即有机会获得免单！",
        imgUrl: 'http://www.patica.com.cn/pic/s11.jpg',
        trigger: function (res) {
            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            //alert('用户点击分享到朋友圈');
        },
        success: function (res) {
            //alert('已分享2222');
        },
        cancel: function (res) {
            //alert('已取消');
        },
        fail: function (res) {
            //alert(JSON.stringify(res));
        }
    });

    //发送给朋友
    wx.onMenuShareAppMessage({
        title: "PaTica 双11福利大放送",
        desc: "双11抢当人气王！邀请好友助力，集赞并截图，即有机会获得免单！",
        link: location.href,
        imgUrl: 'http://www.patica.com.cn/pic/s11.jpg',
        type: "",
        dataUrl: "",
        success: function () {
            //alert('已分享2222');
            // 用户确认分享后执行的回调函数
        },
        trigger: function (res) {

            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            //alert('用户点击分享到朋友圈');
        },
        cancel: function () {
            //alert('已取消');
            // 用户取消分享后执行的回调函数
        },
        fail: function (res) {
            //alert(JSON.stringify(res));
        }
    })
}

wx.ready(function () {
    setShareData();
});

callAjax( "http://www.patica.com.cn:9080/Patica2.0/mvc/wxcontrol/getwxconfig", 'POST', {
        url: window.location.href.split("#")[0]
    }, function(result) {
		
        if ( result ) {
            
            wx.config({
                debug: false,
                appId: result.appID,
                timestamp: result.jsapi_timestamp,
                nonceStr: result.jsapi_noncestr,
                signature: result.jsapi_signature,
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
            });

            wx.error(function(res) {
                //alert(res);
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

            });
        }
    }, false
);
