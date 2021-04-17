// pages/vehicleSelection/vehicleSelection.js
// var tcity = require("../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectList:[{'value':1.8,'off':false,'id':1},{'value':1.8,'off':false,'id':2},{'value':1.8,'off':false,'id':3},{'value':1.8,'off':false,'id':4}],
    selectList1:[{'value':'平板','off':false,'id':1},{'value':'高栏','off':false,'id':2},{'value':'厢式','off':false,'id':3},{'value':'冷藏','off':false,'id':4}]
  },
  selects:function(params) {
    console.log(params.currentTarget.dataset.index)
    let that=this;
    let index = params.currentTarget.dataset.index;
    let selectList=that.data.selectList;
    
    // let num=0;
    for(let i=0;i<selectList.length;i++){
        // if(selectList[i].off==true){
        //   num+=1;
        // }
        if(i==index){
          selectList[index].off=!selectList[index].off;
        }else{
          selectList[i].off=false;
        }
    }
    // console.log(num)
    // if(num>1){
    //   selectList[index].off=!selectList[index].off;
    //   return;
    // }else{
    
    console.log(selectList)
    that.setData({selectList:selectList})
    // }
  },
  selects1:function(params) {
    console.log(params.currentTarget.dataset.index)
    let that=this;
    let index = params.currentTarget.dataset.index;
    let selectList1=that.data.selectList1;
    // selectList1[index].off=!selectList1[index].off;
    let num=0;
    for(let i=0;i<selectList1.length;i++){
        // if(selectList1[i].off==true){
        //   num+=1;
        // }
        if(i==index){
          selectList1[index].off=!selectList1[index].off;
        }else{
          selectList1[i].off=false;
        }
    }
    // console.log(num)
    // if(num>1){
    //   selectList1[index].off=!selectList1[index].off;
    //   return;
    // }else{
    
    console.log(selectList1)
    that.setData({selectList1:selectList1})
    // }
  },
  getList:function(){
    let that=this;
    wx.request({
      url: app.globalData.url + '/api/system/get_car_lengths',
      method: "POST", //指定请求方式，默认get
      data: '',
      header: {
        //默认值'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded' //post
      },
      success: function (res) {
        console.log(res)
        // console.log(res.data)
       let list=res.data;
       for(let i=0;i<list.length;i++){
         list[i].off=false;
       }
       that.setData({selectList:list})
      }
    });
  },
  getList1:function(){
    let that=this;
    wx.request({
      url: app.globalData.url + '/api/system/get_car_types',
      method: "POST", //指定请求方式，默认get
      data: '',
      header: {
        //默认值'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded' //post
      },
      success: function (res) {
        console.log(res)
        // console.log(res.data)
       let list=res.data;
       for(let i=0;i<list.length;i++){
         list[i].off=false;
       }
       that.setData({selectList1:list})
      }
    });
  },
  goTop:function(params) {
    let that=this;
    let selectList=that.data.selectList;
    let num=0;
    let selectCarLength=[];
    let selectCarLengthId=[];
    for(let i=0;i<selectList.length;i++){
        if(selectList[i].off==true){
          num+=1;
          selectCarLength.push(selectList[i].length)
          selectCarLengthId.push(selectList[i].id)
        }
    }
    let selectList1=that.data.selectList1;
    let num1=0;
    let selectCarLength1=[];
    let selectCarLength1Id=[];
    for(let i=0;i<selectList1.length;i++){
        if(selectList1[i].off==true){
          num1+=1;
          selectCarLength1.push(selectList1[i].name)
          selectCarLength1Id.push(selectList1[i].id)
        }
    }
    console.log( selectCarLengthId)
    console.log( selectCarLength1Id)
    // return;
    if (num!=0&&num1!=0){
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      prevPage.setData({
        selectCarLength: selectCarLength,
        selectCarLength1: selectCarLength1,
        selectCarLengthId: selectCarLengthId,
        selectCarLength1Id: selectCarLength1Id
      })
      wx.navigateBack({
        delta: 1,
      })
    }else{
      wx.showToast({
        title: "请选择车型和车长",
        icon: 'none', //如果要纯文本，不要icon，将值设为'none'
        mask: true,
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getList();
      this.getList1();
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