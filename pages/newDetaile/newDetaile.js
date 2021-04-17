// pages/newDetaile/newDetaile.js
var tcity = require("../../utils/citys.js");
var app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classEs:'',
    hei: '',
    moCity: [0, 0, 0],
    currentTab: 0,
    currentTab1: 0,
    list2: [{
      name: '20km',
      on: false
    }, {
      name: '30km',
      on: false
    }, {
      name: '40km',
      on: false
    }, {
      name: '50km',
      on: false
    }],
    searchValue: '',
    list: [],
    nones: 'none',
    indexs: '',
    provinces: [],
    province: "",
    provinceCode: '',
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    can: '',
    canId: '',
    provinceK: '',
    cityK: '',
    districtK: '',
    citycodeK: '',
    addressK: '',
    latitude: '',
    longitude: '',
    formatted_addresses: '',
    isFold: true,
    isFold1: true,
    selectList1: [],
    selectList2: [{
      value: '0-5',
      id: 1
    }, {
      value: '5-10',
      id: 2
    }, {
      value: '10-15',
      id: 3
    }, {
      value: '15-20',
      id: 4
    }, {
      value: '20-25',
      id: 5
    }],
    hasEmptyGrid: false, //日期
    cur_year: '', //日期
    cur_month: '', //日期
    provinces8: [], //目的地
    province8: "",
    provinceCode8: '',
    citys8: [],
    city8: "",
    countys8: [],
    county8: '',
    value8: [0, 0, 0],
    values8: [0, 0, 0],
    yearDay: '',
    typeIndex: 0,
    typeIndex1: 0,
    countsTwo: '',
    v8: 0,
    v9: '',
    v10: '',
    v1: 0,
    v2: '',
    v3: '',
    starTime: '', //出发时间
    endTime: '', //到达时间
    day: '', //天数
    nearby: '', //附近装货
    nearbyId: '',
    provinces: [],
    province: "",
    provinceCode: '',
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, '',''],
    values: [0, 0, 0],
    condition: false,
    provinces8: [], //目的地
    province8: "",
    provinceCode8: '',
    citys8: [],
    city8: "",
    countys8: [],
    county8: '',
    value8: [0, '', ''],
    values8: [0, 0, 0],
    men:'',
    men1:'',
  },
  goTips:function(e){
    console.log(e)
    this.setData({men:e.detail.value})
  },
  goTips1:function(e){
    console.log(e)
    this.setData({men1:e.detail.value})
  },
  clears: function () {
    this.setData({
      starTime: '', //出发时间
      endTime: '', //到达时间
      v8: 0,
      v9: '',
      v10: '',
      v1: 0,
      v2: '',
      v3: '',
      day: '', //天数
    nearby: '', //附近装货
    nearbyId: '',
    typeIndex: 0,
    typeIndex1: 0,
    countsTwo: '',
    })

    let e = {
      currentTarget: {
        dataset: {
          index: 0,
          value: '省'
        }
      }
    }
    this.qiehuan(e)
    let e1 = {
      currentTarget: {
        dataset: {
          index: 0,
          value: '市'
        }
      }
    }
    this.qiehuan(e1)
    let e2 = {
      currentTarget: {
        dataset: {
          index: 0,
          value: '区'
        }
      }
    }
    this.qiehuan(e2)

    let e8 = {
      currentTarget: {
        dataset: {
          index: 0,
          value: '省'
        }
      }
    }
    this.qiehuan8(e8)
    let e9 = {
      currentTarget: {
        dataset: {
          index: 0,
          value: '市'
        }
      }
    }
    this.qiehuan8(e9)
    let e10 = {
      currentTarget: {
        dataset: {
          index: 0,
          value: '区'
        }
      }
    }
    this.qiehuan8(e10)
  },
  shopType: function () {
    let that = this;
    wx.request({
      url: app.globalData.url + '/api/opreat/get_goodstype',
      method: "POST", //指定请求方式，默认get
      data: '',
      header: {
        //默认值'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded' //post
      },
      success: function (res) {
        console.log(res)
        console.log(res.data)
        that.setData({
          selectList1: res.data
        })
        if(that.data.classEs!=''){

        }else{
          that.setData({classEs:res.data[0].unit})
        }
      }
    });
  },
  //引用日历组件
  // dianji: function () {
  //   this.yunxin() //调用回调函数
  // },
  yunxin: function () {
    var that = this;
    that.rili = that.selectComponent("#rili")
    var starTime = ''
    var day = ''
    var endTime = ''
    that.rili.xianShi({
      data: function (res) {
        console.log(res) //选择的日期
        if (res != null) {
          if (res.length == 1) {
            starTime = res[0].data
          } else if (res.length == 2) {
            starTime = res[0].data
            endTime = res[1].data
            day = res[1].chaDay
          }
        } else {
          starTime = ''
          day = ''
          endTime = ''
        }
        that.setData({
          starTime: starTime,
          endTime: endTime,
          day: day,
        })
      }
    })
  },
  showAll: function (e) {
    this.setData({
      isFold: !this.data.isFold,
    })
  },
  showAll1: function (e) {
    this.setData({
      isFold1: !this.data.isFold1,
    })
  },
  counts: function (e) {
    console.log(e.detail.value)
    this.setData({
      countsTwo: e.detail.value
    })
  },
  goIndex: function (e) {
    console.log(e.currentTarget.dataset.index)
    let index = parseInt(e.currentTarget.dataset.index);
    let selectList1= this.data.selectList1;
    this.setData({
      typeIndex: index,
      classEs:selectList1[index].unit
    })
  },
  goIndex1: function (e) {
    console.log(e.currentTarget.dataset.index)
    let index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      typeIndex1: index
    })
  },
  goon: function (e) { //选择附近装货
    console.log(e.currentTarget.dataset.index)
    let index = parseInt(e.currentTarget.dataset.index);
    let addressK = this.data.addressK;
    if (addressK != '' && addressK != null && addressK != undefined && addressK != 'null' && addressK != 'undefined') {

    } else {
      wx.showToast({
        title: '无法获取到当前地理位置请确认是否已授权小程序地理位置',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    let list = this.data.list2;
    console.log(list.length)
    for (let i = 0; i < list.length; i++) {
      if (i == index) {
        list[index].on = true
      } else {
        list[i].on = false
      }
    }

    this.setData({
      list2: list,
      nearby: list[index].name,
      nearbyId: index
    })
  },
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  goNext: function () {

    let v1 = this.data.v1; //出发地
    let v2 = this.data.v2; //出发地
    let v3 = this.data.v3; //出发地
    let v8 = this.data.v8; //目的地
    let v9 = this.data.v9; //目的地
    let v10 = this.data.v10; //目的地
    let men = this.data.men; //出发地详细地址
    let men1= this.data.men1; //目的地详细地址
    // if(men==''||men==null||men==undefined||men=='null'||men=='undefined'){
    //   wx.showToast({
    //     title: '请输入出发地详细地址',
    //     icon: 'none',
    //     duration: 1000
    //   })
    //   return;
    // }
    // if(men1==''||men1==null||men1==undefined||men1=='null'||men1=='undefined'){
    //   wx.showToast({
    //     title: '请输入目的地详细地址',
    //     icon: 'none',
    //     duration: 1000
    //   })
    //   return;
    // }
    var cityData = this.data.cityData;
    console.log('出发地' + v1 + '--' + v2 + '--' + v3 + '--')
    console.log('目的地' + v8 + '--' + v9 + '--' + v10 + '--')
    console.log(cityData[v8])
    let city;
    let area;
    let city1;
    let area1;
    if(v2!=''&&v2!=null&&v2!=undefined&&isNaN(v2)!=true){
      city=cityData[v1].sub[v2].name;
    }else{
      city=''
    }
    if(v3!=''&&v3!=null&&v3!=undefined&&isNaN(v3)!=true){
      area=cityData[v1].sub[v2].sub[v3].name;
    }else{
      area=''
    }

    if(v9!=''&&v9!=null&&v9!=undefined&&isNaN(v9)!=true){
      city1=cityData[v8].sub[v9].name;
    }else{
      city1=''
    }
    if(v10!=''&&v10!=null&&v10!=undefined&&isNaN(v10)!=true){
      area1=cityData[v8].sub[v9].sub[v10].name;
    }else{
      area1=''
    }
    let start_addr = {
      "province": cityData[v1].name,
      "city": city,
      "area": area,
      "area_id": cityData[v1].code,
      "detail_addr": men
    }

    let end_addr = {
      "province": cityData[v8].name,
      "city": city1,
      "area": area1,
      "area_id": cityData[v8].code,
      "detail_addr": men1
    }
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      start_addr: start_addr, //出发地
      end_addr: end_addr, //目的地
      starTime: this.data.starTime, //出发时间
      endTime: this.data.endTime, //到达时间
      day: this.data.day, //天数
      counts: this.data.countsTwo, //货物数量
      typeIndex: this.data.typeIndex, //货品类型下标
      typeIndex1: this.data.typeIndex1, //货物重量下标
      typeContId: this.data.selectList1[this.data.typeIndex].id, //货品类型
      typeContId1: this.data.selectList2[this.data.typeIndex1].id, //货物重量
      typeCont: this.data.selectList1[this.data.typeIndex].name, //货品类型
      typeCont1: this.data.selectList2[this.data.typeIndex1].value, //货物重量
      nearby: this.data.addressK + ',' + this.data.nearby, //出发地附近 
      nearbyId: this.data.nearbyId, //附近下标
      nearbyKm: this.data.nearby, //出发地附近 
      start_addrNos: v1 + ',' + v2 + ',' + v3, //出发地坐标
      end_addrNos: v8 + ',' + v9 + ',' + v10, //目的地坐标
      classEs:this.data.classEs//品类单位
    })
    wx.navigateBack({
      delta: 1,
    })
  },

  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换

  /**
   * 生命周期函数--监听页面加载
   */
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab1 === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab1: e.target.dataset.current,
      })
    }
  },
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        } else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(JSON.stringify(res))
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log(res);
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        let district = res.result.ad_info.district
        let citycode = res.result.ad_info.adcode
        let address = res.result.address
        let formatted_addresses = res.result.formatted_addresses.recommend
        let provinces=vm.data.provinces;
       

        let v1;
        let v2;
        let v3;
        for(let i=0;i<provinces.length;i++){
          if((provinces[i]==province)||(provinces[i]+'市'==province)){
               v1=i
          }
        }
        let e = {
          currentTarget: {
            dataset: {
              index: v1,
              value: '省'
            }
          }
        }
        vm.qiehuan(e)
        // let citys=vm.data.citys;
        // for(let i=0;i<citys.length;i++){
        //   if(citys[i]==city){
        //        v2=i
        //   }
        // }
        // let e1 = {
        //   currentTarget: {
        //     dataset: {
        //       index: v2,
        //       value: '市'
        //     }
        //   }
        // }
        // vm.qiehuan(e1)
        // let countys=vm.data.countys;
        // for(let i=0;i<countys.length;i++){
        //   if(countys[i]==district){
        //        v3=i
        //   }
        // }
        // let e2 = {
        //   currentTarget: {
        //     dataset: {
        //       index: v3,
        //       value: '区'
        //     }
        //   }
        // }
        // vm.qiehuan(e2)
        console.log(v1+'--'+v2+'--'+v3)
        vm.setData({
          province: province,
          city: '',
          county: '',
          citycodeK: citycode,
          addressK: address,
          latitude: latitude,
          longitude: longitude,
          formatted_addresses: formatted_addresses,
          v1:v1,
          v2:'',
          v3:'',
          men:''
        })
       
        
      
        if (vm.data.setOutA == '选择发货地') {
          vm.setData({
            setOutA: city + ' ' + district,
            setOut: {
              'province': province,
              'city': city,
              'area': district,
              'area_id': citycode,
              'detail_addr': address
            }
          })
        }

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },

  qiehuan: function (e) {
    console.log(e)
    var val = e.currentTarget.dataset.val;
    var cityData = this.data.cityData;
    if (e.currentTarget.dataset.value == "省") {
      let index = e.currentTarget.dataset.index;
      const citys = [];
      const countys = [];
      for (let i = 0; i < cityData[index].sub.length; i++) {
        citys.push(cityData[index].sub[i].name)
      }
      for (let i = 0; i < cityData[index].sub[0].sub.length; i++) {
        countys.push(cityData[index].sub[0].sub[i].name)
      }
      this.setData({
        v1: e.currentTarget.dataset.index,
        v2: '',
        v3: '',
        province: this.data.provinces[index],
        provinceCode: cityData[index].code,
        // city: cityData[index].sub[0].name,
        city: '',
        citys: citys,
        // county: cityData[index].sub[0].sub[0].name,
        county:'',
        countys: countys,
      })
    }
    if (e.currentTarget.dataset.value == "市") {
      let index = e.currentTarget.dataset.index;
      let v1 = this.data.v1;
      const countys = [];
      for (let i = 0; i < cityData[v1].sub[index].sub.length; i++) {
        countys.push(cityData[v1].sub[index].sub[i].name)
      }
      console.log(index)
      this.setData({
        v2: e.currentTarget.dataset.index,
        v3: 0,
        city: this.data.citys[index],
        county: cityData[v1].sub[index].sub[0].name,
        countys: countys,
      })
    }
    if (e.currentTarget.dataset.value == "区") {
      let index = e.currentTarget.dataset.index;
      let v2=this.data.v2;
      if(v2==''){
        v2=0;
      }
      this.setData({
        v2:v2,
        v3: e.currentTarget.dataset.index,
        county: this.data.countys[index],
      })
    }

  },

  qiehuan8: function (e) {
    console.log(e)
    var val = e.currentTarget.dataset.val;
    var cityData = this.data.cityData;
    if (e.currentTarget.dataset.value == "省") {
      let index = e.currentTarget.dataset.index;
      const citys = [];
      const countys = [];
      for (let i = 0; i < cityData[index].sub.length; i++) {
        citys.push(cityData[index].sub[i].name)
      }
      for (let i = 0; i < cityData[index].sub[0].sub.length; i++) {
        countys.push(cityData[index].sub[0].sub[i].name)
      }
      this.setData({
        v8: e.currentTarget.dataset.index,
        v9: '',
        v10: '',
        province8: this.data.provinces8[index],
        provinceCode8: cityData[index].code,
        // city8: cityData[index].sub[0].name,
        city8: '',
        citys8: citys,
        county8: cityData[index].sub[0].sub[0].name,
        county8: '',
        countys8: countys,
      })
    }
    if (e.currentTarget.dataset.value == "市") {
      let index = e.currentTarget.dataset.index;
      let v8 = this.data.v8;
      const countys = [];
      for (let i = 0; i < cityData[v8].sub[index].sub.length; i++) {
        countys.push(cityData[v8].sub[index].sub[i].name)
      }
      this.setData({
        v9: e.currentTarget.dataset.index,
        v10: 0,
        city8: this.data.citys8[index],
        county8: cityData[v8].sub[index].sub[0].name,
        countys8: countys,
      })
    }
    if (e.currentTarget.dataset.value == "区") {
      let index = e.currentTarget.dataset.index;
      let v9=this.data.v2;
      if(v9==''){
        v9=0;
      }
      this.setData({
        v9:v9,
        v10: e.currentTarget.dataset.index,
        county8: this.data.countys8[index],
      })
    }




  },
  open: function () {
    this.setData({
      condition: !this.data.condition,
      dis: false
    })
    // if (this.data.myname != '' && this.data.myphone != '' && this.data.myjie != '' && this.data.myyzm != ''&&this.data.dis != true) {
    //   this.setData({
    //     iscolor: '#ef5126',
    //     onoff: 'on'
    //   })
    // } else {
    //   this.setData({
    //     iscolor: '#999',
    //     onoff: 'off'
    //   })
    // }
  },
  goCon: function (params) {
    let can = params.currentTarget.dataset.value;
    let canId = params.currentTarget.dataset.id;
    this.setData({
      can: can,
      canId: canId
    })
  },
  goTopTwo: function (params) {
    console.log(params)
    let can = params.currentTarget.dataset.value
    let canId = 0;
    let indexs = this.data.indexs;
    let start_addr = {
      "province": this.data.provinceK,
      "city": this.data.cityK,
      "area": this.data.districtK,
      "area_id": this.data.citycodeK,
      "detail_addr": this.data.addressK
    }
    if (can != '' && can != null && can != undefined && can != 'null' && can != 'undefined') {

      if (indexs == "0") {
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.setData({
          setOut: start_addr,
          setOutId: canId
        })
        wx.navigateBack({
          delta: 1,
        })
      } else if (indexs == "1") {
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.setData({
          arrive: start_addr,
          arriveID: canId
        })
        wx.navigateBack({
          delta: 1,
        })
      }

    } else {
      wx.showToast({
        title: "请选择一个地址",
        icon: 'none', //如果要纯文本，不要icon，将值设为'none'
        mask: true,
        duration: 2000
      })
    }
  },
  goTop: function (params) {
    console.log(this.data.province)
    console.log(this.data.provinceCode)
    let searchValue = this.data.searchValue;
    let that = this;
    let can = this.data.can;
    let canId = this.data.canId;
    let indexs = this.data.indexs;
    if (can != '' && can != null && can != undefined && can != 'null' && can != 'undefined') {

    } else {
      can = searchValue;
      canId = 0;
    }
    let start_addr = {
      "province": this.data.province,
      "city": this.data.city,
      "area": this.data.county,
      "area_id": this.data.provinceCode,
      "detail_addr": can
    }
    if (can != '' && can != null && can != undefined && can != 'null' && can != 'undefined') {
      if (indexs == "0") {
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.setData({
          setOut: start_addr,
          setOutId: canId
        })
        wx.navigateBack({
          delta: 1,
        })
      } else if (indexs == "1") {
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.setData({
          arrive: start_addr,
          arriveID: canId
        })
        wx.navigateBack({
          delta: 1,
        })
      }
    } else {
      wx.showToast({
        title: "请选择一个地址",
        icon: 'none', //如果要纯文本，不要icon，将值设为'none'
        mask: true,
        duration: 2000
      })
    }
  },
  //日历插件
  dateSelectAction: function (e) {
    var cur_day = e.currentTarget.dataset.idx;
    this.setData({
      todayIndex: cur_day,
      yearDay: this.data.cur_year + '-' + this.data.cur_month + '-' + (parseInt(cur_day) + 1)
    })
    console.log(`点击的日期:${this.data.cur_year}年${this.data.cur_month}月${cur_day + 1}日`);
  },

  setNowDate: function () {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const todayIndex = date.getDate() - 1;
    console.log(`日期：${todayIndex}`)
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    console.log(cur_year + ',' + cur_month + ',' + parseInt(todayIndex) + 1)
    this.setData({
      cur_year: cur_year,
      cur_month: cur_month,
      weeks_ch,
      todayIndex,
      yearDay: cur_year + '-' + cur_month + '-' + (parseInt(todayIndex) + 1)
    })
  },

  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  calculateDays(year, month) {
    let days = [];

    const thisMonthDays = this.getThisMonthDays(year, month);

    for (let i = 1; i <= thisMonthDays; i++) {
      days.push(i);
    }

    this.setData({
      days
    });
  },
  handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })

    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    }
  },
  onLoad: function (options) {
    this.setNowDate();
    this.yunxin();
    qqmapsdk = new QQMapWX({
      key: '4PVBZ-NQMW5-I5TIB-QD5TE-IDSA6-L3FV7' //这里自己的key秘钥进行填充
    });
    console.log(options.index)


    var that = this;

    tcity.init(that);

    var cityData = that.data.cityData;


    const provinces = [];
    const citys = [];
    const countys = [];
    const provinces8 = [];
    const citys8 = [];
    const countys8 = [];
    let provinceCode=[];
    let cityCode=[];
    let countyCode=[];
    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
      provinces8.push(cityData[i].name);
      provinceCode.push(cityData[i].code);
      
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
      citys8.push(cityData[0].sub[i].name)
      cityCode.push(cityData[0].sub[i].code)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
      countys8.push(cityData[0].sub[0].sub[i].name)
      countyCode.push(cityData[0].sub[0].sub[i].code)
    }

    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'provinceCode': provinceCode,
      // 'city': cityData[0].sub[0].name,
      'city': '',
      'cityCode': cityCode,
      // 'county': cityData[0].sub[0].sub[0].name,
      'county': '',
      'countyCode': countyCode,
      'provinces8': provinces,
      'citys8': citys,
      'countys8': countys,
      'province8': cityData[0].name,
      'provinceCode8': cityData[0].code,
      // 'city8': cityData[0].sub[0].name,
      // 'county8': cityData[0].sub[0].sub[0].name
      'city8': '',
      'county8': ''

    })
    console.log("出发地" + options.start_addrNos)
    console.log("目的地" + options.men1)
    that.setData({
      currentTab: options.index
    })
    let v1 = parseInt(options.start_addrNos.split(',')[0]);
    let v2 = parseInt(options.start_addrNos.split(',')[1]);
    let v3 = parseInt(options.start_addrNos.split(',')[2]);
    let v8 = parseInt(options.end_addrNos.split(',')[0]);
    let v9 = parseInt(options.end_addrNos.split(',')[1]);
    let v10 = parseInt(options.end_addrNos.split(',')[2]);
    // let men =
    if (options.start_addrNos == '') {
      that.getUserLocation();//判断如果之前已经选择过地区就不再给予调起当前定位位置信息如果没有则按第一次进来处理调起定位权限
      return;
    }
    let list2 = this.data.list2;
    // list2[options.nearbyId].on=true;//附近距离暂时没有
    that.setData({
      v1: v1,
      v2: v2,
      v3: v3,
      v8: v8,
      v9: v9,
      v10: v10,
      // nearby:list2[options.nearbyId].name,
      // nearbyId:options.nearbyId,
      list2: list2,
      typeIndex: options.typeIndex,
      typeIndex1: options.typeIndex1,
      starTime: options.starTime,
      endTime: options.endTime,
      day: options.day,
      counts: options.counts,
      countsTwo: options.counts,
      classEs:options.classEs,
      men:options.men,
      men1:options.men1,
    })
    console.log(v1 + ',' + v2 + ',' + v3 + ',' + v8 + ',' + v9 + ',' + v10)
    let e = {
      currentTarget: {
        dataset: {
          index: v1,
          value: '省'
        }
      }
    }
    this.qiehuan(e)
    let e1 = {
      currentTarget: {
        dataset: {
          index: v2,
          value: '市'
        }
      }
    }
    this.qiehuan(e1)
    let e2 = {
      currentTarget: {
        dataset: {
          index: v3,
          value: '区'
        }
      }
    }
    this.qiehuan(e2)

    let e8 = {
      currentTarget: {
        dataset: {
          index: v8,
          value: '省'
        }
      }
    }
    this.qiehuan8(e8)
    let e9 = {
      currentTarget: {
        dataset: {
          index: v9,
          value: '市'
        }
      }
    }
    this.qiehuan8(e9)
    let e10 = {
      currentTarget: {
        dataset: {
          index: v10,
          value: '区'
        }
      }
    }
    this.qiehuan8(e10)
    console.log('初始化完成');
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
    let vm = this;
    
    vm.shopType();
    
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