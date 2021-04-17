// pages/issue/issue.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: [100, 200, 300], //下拉列表的数据
    selectindex: '请选择时间', //选择的下拉列表下标
    selectId: '',
    requirement: '',
    requirement1: '',
    requirement2: '',
    setOut: '',
    arrive: '',
    selectText: '',
    selectText1: '',
    selectId1: '',
    sessionId: '',
    selectText1Id: '',
    active: 0,
    currentTab: 0,
    timeLists: '',
    displayTwo:'none'
  },
  // 选项卡  主要是通过判断e.target.id的值 设置对应的id显示
  assignment:function(){
    let timeLists = this.data.timeLists;
    let currentTab=this.data.currentTab;
    let cons='';
    for (let i = 0; i < timeLists.length; i++) {
     if (i == currentTab) {
       cons+=timeLists[i].day;
       for (let j = 0; j < timeLists[i].con.length; j++) {
         if(timeLists[i].con[j].off==true){
           cons+=timeLists[i].con[j].value;
         }else{
           
         }
       }
     }
   }
   this.setData({selectindex:cons,displayTwo:'none'})
  },
  showtime:function(){
    this.setData({displayTwo:'block'})
  },
  hidetime:function(){
    this.setData({displayTwo:'none'})
  },
  gotime:function(e){
     console.log(e.currentTarget.dataset)
     let that=this;
     let index=e.currentTarget.dataset.index;
     let topindex=e.currentTarget.dataset.topindex;
     let timeLists = this.data.timeLists;
     for (let i = 0; i < timeLists.length; i++) {
      if (i == topindex) {
        for (let j = 0; j < timeLists[i].con.length; j++) {
          if(j==index){
          timeLists[i].con[index].off=true
          }else{
            timeLists[i].con[j].off=false
          }
        }
      }else{
        for (let j = 0; j < timeLists[i].con.length; j++) {
          timeLists[i].con[j].off=false
        }
      }
    }

    this.setData({
      timeLists:timeLists
    });
  },
  switchNav: function (e) {
    var page = this;
    var id = e.target.id;
    if (this.data.currentTab == id) {
      return false;
    } else {
      let timeLists = page.data.timeLists;
      for (let i = 0; i < timeLists.length; i++) {
        if (i == id) {
          for (let j = 0; j < timeLists[i].con.length; j++) {
            timeLists[i].con[0].off=true
          }
        }else{
          for (let j = 0; j < timeLists[i].con.length; j++) {
            timeLists[i].con[j].off=false
          }
        }
      }
      page.setData({
        currentTab: id,
        timeLists:timeLists
      });
    }
    page.setData({
      active: id
    });
  },
  requirement: function (e) {
    var that = this;
    console.log(e.detail.value)
    that.setData({
      requirement: e.detail.value
    })
  },
  requirement1: function (e) {
    var that = this;
    console.log(e.detail.value)
    that.setData({
      requirement1: e.detail.value
    })
  },
  requirement2: function (e) {
    var that = this;
    console.log(e.detail.value)
    that.setData({
      requirement2: e.detail.value
    })
  },
  // 点击下拉显示框
  selectTap1() {
    this.setData({
      show: !this.data.show
    });
  },
  optionTap1(e) {
    let Index = e.currentTarget.dataset.con; //获取点击的下拉列表的下标
    this.setData({
      selectId: e.currentTarget.dataset.id,
      selectindex: Index,
      show: !this.data.show
    });
  },
  deliverGoods: function (params) {

    let that = this;
    let setOut = that.data.setOut;
    let arrive = that.data.arrive;
    let selectText = that.data.selectText;
    let selectText1 = that.data.selectText1;
    let selectId1 = that.data.selectId1;
    let selectId = that.data.selectindex;
    let car_length = that.data.selectText1Id.split(',')[0];
    let car_type = that.data.selectText1Id.split(',')[1];
    let requirement = that.data.requirement;
    let requirement1 = that.data.requirement1;
    let requirement2 = that.data.requirement2;
    let sessionId = that.data.sessionId;
    let type = 0;
    if (sessionId != '' && sessionId != null && sessionId != undefined && sessionId != 'null' && sessionId != 'undefined') {
      type = 0;
      selectText = sessionId;
    } else {
      type = 1;
    }
    // let kaishi=JSON.parse(setOut);
    // let jieshu=JSON.parse(arrive);
    // let start={"province": kaishi.province, "city": kaishi.city, "area": kaishi.area, "area_id": kaishi.area_id, "detail_addr": kaishi.detail_addr}
    // let end={"province": jieshu.province, "city": jieshu.city, "area": jieshu.area, "area_id": jieshu.area_id, "detail_addr": jieshu.detail_addr}
    console.log(that.data.selectText1Id)
    console.log(selectId)
    if (selectId == '' || selectId == 'null' || selectId == 'undefined' || selectId == null || selectId == undefined) {
      wx.showToast({
        title: '请填写装货时间',
        icon: 'none', //如果要纯文本，不要icon，将值设为'none'
        mask: true,
        duration: 3000
      })
      return;
    }
    if (requirement2 == '' || requirement2 == 'null' || requirement2 == 'undefined' || requirement2 == null || requirement2 == undefined) {
      wx.showToast({
        title: '请填写备注',
        icon: 'none', //如果要纯文本，不要icon，将值设为'none'
        mask: true,
        duration: 3000
      })
      return;
    }

    let datas = {
      'is_self_type': type,
      'uid': app.globalData.uid, //(用户id)  
      'start_addr': setOut, //(发货地，类型int)
      'end_addr': arrive, //(卸货地，类型int)
      'pre_load_time': selectId, //（(装货时间，类型字符串)）	
      'goods_type': selectText, // （自定义时填字符串，并传is_self_type=1,非自定义时传int)
      'goods_weight': '', //(重量，int)  
      'goods_vol': '', //(体积，int) 
      'car_type': car_type, //(车类型，int) 
      'car_length': car_length, //(车长，int) 	
      'disinfect_place': selectId1, //(冲水点，类型int)		
      'hope_price': requirement1, //（希望运费，浮点）	
      'other_require': requirement2, //（车辆需求备注）	
      'insure_id': '', //（保险id先不传，int）
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
            // wx.switchTab({
            //   url: '../../pages/middle/middle'
            // })
            wx.reLaunch({
              url: '../../pages/index/index'
            })
            //     let pages = getCurrentPages();
            // let prevPage = pages[pages.length - 3];
            // prevPage.setData({
            //   address1: [e.detail.value[0].split(",")[0]],
            //   addressid: e.detail.value[0].split(",")[1]
            // })
            // wx.navigateBack({
            //   delta: 2,
            // })
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
  /**
   * 生命周期函数--监听页面加载
   */
  times: function () {
    let that = this;
    wx.request({
      url: app.globalData.url + '/api/ownopt/loadtime',
      method: "POST", //指定请求方式，默认get
      data: '',
      header: {
        //默认值'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded' //post
      },
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        let timeLists = res.data;
        console.log(timeLists.length)
        console.log(timeLists)

        for (let i = 0; i < timeLists.length; i++) {
          let op = timeLists[i].option;
          let newOp = [];
          for (let j = 0; j < op.length; j++) {
            if (j == 0 && i == 0) {
              newOp.push({
                value: op[j],
                off: true
              })
            } else {
              newOp.push({
                value: op[j],
                off: false
              })
            }
          }
          timeLists[i].con = newOp
          // console.log(newOp)
        }
        that.setData({
          timeLists: timeLists
        })

      }
    });
  },
  onLoad: function (options) {
    console.log(options)
    // console.log(JSON.parse(options.receive))

    this.setData({
      setOut: options.setOut,
      arrive: options.arrive,
      selectText: options.selectText,
      selectText1: options.selectText1,
      selectId1: options.selectId1,
      sessionId: options.sessionId,
      selectText1Id: options.selectText1Id

    })
    if (options.receive != '' && options.receive != null && options.receive != undefined && options.receive != 'null' && options.receive != 'undefined') {
      let receive = JSON.parse(options.receive)
      this.setData({
        'selectindex': receive.pre_load_time,
        'requirement1': receive.hope_price,
        'requirement2': receive.other_require,
        receive: JSON.parse(options.receive),
        'selectId': receive.pre_load_time
      })
    }

  },
  //是否选中
  checkedTap: function () {
    this.setData({
      "checked": !this.data.checked
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
    this.times();
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