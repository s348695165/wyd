// pages/moreInformation/moreInformation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    currentTab: 0,
    selectList1:[{'value':'平板','off':false,'id':1},{'value':'高栏','off':false,'id':2},{'value':'厢式','off':false,'id':3},{'value':'冷藏','off':false,'id':4}],
    content:''
  },

// 选项卡  主要是通过判断e.target.id的值 设置对应的id显示
switchNav: function (e) {
  var page = this;
  var id = e.target.id;
  if (this.data.currentTab == id) {
    return false;
  } else {
    page.setData({
      currentTab: id
    });
  }
  page.setData({
    active: id
  });
},
selects1:function(params) {
  console.log(params.currentTarget.dataset.index)
  let that=this;
  let index = params.currentTarget.dataset.index;
  let content=params.currentTarget.dataset.value;
  let selectList1=that.data.selectList1;

  for(let i=0;i<selectList1.length;i++){
      if(i==index){
        selectList1[index].off=!selectList1[index].off;
      }else{
        selectList1[i].off=false;
      }
  }
  
  console.log(selectList1)
  that.setData({selectList1:selectList1,content:content})
},
goTop:function(params) {
  let that=this;
  let can=that.data.content;
  let id=params.currentTarget.dataset.id;
  if (can!=''&&can!=null&&can!=undefined){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 3];
    prevPage.setData({
      can: can,
      sessionId:id
    })
    wx.navigateBack({
      delta: 2,
    })
  }else{
    wx.showToast({
      title: "请选择货物信息",
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