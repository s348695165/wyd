// pages/middle/middle.js
var tcity = require("../../utils/util.js");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nk: 0,
    pics: [], //图片
    placeOfLoading: '', //装货地
    placeOfDischarge: '', //卸货地
    information: '', //货物信息
    vehicle: '', //所需车辆
    Decontamination: '', //洗消点
    selectCarLength: [],
    selectCarLength1: [],
    selectGo: '请选择',
    selectOut: '请选择',
    selectText: '请选择货物信息',
    selectText1: '请选择车型车长',
    can: '',
    show1: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData1: [1, 2, 3], //下拉列表的数据
    selectindex1: '请选择', //选择的下拉列表下标
    selectId1: '',
    setOutA: '选择发货地',
    arriveA: '选择卸货地',
    setOutId: '',
    arriveId: '',
    sessionId: '',
    selectCarLengthId: '',
    selectCarLength1Id: '',
    selectCarLengthId: '',
    selectCarLength1Id: '',
    selectText1Id: "",
    setOut: '',
    arrive: '',
    province: '',
    city: '',
    district: '',
    latitude: '',
    longitude: '',
    receive: '', //再次发货传参
    start_addr: '',
    end_addr: '',
    counts: '',
    typeIndex: '',
    typeIndex1: '',
    typeCont: '',
    typeCont1: '',
    starTime: '',
    endTime: '',
    nearby: '',
    start_addrNos: '', //出发地坐标
    end_addrNos: '', //目的地坐标
    nearbyId: '',
    day: '',
    nearbyKm: '',
    newsImg: ['', '', ''], //返回图片路径集合
    con_phone: '', //联系方式
    con_name: '', //联系人
    money: '',
    typeContId: '', //货品类型
    typeContId1: '',
    showModal: false, // 显示modal弹窗
    single: false, // false 只显示一个按钮，如果想显示两个改为true即可
    insertText: '',
    classEs: '', //品类单位
    showModal1: false
  },
  realNameConfirm(e) {
    console.log(e.detail)
    if (e.detail == 2) {
      this.onShow()
    }
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
  goFill: function (params) {
    //防止两次连续点击动作太快
    var nowTime = new Date();
    if (nowTime - this.data.tapTime1 < 5000) {
      console.log('阻断')
      return;
    }
    console.log('执行')
    this.setData({
      tapTime1: nowTime
    });
    let index = params.currentTarget.dataset.index;
    let start_addrNos = this.data.start_addrNos;
    let end_addrNos = this.data.end_addrNos;
    let nearbyId = this.data.nearbyId;
    let typeIndex = this.data.typeIndex;
    let typeIndex1 = this.data.typeIndex1;
    let starTime = this.data.starTime;
    let endTime = this.data.endTime;
    let counts = this.data.counts;
    let classEs = this.data.classEs;
    let men = this.data.start_addr.detail_addr;
    let men1 = this.data.end_addr.detail_addr;
    wx.navigateTo({
      url: '../../pages/newDetaile/newDetaile?index=' + index + '&start_addrNos=' + start_addrNos + '&end_addrNos=' + end_addrNos + '&nearbyId=' + nearbyId + '&typeIndex=' + typeIndex + '&typeIndex1=' + typeIndex1 + '&starTime=' + starTime + '&endTime=' + endTime + '&counts=' + counts + '&classEs=' + classEs + '&men=' + men + '&men1=' + men1
    })
  },
  // 点击下拉显示框
  selectTap1() {
    this.setData({
      show1: !this.data.show1
    });
  },
  optionTap1(e) {
    let Index = e.currentTarget.dataset.con; //获取点击的下拉列表的下标
    this.setData({
      selectId1: e.currentTarget.dataset.id,
      selectindex1: Index,
      show1: !this.data.show1
    });
  },
  nextStep: function (params) {
    wx.request({
      url: app.globalData.url + '/api/opreat/reg_car_user',
      method: "POST", //指定请求方式，默认get
      data: datas,
      header: {
        //默认值'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded' //post
      },
      success: function (res) {
        console.log(res)
        console.log(res.data)
        if (res.data != '' && res.data != null && res.data != undefined) {
          // wx.showToast({
          //   title: '注册成功！',
          //   icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
          //   duration: 2000     
          // })
          // setTimeout(function(){
          wx.navigateTo({
            url: '../../pages/registSuccess/registSuccess?id=' + res.data + '&type=' + "车主"
          })
          // },2000)
        } else {
          wx.navigateTo({
            url: '../../pages/registFail/registFail?id=' + res.data
          })
        }
      }
    });
  },
  information: function (e) {
    var that = this;
    console.log(e.detail.value)
    that.setData({
      information: e.detail.value
    })
  },
  model: function (params) {
    wx.navigateTo({
      url: '../../pages/vehicleSelection/vehicleSelection'
    })
  },
  upload: function (e) {
    var that = this
    let pics = that.data.pics;
    let newsImg = that.data.newsImg;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths

        console.log(tempFilePaths)
        pics[e.currentTarget.dataset.index] = tempFilePaths[0];
        let nk = 0;
        for (let i = 0; i < pics.length; i++) {
          console.log(pics[i])
          if (pics[i] != '' && pics[i] != undefined && pics[i] != 'undefined') {
            nk += 1
          }
        }
        that.setData({
          pics: pics,
          nk: nk
        })
        wx.uploadFile({
          url: app.globalData.url + '/api/uploads/uploads',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = JSON.parse(res.data)
            console.log(data.url)

            newsImg[e.currentTarget.dataset.index] = data.url
            that.setData({
              newsImg: newsImg
            })
            wx.showModal({
              title: '',
              content: '上传成功',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
            const uploadTask = wx.uploadFile({
              url: app.globalData.url + '/api/uploads/uploads', //仅为示例，非真实的接口地址
              filePath: tempFilePaths[0],
              name: 'files',
              formData: {
                'user': 'test'
              },
              success: function (res) {
                var data = res.data
                //do something

              }
            })
            uploadTask.onProgressUpdate((res) => {
              that.setData({
                progress: res.progress
              })
              console.log('上传进度', res.progress)
              console.log('已经上传的数据长度', res.totalBytesSent)
              console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)

            })
            uploadTask.abort() // 取消上传任务                         
          },
          fail: function (res) {
            console.log(res)
          }
        })
      }
    })

  },
  insertPhone: function (e) {
    console.log(e.detail.value)
    this.setData({
      con_phone: e.detail.value
    })
  },
  insertName: function (e) {
    console.log(e.detail.value)
    this.setData({
      con_name: e.detail.value
    })
  },
  insertMoney: function (e) {
    console.log(e.detail.value)
    this.setData({
      money: e.detail.value
    })
  },
  insertCounts: function (e) {
    console.log(e.detail.value)
    this.setData({
      counts: e.detail.value
    })
  },
  releaseNew: function (params) {
    //防止两次连续点击动作太快
    var nowTime = new Date();
    if (nowTime - this.data.tapTime < 5000) {
      console.log('阻断')
      return;
    }
    this.setData({
      tapTime: nowTime
    });
    console.log(this.data.tipsNew)
    if (this.data.tipsNew == 1) { //还未注册时状态
      this.setData({
        showModal: true
      })
      return;
    } else if (this.data.tipsNew == 0) { //注册未通过时状态
      wx.showToast({
        title: this.data.insertText,
        icon: 'none', //如果要纯文本，不要icon，将值设为'none'
        mask: true,
        duration: 5000
      })
      return;
    } else {

    }
    let list = this.data.pics;

    console.log(this.data.newsImg)

    let that = this;
    let start_addr = JSON.stringify(this.data.start_addr); //出发地
    let end_addr = JSON.stringify(this.data.end_addr); //卸货地
    console.log(start_addr)
    let starTime = this.data.starTime; //出发时间
    let endTime = this.data.endTime; //到达时间
    let typeCont = this.data.typeCont; //货物信息
    let typeCont1 = this.data.typeCont1; //货物重量
    let typeContId = this.data.typeContId; //货物信息Id
    let typeIndex = this.data.typeIndex;
    let goods_num = this.data.counts; //货物数量
    let selectId1 = that.data.selectId1; //洗消点

    let selectText1 = this.data.selectText1; //车型车长
    let car_length = that.data.selectText1Id.split(',')[0]; //车长
    let car_type = that.data.selectText1Id.split(',')[1]; //车型

    let con_name = this.data.con_name;
    let con_phone = this.data.con_phone;
    let other_pic = this.data.newsImg;
    let money = this.data.money;
    let nk = this.data.nk;
    //  if (nk!=3) {
    //   wx.showToast({
    //     title: "请上传3张图片",
    //     icon: 'none', //如果要纯文本，不要icon，将值设为'none'
    //     mask: true,
    //     duration: 2000
    //   })
    //   return;
    // }
    if (typeCont1 == "" || typeCont1 == null || typeCont1 == undefined || typeCont1 == 'null' || typeCont1 == 'undefined') {
      wx.showToast({
        title: "请填选择货物重量",
        icon: 'none', //如果要纯文本，不要icon，将值设为'none'
        mask: true,
        duration: 2000
      })
      return;
    }
    // if (goods_num == "" || goods_num == null || goods_num == undefined|| goods_num == 'null' || goods_num == 'undefined') {
    //   wx.showToast({
    //     title: "请填写货物数量",
    //     icon: 'none', //如果要纯文本，不要icon，将值设为'none'
    //     mask: true,
    //     duration: 2000
    //   })
    //   return;
    // }
    if (money == "" || money == null || money == undefined || money == 'null' || money == 'undefined') {
      wx.showToast({
        title: "请填写运费",
        icon: 'none', //如果要纯文本，不要icon，将值设为'none'
        mask: true,
        duration: 2000
      })
      return;
    }
    if (endTime == "" || endTime == null || endTime == undefined || endTime == 'null' || endTime == 'undefined') {
      wx.showToast({
        title: "请选择到达时间",
        icon: 'none', //如果要纯文本，不要icon，将值设为'none'
        mask: true,
        duration: 2000
      })
      return;
    }
    if (starTime == "" || starTime == null || starTime == undefined || starTime == 'null' || starTime == 'undefined') {
      wx.showToast({
        title: "请选择发货时间",
        icon: 'none', //如果要纯文本，不要icon，将值设为'none'
        mask: true,
        duration: 2000
      })
      return;
    }
    console.log(con_phone+'测试手机号')
    if (con_phone == "" || con_phone == null || con_phone == undefined || con_phone == 'null' || con_phone == 'undefined') {
     
      wx.showToast({
        title: "请输入手机号",
        icon: 'none', //如果要纯文本，不要icon，将值设为'none'
        mask: true,
        duration: 2000
      })
      return;
    }else{
      if (con_phone.length == 11) {
        let checkedNum = app.checkPhoneNum(con_phone)
        console.log(checkedNum)
        if (checkedNum == true) {

        } else {
          wx.showToast({
            title: "手机号错误",
            icon: 'none', //如果要纯文本，不要icon，将值设为'none'
            mask: true,
            duration: 2000
          })
          return;
        }
      }else{
        wx.showToast({
          title: "手机号错误",
          icon: 'none', //如果要纯文本，不要icon，将值设为'none'
          mask: true,
          duration: 2000
        })
        return;
      }
    }
    if (con_name == "" || typeCont == null || typeCont == undefined || typeCont == 'null' || typeCont == 'undefined') {
      wx.showToast({
        title: "请输入联系人",
        icon: 'none', //如果要纯文本，不要icon，将值设为'none'
        mask: true,
        duration: 2000
      })
      return;
    }
    if (typeCont == "" || typeCont == "请选择货物信息" || typeCont == null || typeCont == undefined) {
      wx.showToast({
        title: "请选择货物信息",
        icon: 'none', //如果要纯文本，不要icon，将值设为'none'
        mask: true,
        duration: 2000
      })
      return;
    }
    if (start_addr == "" || start_addr == "选择发货地" || start_addr == null || start_addr == undefined) {
      wx.showToast({
        title: "请选择发货地",
        icon: 'none', //如果要纯文本，不要icon，将值设为'none'
        mask: true,
        duration: 2000
      })
      return;
    }
    if (end_addr == "" || end_addr == "选择卸货地" || end_addr == null || end_addr == undefined) {
      wx.showToast({
        title: "请选择卸货地",
        icon: 'none', //如果要纯文本，不要icon，将值设为'none'
        mask: true,
        duration: 2000
      })
      return;
    }

    if (selectText1 == "" || selectText1 == "请选择车型车长" || selectText1 == null || selectText1 == undefined) {
      wx.showToast({
        title: "请选择所需车辆",
        icon: 'none', //如果要纯文本，不要icon，将值设为'none'
        mask: true,
        duration: 2000
      })
      return;
    }
    if (that.data.selectCarLength1[0] == '饲料') {
      if (selectId1 == "" || selectText1 == "请选择" || selectId1 == null || selectId1 == undefined) {
        wx.showToast({
          title: "请选择洗消点",
          icon: 'none', //如果要纯文本，不要icon，将值设为'none'
          mask: true,
          duration: 2000
        })
        return;
      }
    }

    let datas = {
      'is_self_type': 0,
      'uid': app.globalData.uid, //(用户id)  
      'start_addr': start_addr, //(发货地，类型int)
      'end_addr': end_addr, //(卸货地，类型int)
      // 'start_area_id': '',//出发地区ID
      // 'end_area_id': '',//到达地区id
      'pre_load_time': starTime, //（(装货时间，类型字符串)）	
      'to_time': endTime, //到达时间
      'goods_type': typeContId, // （自定义时填字符串，并传is_self_type=1,非自定义时传int)
      'goods_weight': typeCont1, //(重量，int)  
      'goods_num': goods_num, //货物数量
      'goods_vol': '', //(体积，int) 
      'car_type': car_type, //(车类型，int) 
      'car_length': car_length, //(车长，int) 	
      'disinfect_place': selectId1, //(冲水点，类型int)		
      'hope_price': money, //（希望运费，浮点）	
      'other_require': '', //（车辆需求备注）	
      'insure_id': '', //（保险id先不传，int）
      'con_name': con_name, //联系人
      'con_phone': con_phone, //联系方式
      'other_pic': other_pic //货物图片
    }

    console.log(datas)

    wx.request({
      url: app.globalData.url + '/api/ownopt/sub_order',
      method: "POST", //指定请求方式，默认get
      data: datas,
      header: {
        //默认值'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded' //post
      },
      success: function (res) {
        console.log(res)
        // console.log(res.data)
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none', //如果要纯文本，不要icon，将值设为'none'
            mask: true,
            duration: 3000
          })
          setTimeout(function (params) {
            wx.reLaunch({
              url: '../../pages/index/index'
            })
          }, 3000)
        } else {
          wx.showToast({
            title: '发布失败！',
            icon: 'none', //如果要纯文本，不要icon，将值设为'none'
            mask: true,
            duration: 3000
          })
        }

      }
    });
  },
  cargo: function (params) {
    wx.navigateTo({
      url: '../../pages/cargoInformation/cargoInformation'
    })
  },
  errorSorry: function (params) {
    if (params != '' && params != null && params != "null" && params != undefined && params != "undefined") {
      return true;
    } else {
      return false;
    }
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
    let hasUserInfo = app.globalData.hasUserInfo;
    console.log(hasUserInfo)
    if (hasUserInfo == false) {
      this.setData({
        showModal1: true
      })
      return;
    } else {
      this.setData({
        showModal1: false
      })
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
          if (res.data.jump == 1) { //未注册
            self.setData({
              insertText: res.data.msg,
              showModal: true,
              tipsNew: 1
            });
          } else { //注册未审核
            self.setData({
              insertText: res.data.msg,
              tipsNew: 0
            })
            wx.showToast({
              title: res.data.msg,
              icon: 'none', //如果要纯文本，不要icon，将值设为'none'
              mask: true,
              duration: 5000
            })
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
    console.log(options.index)
    let that = this;
    if (options.index != undefined && options.index != 'undefined' && options.index != null && options.index != 'null' && options.index != '') {
      console.log(JSON.parse(options.index))
      let contents = JSON.parse(options.index);
      let start_addr = {
        "province": contents.start_addr.province,
        "city": contents.start_addr.city,
        "area": contents.start_addr.area,
        "area_id": contents.start_addr.area_id,
        "detail_addr": contents.start_addr.detail_addr
      }
      let end_addr = {
        "province": contents.end_addr.province,
        "city": contents.end_addr.city,
        "area": contents.end_addr.area,
        "area_id": contents.end_addr.area_id,
        "detail_addr": contents.end_addr.detail_addr
      }
      that.setData({
        'setOutA': contents.start_addr.city + ' ' + contents.start_addr.area,
        'arriveA': contents.end_addr.city + ' ' + contents.end_addr.area,
        'setOut': start_addr,
        'arrive': end_addr,
        'setOutId': 0,
        'arriveID': 0,
        'selectText': contents.goods_info.name,
        'sessionId': contents.goods_info.goods_type,
        'selectText1': contents.req_info.car_length.length + ',' + contents.req_info.car_type.name,
        'selectText1Id': contents.req_info.car_length.id + ',' + contents.req_info.car_type.id,
        'receive': options.index
      })
    }
  },

  /**
   * 图片上传
   * 
   */


  // 删除图片
  deleteImg: function (e) {
    var that = this;
    var pics = this.data.pics;
    var index = e.currentTarget.dataset.index;
    pics.splice(index, 1);
    console.log(pics)
    this.setData({
      pics: pics,
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
    // this.goOrders();
    this.personalInformation();
    console.log(this.data.classEs)
    console.log(this.data.selectCarLength)
    console.log(this.data.selectCarLength1)
    console.log(this.data.selectText1Id)
    console.log(this.data.can)
    console.log(this.data.sessionId)
    console.log(this.data.setOut)
    console.log(this.data.arrive)
    console.log(this.data.selectCarLength.length)
    if (this.data.selectCarLength.length != 0 && this.data.selectCarLength1.length != 0) {
      this.setData({
        selectText1: this.data.selectCarLength[0] + ',' + this.data.selectCarLength1[0],
        selectText1Id: this.data.selectCarLengthId[0] + ',' + this.data.selectCarLength1Id[0]
      })
    }
    if (this.data.can != '') {
      this.setData({
        selectText: this.data.can
      })
    }
    if (tcity.errorSorry(this.data.setOut) == true) {
      this.setData({
        setOutA: this.data.setOut.city + ' ' + this.data.setOut.area
      })
    }
    if (tcity.errorSorry(this.data.arrive) == true) {
      this.setData({
        arriveA: this.data.arrive.city + ' ' + this.data.arrive.area
      })
    }


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