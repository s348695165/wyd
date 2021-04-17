// pages/cargoInformation/cargoInformation.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectList1: [{
      'value': '白条',
      'id': 1
    }, {
      'value': '猪/活畜',
      'id': 2
    }, {
      'value': '饲料',
      'id': 3
    }, {
      'value': '其它',
      'id': 4
    }],
    searchValue: '',
    list: [],
    nones: 'none',
    information: '',
    lsitmsg:''

  },
  selects1: function (params) {
    console.log(params.currentTarget.dataset.index)
    let that = this;
    let index = params.currentTarget.dataset.index;
    let selectList1 = that.data.selectList1;

    // let num=0;
    for (let i = 0; i < selectList1.length; i++) {
      // if(selectList1[i].off==true){
      //   num+=1;
      // }
      if (i == index) {
        selectList1[index].off = !selectList1[index].off;
      } else {
        selectList1[i].off = false;
      }
    }
    // console.log(num)
    // if(num>1){
    //   selectList1[index].off=!selectList1[index].off;
    //   return;
    // }else{

    console.log(selectList1)
    that.setData({
      selectList1: selectList1
    })
    // }
  },
  information: function (e) {
    var that = this;
    console.log(e.detail.value)
    that.setData({
      information: e.detail.value
    })
  },
  testKuoHao() {
    var aa = "ldfjsldfj(dsfasjfj3124123)AAA";
    //1 查找(开始
    //2 ([^)]*)中是匹配内容，不包含)的任意字符，零个或多个的字符
    var result = aa.match(/\(([^)]*)\)/);
    // var result = aa.match(/\((.+)\)/);
    // 此时result＝["(dsfasjfj3124123)", "dsfasjfj3124123"];
    console.log(result);
    if (result) {
      console.log(result[1]); // "dsfasjfj3124123"
    }
  },

  inputChange(e) {
    let self = this,
      value = e.detail.value;
    if (value == '') {
      var list = [];
      self.setData({
        list: list,
        nones: 'none'
      });
      return;
    }
    console.warn(value);
    self.request(value);
  },
  mores: function (params) {
    wx.navigateTo({
      url: '../../pages/moreInformation/moreInformation'
    })
  },
  goTop: function (params) {
    let that = this;
    let can = params.currentTarget.dataset.value;
    let id = params.currentTarget.dataset.id;
    if (can != '' && can != null && can != undefined) {
      // if(id!=''&&id!=null&&id!=undefined){
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      prevPage.setData({
        can: can,
        sessionId: id
      })
      wx.navigateBack({
        delta: 1,
      })
      // }else{

      // }
    } else {
      wx.showToast({
        title: "请选择货物信息",
        icon: 'none', //如果要纯文本，不要icon，将值设为'none'
        mask: true,
        duration: 2000
      })
    }
  },
  request(value) {
    var self = this;
    //   self.setData({
    //     list: ["114电影网", "131", "1688", "12345", "10月1日放假安排2019", "188比分直播", "118图库", "139邮箱", "126邮箱登录", "123"],
    //     nones:'block'
    // });
    //   return;

    wx.request({
      url: app.globalData.url + '/api/ownopt/search_goods',
      data: {
        "key_word": value
      },
      success(res) {
        console.log(res.data);
        self.setData({
          list: res.data.data,
          nones: 'block',
          lsitmsg:res.data.msg
        });

      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("传过来的options")
    console.log(options)
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