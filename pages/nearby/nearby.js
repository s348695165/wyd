// pages/nearby/nearby.js
var tcity = require("../../utils/citys.js");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showtab: 0, //顶部选项卡索引
    tabnav: {
      tabnum: 5,
      tabitem: [{
          "id": 0,
          "text": "加油站"
        },
        {
          "id": 1,
          "text": "宾馆"
        },
        {
          "id": 2,
          "text": "停车场"
        },
        {
          "id": 3,
          "text": "修理厂"
        },
        {
          "id": 4,
          "text": "洗消中心"
        },
        {
          "id": 5,
          "text": "ETC"
        }
      ]
    },
    productList: [],
    // tab切换
    currentTab: 0,
    searchValue: '',
    list: [],
    nones: 'none',
    indexs: '',
    provinces: [],
    province: "",
    provinceCode: '',
    cityCode: '',
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    listCon:'',
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
  bindChange: function (e) {
    console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }
      console.log(this.data.provinces[val[0]])
      console.log(cityData[val[0]].sub[0].name)
      this.setData({
        province: this.data.provinces[val[0]],
        provinceCode: cityData[val[0]].code,
        city: cityData[val[0]].sub[0].name,
        cityCode: cityData[val[0]].sub[0].code,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }
       console.log(cityData[val[0]].sub[val[1]].name)
      this.setData({
        city: this.data.citys[val[1]],
        cityCode: cityData[val[0]].sub[val[1]].code,
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }


  },
  open: function () {
    this.setData({
      condition: !this.data.condition,
      dis: false
    })

  },
  searchs:function(){
    //防止两次连续点击动作太快
    var nowTime = new Date();
    if (nowTime - this.data.tapTime < 5000) {
      console.log('阻断')
      return;
    }
    console.log('执行')
    this.setData({ tapTime: nowTime });
    var self = this;
    let cityCode=self.data.cityCode;
    console.log(cityCode)
    wx.request({
        url:app.globalData.url +'/api/ownopt/near',
        data:{"city_api":cityCode},
        success(res) {
            console.log(res.data);
            if(res.data.status==0){return;}
            let list=res.data;
            // for(let i=0;i<list.length;i++){
            //   list[i].addtime=utils.getDateDiff(list[i].addtime*1000)
            // }
            self.setData({
              listCon: res.data,
              nones:'block'
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
    console.log(app.globalData.uid)
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

    tcity.init(that);

    var cityData = that.data.cityData;


    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'provinceCode': cityData[0].code,
      'city': cityData[0].sub[0].name,
      'cityCode': cityData[0].sub[0].code,
      'county': cityData[0].sub[0].sub[0].name
    })
    console.log('初始化完成');
    this.searchs();
  },
  gotall:function(e){
     console.log(e)
     let uid=e.currentTarget.dataset.uid;
     var self = this;
    let cityCode=self.data.cityCode;
    wx.request({
        url:app.globalData.url +'/api/ownopt/connect',
        data:{"uid":uid},
        success(res) {
            console.log(res.data);
            // wx.showModal({
            //   title: '',
            //   content: '是否要联系车主？',
            //   success: function (res) {
            //     if (res.confirm) {  
            //       console.log('点击确认回调')
                  
            //     } else {   
            //       console.log('点击取消回调')
            //     }
            //   }
            // })
            wx.makePhoneCall({
              phoneNumber: res.data.toString() //仅为示例，并非真实的电话号码
            })
           
        },
    })
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