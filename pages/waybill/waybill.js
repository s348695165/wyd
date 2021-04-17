// pages/waybill/waybill.js
var utils = require("../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [{ //假数据
      img: "avatar.png",
      name: "欢顔",
      tag: "知名情感博主",
      answer: 134,
      listen: 2234
    }],
    listCon: '',
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
    // 这里面处理点击取消按钮业务逻辑
    console.log('点击了取消')
    let pages = getCurrentPages(); //获取当前页面pages里的所有信息。
    let prevPage = pages[pages.length - 2]; //prevPage 是获取上一个页面的js里面的pages的所有信息。-2 是上一个页面，-3是上上个页面以此类推。                                                           
    // prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
    //    id: this.data.orderInfo.id
    // })//上一个页面内执行setData操作，将我们想要的信息保存住。当我们返回去的时候，页面已经处理完毕。
    //最后就是返回上一个页面。
    wx.navigateBack({
      delta: 1, // 返回上一级页面。
      success: function () {
        console.log('成功！')
      }
    })

  },
  // 点击确定按钮的回调函数
  modalConfirm(e) {
    // 这里面处理点击确定按钮业务逻辑
    console.log('点击了确定')
    this.tiao();
  },
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
  goSession: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../../pages/cargoOwnerData/cargoOwnerData?id=' + e.currentTarget.dataset.id
    })
  },
  goSourceDetails: function (e) {
    //防止两次连续点击动作太快
    var nowTime = new Date();
    if (nowTime - this.data.tapTime1 < 5000) {
      console.log('阻断')
      return;
    }
    console.log('执行')
    this.setData({ tapTime1: nowTime });
    console.log(e)
    wx.navigateTo({
      url: '../../pages/waybillDetails/waybillDetails?id=' + e.currentTarget.dataset.id
    })
  },
  goLogistics: function () {
    wx.navigateTo({
      url: '../../pages/logisticsInformation/logisticsInformation'
    })
  },
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
  del(e) {
    //防止两次连续点击动作太快
      var nowTime = new Date();
      if (nowTime - this.data.tapTime < 5000) {
        console.log('阻断')
        return;
      }
      console.log('执行')
      this.setData({ tapTime: nowTime });
    console.log(e.currentTarget.dataset.id)
    var self = this;
    let id = e.currentTarget.dataset.id;
    wx.request({
      url: app.globalData.url + '/api/ownopt/del_order',
      data: {
        "uid": app.globalData.uid,
        "oid": id
      },
      success(res) {
        console.log(res.data);
        let list = res.data;
        wx.showToast({
          title: list.msg,
          icon: 'none', //如果要纯文本，不要icon，将值设为'none'
          mask: true,
          duration: 2000
        })
        self.waybillDetails();

      },
    })
  },
  waybillDetails(value) {
   
    var self = this;
    wx.request({
      url: app.globalData.url + '/api/ownopt/order_history',
      data: {
        "uid": app.globalData.uid
      },
      success(res) {
        console.log(res.data);
        if(res.data.status==0){return;}
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

      },
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
          if (res.data.jump == 1) {//未注册
            self.setData({
              insertText: res.data.msg,
              showModal: true,
              tipsNew: 1
            });
          } else {//注册未审核
            self.setData({
              tipsNew: 0
            })
            // wx.showToast({
            //   title: res.data.msg,
            //   icon: 'none', //如果要纯文本，不要icon，将值设为'none'
            //   mask: true,
            //   duration: 5000
            // })
          }

        } else {
          self.waybillDetails();
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = (clientHeight * rpxR) - 180;
        var calc1 = (clientHeight * rpxR) - 80;
        console.log(calc)
        that.setData({
          winHeight: calc,
          winHeight1: calc1
        });
      }
    });
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