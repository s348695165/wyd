// pages/sourceDetails/sourceDetails.js
var utils = require("../../utils/util.js");
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
let qqmapsdk = new QQMapWX({
  key: '4PVBZ-NQMW5-I5TIB-QD5TE-IDSA6-L3FV7' //这里自己的key秘钥进行填充
});
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id: '',
    listCon: '',
    insertText: '暂无数据',
    urls: app.globalData.url,
    images: '',
    showModal: false, // 显示modal弹窗
    single: false, // false 只显示一个按钮，如果想显示两个改为true即可
    start: '',
    end: '',
    start1: '',
    end1: '',
    gongli: 0
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
  }, //预览图片，放大预览
  preview(event) {
    console.log(event.currentTarget.dataset.src)
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: this.data.images // 需要预览的图片http链接列表
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
  waybillDetails(id) {
    var self = this;
    let order_id = id;
    wx.request({
      url: app.globalData.url + '/api/ownopt/self_order_detail',
      data: {
        "uid": app.globalData.uid,
        "order_id": order_id
      },
      success(res) {
        console.log(res.data);
        console.log(res.data.jump);
        if (res.data.msg != undefined && res.data.status == 0) {
          if (res.data.jump == 1) {
            self.setData({
              insertText: res.data.msg,
              showModal: true
            });
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none', //如果要纯文本，不要icon，将值设为'none'
              mask: true,
              duration: 5000
            })
          }

        } else {
          // let qi = self.atuoGetLocation(res.data.start_addr.province + res.data.start_addr.city + res.data.start_addr.area+res.data.start_addr.detail_addr)
          // let shi = self.atuoGetLocation(res.data.end_addr.province + res.data.end_addr.city + res.data.end_addr.area+res.data.end_addr.detail_addr)
          // qi.then(function (res) {
          //   console.log(res)
          //   self.setData({
          //     start: res.lat,
          //     end: res.lng
          //   });
          // })
          // shi.then(function (res) {
          //   console.log(res)
          //   self.setData({
          //     start1: res.lat,
          //     end1: res.lng
          //   });
          //   self.formSubmit1();
          // })
          let list = res.data;
          list.start_addr.city = list.start_addr.city.split("市")[0];
          list.end_addr.city = list.end_addr.city.split("市")[0];
          //   for(let i=0;i<list.length;i++){
          //     list[i].addtime=utils.getDateDiff(list[i].addtime*1000)
          //   }
          // list.pre_load_time=utils.formatDate(list.pre_load_time*1000)
          let images = res.data.other_pic.split(",");
          for (let i = 0; i < images.length; i++) {
            images[i] = self.data.urls + images[i];
          }
          self.setData({
            listCon: list,
            nones: 'block',
            images: images
          });

        }
      },
    })
  },
  formSubmit1(e) {
    var _this = this;
    console.log(_this.data.start + ',' + _this.data.end)
    //调用距离计算接口
    qqmapsdk.direction({
      mode: 'driving', //可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
      from: _this.data.start + ',' + _this.data.end,
      to: _this.data.start1 + ',' + _this.data.end1,
      success: function (res) {
        console.log(res);
        var ret = res;
        var coors = ret.result.routes[0].polyline,
          pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        let distance = ret.result.routes[0].distance;
        if (distance < 1000) {
          console.log(distance + "米");
          distance = distance + "米"
        } else if (distance > 1000) {
          console.log((Math.round(distance / 100) / 10).toFixed(1) + "公里")
          distance = (Math.round(distance / 100) / 10).toFixed(1) + "公里"
        }
        let times = Math.floor(ret.result.routes[0].duration / 60) + "小时" + (ret.result.routes[0].duration % 60) + "分"
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({
            latitude: coors[i],
            longitude: coors[i + 1]
          })
        }
        console.log(pl)
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        _this.setData({
          latitude: pl[0].latitude,
          longitude: pl[0].longitude,
          distance: distance,
          times: times,
          polyline: [{
            points: pl,
            color: '#FF0000DD',
            width: 4
          }]
        })
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  atuoGetLocation(e) {
    var p = new Promise(function (resolve, reject) {
      qqmapsdk.geocoder({
        address: e, //用户输入的地址（注：地址中请包含城市名称，否则会影响解析效果），如：'北京市海淀区彩和坊路海淀西大街74号'
        complete: res => {
          console.log(res);
          console.log(res.result.location); //经纬度对象
          resolve(res.result.location)
        }
      });
    });
    return p;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      order_id: options.id
    })
    this.waybillDetails(options.id);
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