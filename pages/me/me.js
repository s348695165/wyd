// pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personalCon: '',
    showModal: false, // 显示modal弹窗
    single: false, // false 只显示一个按钮，如果想显示两个改为true即可
    showModal1:false
  },
  realNameConfirm(e){
    console.log(e.detail)
    if(e.detail==2){this.onShow()}
  },
  // 点击取消按钮的回调函数
  modalCancel(e) {
    console.log('点击了取消')
    let pages = getCurrentPages(); 
    let prevPage = pages[pages.length - 2]; 
    wx.navigateBack({
      delta: 1, // 返回上一级页面。
      success: function () {
        console.log('成功！')
      }
    })
  },
  // 点击确定按钮的回调函数
  modalConfirm(e) {
    console.log('点击了确定')
    this.tiao();
  },
  
  personalInformation(value) {
    let hasUserInfo=app.globalData.hasUserInfo;
    console.log(hasUserInfo)
    if(hasUserInfo==false){
      this.setData({showModal1:true})
      return;
    }else{
      this.setData({showModal1:false})
    }
    var self = this;
    wx.request({
      url: app.globalData.url + '/api/ownopt/mine',
      data: {
        "uid": app.globalData.uid
      },
      success(res) {
        console.log(res.data);
        if (res.data.msg != undefined && res.data.status == 0) {
          if (res.data.jump == 1) {
            self.setData({
              insertText: res.data.msg,
              showModal: true
            });
          } else {
            // wx.showToast({
            //   title: res.data.msg,
            //   icon: 'none', //如果要纯文本，不要icon，将值设为'none'
            //   mask: true,
            //   duration: 5000
            // })
          }

        } else {
          let personal = res.data;

          self.setData({
            personalCon: personal,
            nones: 'block'
          });
        }
      },
    })
  },

  goInformation: function () {
    wx.navigateTo({
      url: '../../pages/enterpriseInformation/enterpriseInformation'
    })
  },
  tiao: function () { //车主
    console.log("进来了")
    // let id = app.globalData.uid;
    wx.navigateToMiniProgram({
      appId: 'wxb14630536972aa96',
      path: 'pages/index/index',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
        console.log(res)
        // 打开成功
      }
    })
  },
  gongli:function(){
    wx.navigateTo({
      url: '../calculator/calculator',
    })
  },
  // goOrders: function () {
  //   console.log(app.globalData.uid)
  //   let that = this;
  //   wx.request({
  //     url: app.globalData.url + '/api/opreat/get_info',
  //     method: "POST", //指定请求方式，默认get
  //     data: {
  //       'uid': app.globalData.uid
  //     },
  //     header: {
  //       //默认值'Content-Type': 'application/json'
  //       'content-type': 'application/x-www-form-urlencoded' //post
  //     },
  //     success: function (res) {
  //       console.log(res)
  //       if (res.data.type!= 1&&res.data.type != 3) {
  //         that.tiao();
  //       }else{

  //       }

  //     }
  //   });

  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.hideTabBar()
    this.personalInformation();
    // this.goOrders();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})