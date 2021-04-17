// pages/addressLocation/addressLocation.js
var tcity = require("../../utils/citys.js");
var app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    can:'',
    canId:'',
    provinceK: '',
    cityK: '',
    districtK:'',
    citycodeK:'',
    addressK:'',
    latitude: '',
    longitude: '',
    formatted_addresses:''
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
        }
        else {
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
        let district=res.result.ad_info.district
        let citycode=res.result.ad_info.adcode
        let address=res.result.address
        let formatted_addresses=res.result.formatted_addresses.recommend
        vm.setData({
          provinceK: province,
          cityK: city,
          districtK:district,
          citycodeK:citycode,
          addressK:address,
          latitude: latitude,
          longitude: longitude,
          formatted_addresses:formatted_addresses
        })
        if(vm.data.setOutA=='选择发货地'){
          vm.setData({
            setOutA:city+' '+district,
            setOut:{'province': province, 'city': city, 'area': district, 'area_id': citycode, detail_addr: address}
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

  bindChange: function (e) {
    console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;
console.log(val[0]+','+t[0])
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
      console.log(cityData[val[0]].code)
      this.setData({
        province: this.data.provinces[val[0]],
        provinceCode: cityData[val[0]].code,
        city: cityData[val[0]].sub[0].name,
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

      this.setData({
        city: this.data.citys[val[1]],
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
  goCon:function(params){
    let can = params.currentTarget.dataset.value;
    let canId = params.currentTarget.dataset.id;
    this.setData({can:can,canId:canId})
  },
  goTopTwo: function (params) {
    console.log(params)
    let can=params.currentTarget.dataset.value
    let canId=0;
    let indexs = this.data.indexs;
    let start_addr = {
      "province": this.data.provinceK,
      "city":  this.data.cityK,
      "area":  this.data.districtK,
      "area_id": this.data.citycodeK,
      "detail_addr": this.data.addressK
    }
    if (can != '' && can != null && can != undefined&& can != 'null' && can != 'undefined') {
  
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
    let searchValue=this.data.searchValue;
    let that = this;
    let can = this.data.can;
    let canId = this.data.canId;
    let indexs = this.data.indexs;
    if(can != '' && can != null && can != undefined&& can != 'null' && can != 'undefined'){

    }else{
     can = searchValue;
     canId = 0;
    }
    let start_addr = {
      "province": this.data.province,
      "city":  this.data.city,
      "area":  this.data.county,
      "area_id": this.data.provinceCode,
      "detail_addr": can
    }
    if (can != '' && can != null && can != undefined&& can != 'null' && can != 'undefined') {
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
  inputChange(e) {
    let self = this,
      value = e.detail.value;
    if (value == '') {
      var list = [];
      self.setData({
        list: list,
        nones:'none'
      });
      return;
    }
    console.warn(value);
    self.request(value);
  },
  request(value) {
    var self = this;
    self.setData({
      list: [{
        'name': "秋林公司",
        'id': 1
      }, {
        'name': "景山公园",
        'id': 2
      }, {
        'name': "泰山旅游区",
        'id': 3
      }, {
        'name': "老虎滩",
        'id': 4
      }, {
        'name': "新发地市场",
        'id': 5
      }],
      nones: 'block'
    });
    return;
    var url = 'http://suggestion.baidu.com/su?wd=' + value;
    wx.request({
      url: url,
      success(res) {
        console.log(res.data);
        //window.baidu.sug({q:"1",p:false,s:["18,19","114电影网","126","131","1688","12123","12345","10月1日放假安排2019","188比分直播","118图库"]});
        //通过正则截取json字符串
        var result = res.data.match(/\(([^)]*)\)/);
        if (result) {
          console.log(result[1]);
          var data = result[1];
          //获取[]的数组信息
          result = data.match(/\[(.*)\]/);
          console.log(result[0]);
          //["114电影网","131","1688","12345","10月1日放假安排2019","188比分直播","118图库","139邮箱","126邮箱登录","123"]
          var array = result[0];
          console.warn(array);
          //字符串格式的json转换成json对象
          array = JSON.parse(array);
          // var array = ["114电影网", "131", "1688", "12345", "10月1日放假安排2019", "188比分直播", "118图库", "139邮箱", "126邮箱登录", "123"];
          console.warn(array);
          var list = [];
          list.push(...array);
          self.setData({
            list: list
          });
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: '4PVBZ-NQMW5-I5TIB-QD5TE-IDSA6-L3FV7' //这里自己的key秘钥进行填充
    });
    console.log(options.index)
    this.setData({
      indexs: options.index
    })

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
      'county': cityData[0].sub[0].sub[0].name
    })
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
    vm.getUserLocation();
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