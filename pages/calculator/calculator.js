// pages/calculator/calculator.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
let qqmapsdk = new QQMapWX({
  key: '4PVBZ-NQMW5-I5TIB-QD5TE-IDSA6-L3FV7' //这里自己的key秘钥进行填充
});
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    startMax: '',
    endMax: '',
    start: '',
    end: '',
    start1: '',
    end1: '',
    gongli: 0,
    markers: [],
    markers1: [],
    scrollHeight: 0,
    model: 'none',
    model1: 'none',
    latitude:'',
    longitude:'',
    times:'0小时',
    distance:"0公里"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goset: function (e) {
      let data = e.currentTarget.dataset;
      this.setData({
        startMax:data.title,
        start: data.latitude,
        end: data.longitude,
        model: 'none',
        model1: 'none',
      })
    },
    goset1: function (e) {
      let data = e.currentTarget.dataset;
      this.setData({
        endMax:data.title,
        start1: data.latitude,
        end1: data.longitude,
        model: 'none',
        model1: 'none',
      })
    },
    gostart: function (e) {
      console.log(e)
      if (e.detail.value != '') {
        this.setData({
          startMax: e.detail.value,
          model: 'block'
        })
      } else {
        this.setData({
          startMax: e.detail.value,
          model: 'none'
        })
      }
      this.nearby_search(e.detail.value, 1)
    },

    goend: function (e) {
      console.log(e)
      if (e.detail.value != '') {
        this.setData({
          endMax: e.detail.value,
          model1: 'block'
        })
      } else {
        this.setData({
          endMax: e.detail.value,
          model1: 'none'
        })
      }

      this.nearby_search(e.detail.value, 2)
    },
    // goselect: function () {
    //   let self = this;
    //   let qi = self.atuoGetLocation(self.data.startMax)
    //   let shi = self.atuoGetLocation(self.data.endMax)
    //   qi.then(function (res) {
    //     console.log(res)
    //     self.setData({
    //       start: res.lat,
    //       end: res.lng
    //     });
    //   })
    //   shi.then(function (res) {
    //     console.log(res)
    //     self.setData({
    //       start1: res.lat,
    //       end1: res.lng
    //     });
    //     self.formSubmit();
    //     self.setData({
    //       gongli:gongli
    //     })
    //   })
    // },
    //距离计算接口
    formSubmit(e) {
      var _this = this;
      console.log(_this.data.start + ',' + _this.data.end)
      console.log(_this.data.start1 + ',' + _this.data.end1)
      qqmapsdk.calculateDistance({
        mode: 'driving', //可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
        from: _this.data.start + ',' + _this.data.end || '', //若起点有数据则采用起点坐标，若为空默认当前地址
        to: _this.data.start1 + ',' + _this.data.end1, //终点坐标
        success: function (res) { //成功后的回调
          console.log(res);
          var res = res.result;
          var dis = [];
          for (var i = 0; i < res.elements.length; i++) {
            dis.push(res.elements[i].distance); //将返回数据存入dis数组，
          }
          console.log(dis)
          let distance = dis[0];
          if (distance < 1000) {
            console.log(distance + "米");
            distance = distance + "米"
          } else if (distance > 1000) {
            console.log((Math.round(distance / 100) / 10).toFixed(1) + "公里")
            distance = (Math.round(distance / 100) / 10).toFixed(1) + "公里"
          }
          _this.setData({ //设置并更新distance数据
            distance: distance
          });
        },
        fail: function (error) {
          console.error(error);
        },
        complete: function (res) {
          console.log(res);
        }
      });
    },
    formSubmit1(e) {
      var _this = this;
      //调用距离计算接口
      qqmapsdk.direction({
        mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
        //from参数不填默认当前地址
        from: _this.data.start + ',' + _this.data.end,
        to: _this.data.start1 + ',' + _this.data.end1, 
        success: function (res) {
          console.log(res);
          var ret = res;
          var coors = ret.result.routes[0].polyline, pl = [];
          //坐标解压（返回的点串坐标，通过前向差分进行压缩）
          let distance = ret.result.routes[0].distance;
          if (distance < 1000) {
            console.log(distance + "米");
            distance = distance + "米"
          } else if (distance > 1000) {
            console.log((Math.round(distance / 100) / 10).toFixed(1) + "公里")
            distance = (Math.round(distance / 100) / 10).toFixed(1) + "公里"
          }
          let times=Math.floor(ret.result.routes[0].duration/60) + "小时" + (ret.result.routes[0].duration%60) + "分"
          var kr = 1000000;
          for (var i = 2; i < coors.length; i++) {
            coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
          }
          //将解压后的坐标放入点串数组pl中
          for (var i = 0; i < coors.length; i += 2) {
            pl.push({ latitude: coors[i], longitude: coors[i + 1] })
          }
          console.log(pl)
          //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
          _this.setData({
            latitude:pl[0].latitude,
            longitude:pl[0].longitude,
            distance:distance,
            times:times,
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
            wx.showToast({
              title: res.message,
              icon: 'none', //如果要纯文本，不要icon，将值设为'none'
              mask: true,
              duration: 5000
            })
            console.log(res.result.location); //经纬度对象
            resolve(res.result.location)
          }
        });
      });
      return p;
    },
    // 事件触发，调用接口
    nearby_search: function (e, off) {
      var _this = this;
      // 调用接口
      qqmapsdk.search({
        keyword: e, //搜索关键词
        location: '39.980014,116.313972', //设置周边搜索中心点
        success: function (res) { //搜索成功后的回调
          var mks = []
          for (var i = 0; i < res.data.length; i++) {
            mks.push({ // 获取返回结果，放到mks数组中
              title: res.data[i].title,
              id: res.data[i].id,
              latitude: res.data[i].location.lat,
              longitude: res.data[i].location.lng,
              iconPath: "/resources/my_marker.png", //图标路径
              width: 20,
              height: 20
            })
          }
          console.log(mks)
          if (off == 1) {
            _this.setData({ //设置markers属性，将搜索结果显示在地图中
              markers: mks
            })
          }else if(off == 2){
            _this.setData({ //设置markers属性，将搜索结果显示在地图中
              markers1: mks
            })
          }
        },
        fail: function (res) {
          console.log(res);
        },
        complete: function (res) {
          console.log(res);
        }
      });
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
          vm.setData({start:latitude,end:longitude,latitude:latitude,
          longitude:longitude,})
        },
        fail: function (res) {
          console.log('fail' + JSON.stringify(res))
        }
      })
    },
    onShow: function() {
      this.getLocation()
    },
    

  }
})