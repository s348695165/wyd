// app.js
App({
  onLaunch() {

    //隐藏系统tabbar
   
    var that = this;
      //判断微信版本是否 兼容小程序更新机制API的使用
      if (wx.canIUse('getUpdateManager')) {
        //创建 UpdateManager 实例
        const updateManager = wx.getUpdateManager();
        console.log('是否进入模拟更新');
        //检测版本更新
        updateManager.onCheckForUpdate(function (res) {
          console.log('是否获取版本');
          // 请求完新版本信息的回调
          if (res.hasUpdate) {
            //监听小程序有版本更新事件
            updateManager.onUpdateReady(function () {
  
              //TODO 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 （ 此处进行了自动更新操作）
              updateManager.applyUpdate();
            })
            updateManager.onUpdateFailed(function () {
              // 新版本下载失败
              wx.showModal({
                title: '已经有新版本喽~',
                content: '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开哦~',
              })
            })
          }
        })
      } else {
        //TODO 此时微信版本太低（一般而言版本都是支持的）
        wx.showModal({
          title: '溫馨提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // wx.hideTabBar();
    // this.getSystemInfo();

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     console.log(res)
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           that.globalData.userInfo = res.userInfo
    //           console.log(res.userInfo)
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  checkPhoneNum: function (phoneNumber) {
    let str = /^1[3456789]\d{9}$/
    if (str.test(phoneNumber)) {
      return true
    } else {
      wx.showToast({
        title: '手机号不正确',
        icon: 'none',
        duration: 2000
      })
      return false
    }
  },
  onShow: function (options) {
    // console.log("传过来的query")
    // console.log(options);
    // if (options.query.id != '' && options.query.id != null && options.query.id != "null" && options.query.id != undefined && options.query.id != "undefined") {
    //   this.globalData.uid = options.query.id
    // }
    //隐藏系统tabbar
    let hasUserInfo=wx.getStorageSync('hasUserInfo')
    console.log(hasUserInfo)
    if(hasUserInfo==''||hasUserInfo==null||hasUserInfo==undefined||hasUserInfo=='null'||hasUserInfo=='undefined'){
      this.globalData.hasUserInfo=false;
      this.globalData.uid='';
    }else{
      this.globalData.hasUserInfo=hasUserInfo;
      this.globalData.uid=wx.getStorageSync('uid')
    }
    wx.hideTabBar();
  },
  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },
  // getSystemInfo: function () {
  //   let t = this;
  //   wx.getSystemInfo({
  //     success: function (res) {
  //       console.log(res)
  //       t.globalData.systemInfo = res;
  //     }
  //   });
  // },
  users: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      // 获取用户信息
      wx.getSetting({
        success: res => {
          console.log(res.authSetting['scope.userInfo'])
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                that.globalData.userInfo = res.userInfo
                console.log(res.userInfo)
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (that.userInfoReadyCallback) {
                  that.userInfoReadyCallback(res)
                }
                resolve(res.userInfo)
              }
            })
          }
        }
      })

    });
  },
  Rad:function(d){
    return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
 },

 //计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
 GetDistance:function(lat1,lng1,lat2,lng2){
  console.log(lat1)
     var radLat1 = this.Rad(lat1);
     var radLat2 = this.Rad(lat2);
     var a = radLat1 - radLat2;
     var  b = this.Rad(lng1) - this.Rad(lng2);
     var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
     Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
     s = s *6378.137 ;// EARTH_RADIUS;
     s = Math.round(s * 10000) / 10000; //输出为公里
     //s=s.toFixed(2);
     console.log(s)
     return s;
 },
  getOpenid: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      wx.login({
        success: function (res) {
          //code 获取用户信息的凭证
          if (res.code) {
            console.log(res.code)
            //请求获取用户openid
            wx.request({
              url: "https://www.temhere.com/api/login/login",
              data: {
                "code": res.code,"client":2
              },
              method: 'GET',
              header: {
                'Content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                console.log(res)
                wx.setStorageSync('openid', res.data.unionid); //存储uniid
                wx.setStorageSync('myopenid', res.data.openid);//存储openid
                var res = {
                  status: 200,
                  data: res.data.unionid,
                  login: res.data.login
                }
                resolve(res);
              }
            });
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
            reject('error');
          }
        }
      })
    });
  },
  globalData: {
    uid: '',
    hasUserInfo:false,
    url: 'https://www.temhere.com',
    userInfo: null,
    systemInfo: null, //客户端设备信息
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#979795",
      "selectedColor": "#1c1c1b",
      "list": [{
          "pagePath": "/pages/index/index",
          "iconPath": "icon/source.png",
          "selectedIconPath": "icon/source1.png",
          "text": "货源"
        },
        {
          "pagePath": "/pages/nearby/nearby",
          "iconPath": "icon/nearby.png",
          "selectedIconPath": "icon/nearby1.png",
          "text": "附近"
        },
        {
          "pagePath": "/pages/middle/middle",
          "iconPath": "icon/fahuo.png",
          "isSpecial": true,
          "text": "发布信息"
        },
        {
          "pagePath": "/pages/waybill/waybill",
          "iconPath": "icon/waybill.png",
          "selectedIconPath": "icon/waybill1.png",
          "text": "运单"
        },
        {
          "pagePath": "/pages/me/me",
          "iconPath": "icon/me.png",
          "selectedIconPath": "icon/me1.png",
          "text": "我的"
        }
      ]
    }
  }
})