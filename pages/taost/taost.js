// pages/taost/taost.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show1: {
      type: Boolean,
      value: false
    },
  
  },

  /**
   * 组件的初始数据
   */
  data: {
    hasUserInfo: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserProfile(e) {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      let  that = this;
      wx.getUserProfile({
        desc: '用于完善货主资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            show1:false
          })
          app.globalData.hasUserInfo=true
          app.globalData.userInfo=res.userInfo
          wx.setStorageSync('userInfo', res.userInfo)
          wx.setStorageSync('hasUserInfo',true)
          that.goOpenid();
        }
      })
    },
    goOpenid: function () {
      let that = this;
      app.getOpenid().then(function (res) {
        console.log(res)
        console.log(app.globalData)
  
        if (res.status == 200) {
          that.setData({
            openid: wx.getStorageSync('openid')
          })
          console.log(wx.getStorageSync('openid'))
          if (res.login == 'NO') { //用户信息注册
            let datas = {
              'avatarUrl': app.globalData.userInfo.avatarUrl,
              'city': app.globalData.userInfo.city,
              'country': app.globalData.userInfo.country,
              'gender': app.globalData.userInfo.gender,
              'language': app.globalData.userInfo.language,
              'nickname': app.globalData.userInfo.nickName,
              'openid': wx.getStorageSync('openid'),
              'phone': "",
              'province': app.globalData.userInfo.province,
              'hz_openid':wx.getStorageSync('myopenid')
            }
  
            wx.request({
              url: app.globalData.url + '/api/user/add_user',
              method: "POST", //指定请求方式，默认get
              data: datas,
              header: {
                //默认值'Content-Type': 'application/json'
                'content-type': 'application/x-www-form-urlencoded' //post
              },
              success: function (res) {
                console.log(res.data)
                if (res.data == 0) {
                  wx.showToast({
                    title: '未能成功获取用户信息即将从新调用',
                    icon: 'none', //如果要纯文本，不要icon，将值设为'none'
                    mask: true,
                    duration: 5000
                  })
                  setTimeout(function () {
                    that.goOpenid();
                  }, 5000)
                } else {
                  app.globalData.uid = res.data;
                  wx.setStorageSync('uid',res.data)
                  that.realNameConfirm();
                  // that.personalInformation();
                }
              }
            });
          }
        } else {
          console.log(res.data);
        }
      });
    },
    realNameConfirm:function(){
      let step=2;
      this.triggerEvent('realNameConfirm', step)     //通过triggerEvent将参数传给父组件
 }
  },
  
  ready:function(){
      console.log(this.properties.taost);
  },
  onShow:function(){
    console.log(this.properties.taost);
  }
})
