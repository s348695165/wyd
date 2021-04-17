// tabBarComponent/tabBar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
        "backgroundColor": "#ffffff",
        "color": "#979795",
        "selectedColor": "#1c1c1b",
        "list": [
          {
            "pagePath": "/pages/index/index",
            "iconPath": "icon/source.png",
            "selectedIconPath": "icon/source1.png",
            "text": "货源"
          },
          {
            "pagePath": "/pages/nearby/nearby",
            "iconPath": "icon/nearby.png",
            "selectedIconPath": "icon/nearby1.png",
            "text": "附近"
          },
          {
            "pagePath": "/pages/middle/middle",
            "iconPath": "icon/fahuo.png",
            "isSpecial": true,
            "text": "立即发货"
          },
          {
            "pagePath": "/pages/waybill/waybill",
            "iconPath": "icon/waybill.png",
            "selectedIconPath": "icon/waybill1.png",
            "text": "运单"
          },
          {
            "pagePath": "/pages/me/me",
            "iconPath": "icon/me.png",
            "selectedIconPath": "icon/me1.png",
            "text": "我的"
          }
        ]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // isIphoneX: app.globalData.systemInfo.model.search('iPhone X') != -1 ? true : false
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
