// pages/index/index.js
var utils = require("../../utils/util.js");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "", //窗口高度
    winHeight1: '',
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [{ //假数据
      img: "avatar.png",
      name: "欢顔",
      tag: "",
      answer: 134,
      listen: 2234
    }],
    lists: [],
    listCon: '',
    nones: 'none',
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    x:'265px',
    y:'183px',
    taost:"none",
    showModal1:false

  },
  realNameConfirm(e){
    console.log(e.detail)
    if(e.detail==2){this.onShow()}
  },
  goSourceDetails: function (e) {
    //防止两次连续点击动作太快
    var nowTime = new Date();
    if (nowTime - this.data.tapTime < 5000) {
      console.log('阻断')
      return;
    }
    console.log('执行')
    this.setData({
      tapTime: nowTime
    });
    let hasUserInfo=app.globalData.hasUserInfo;
    console.log(hasUserInfo)
    if(hasUserInfo==false){
      this.setData({showModal1:true})
      return;
    }else{
      this.setData({showModal1:false})
    }
    console.log(e)
    wx.navigateTo({
      url: '../../pages/sourceDetails/sourceDetails?id=' + e.currentTarget.dataset.id
    })
  },
  gohistoryDetails: function (e) {
    //防止两次连续点击动作太快
    var nowTime = new Date();
    if (nowTime - this.data.tapTime < 5000) {
      console.log('阻断')
      return;
    }
    console.log('执行')
    this.setData({
      tapTime: nowTime
    });
    let hasUserInfo=app.globalData.hasUserInfo;
    console.log(hasUserInfo)
    if(hasUserInfo==false){
      this.setData({showModal1:true})
      return;
    }else{
      this.setData({showModal1:false})
    }
    console.log(e)
    wx.navigateTo({
      url: '../../pages/historyDetails/historyDetails?id=' + e.currentTarget.dataset.id
    })
  },
  //事件处理函数
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  inputChange(e) {
    console.log(e)
    let self = this,
      value = e.detail.value;
    if (value == '') {
      var list = [];
      self.setData({
        listCon: list,
        nones: 'none'
      });
      return;
    }
    console.warn(value);
    // self.startHistory(value);
  },
  startHistory(value) {
    var self = this;
    console.log("用户ID" + app.globalData.uid)
    wx.request({
      url: app.globalData.url + '/api/ownopt/order_history',
      data: {
        "uid": app.globalData.uid
      },
      success(res) {
        console.log(res.data);
        if (res.data.msg != undefined && res.data.status == 0) {} else {
        let list = res.data;
        for (let i = 0; i < list.length; i++) {
          list[i].addtime = utils.getDateDiff(list[i].addtime * 1000);
          list[i].start_addr.city = list[i].start_addr.city.split("市")[0];
          list[i].end_addr.city = list[i].end_addr.city.split("市")[0];
        }
        self.setData({
          listCon: res.data,
          nones: 'block'
        });
}
      },
    })
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },

  goList: function (params) {
    let that = this;
    wx.request({
      url: app.globalData.url + '/api/opreat/order_list',
      method: "POST", //指定请求方式，默认get
      data: {},
      header: {
        //默认值'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded' //post
      },
      success: function (res) {
        console.log(res)
        console.log(res.data)
        let list = res.data;
        for (let i = 0; i < list.length; i++) {
          list[i].addtime = utils.getDateDiff(list[i].addtime * 1000)
          list[i].start_addr.city = list[i].start_addr.city.split("市")[0];
          list[i].end_addr.city = list[i].end_addr.city.split("市")[0];
        }
        that.setData({
          lists: list
        })
      }
    });
  },
  again: function (e) {
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index;
    let jsons = JSON.stringify(this.data.listCon[index])
    console.log(jsons)
    wx.navigateTo({
      url: '../../pages/middle/middle?index=' + jsons
    })
  },

  onLoad: function (options) {
    console.log("传过来的")
    console.log(options)
    app.editTabbar();
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let ratio = 750 / clientWidth;
        let height = (clientHeight * ratio) - 80;
        let height1 = (clientHeight * ratio) - 80;
        console.log(clientHeight)
        console.log(ratio)
        that.setData({
          winHeight: height,
          winHeight1: height1
        });
      }
    });
   let user=wx.getStorageSync('userInfo');
    console.log(user.nickName)
    if(user.nickName!=''&&user.nickName!=null&&user.nickName!=undefined&&user.nickName!='null'&&user.nickName!='undefined'){
        app.globalData.userInfo=user
    }

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
    let that = this;
    // if (app.globalData.uid == '' || app.globalData.uid == null || app.globalData.uid == undefined || app.globalData.uid == 'null' || app.globalData.uid == 'undefined') {
    //   that.goOpenid();
    // } else {
      wx.hideTabBar();
      that.goList();
      that.startHistory();
    // }
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