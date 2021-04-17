// pages/enterpriseInformation/enterpriseInformation.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personalCon:'',
    isShowImgCropper: false, // 是否显示组件
    src: '', // 剪裁图片的url
    width: 250, //宽度
    height: 250, //高度
    newsImg:'',
    urls: app.globalData.url,
    images: '',
  },
   //预览图片，放大预览
   preview(event) {
    console.log(event.currentTarget.dataset.src)
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: this.data.images // 需要预览的图片http链接列表
    })
  },
  onUpload() {
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        //开始裁剪
        that.setData({
          src: tempFilePaths,
          isShowImgCropper: true
        });
        wx.showLoading({
          title: '加载中'
        })
      },
      fail: err => {
        console.log('上传失败：', err)
      }
    })
  },
  cropperload(e) {
    //获取到image-cropper对象
    this.cropper = this.selectComponent("#image-cropper");
    console.log("cropper初始化完成");
  },
  loadimage(e) {
    console.log("图片加载完成", e.detail);
    wx.hideLoading();
    //重置图片角度、缩放、位置
    this.cropper.imgReset();
  },
  submit() {
    this.cropper.getImg((obj) => {
      // 这里就是想要截取的图片传给后台的虚拟路径
      console.log(obj.url)
      this.setData({
        isShowImgCropper: false,
        avatarUrl: obj.url
      })
      this.gourl(obj.url)
    });
  },
  clickcut(e) {
    console.log(e.detail);
    //点击裁剪框阅览图片
    wx.previewImage({
      current: e.detail.url, // 当前显示图片的http链接
      urls: [e.detail.url] // 需要预览的图片http链接列表
    })
    this.cropper.getImg((obj) => {
      // 这里就是想要截取的图片传给后台的虚拟路径
      console.log(obj.url)
    })
  },gourl:function(url){
    let that=this;
    wx.uploadFile({
      url: app.globalData.url + '/api/uploads/uploads',
      filePath: url,
      name: 'file',
      formData: {
        'user': 'test'
      },
      success: function (res) {
        var data = JSON.parse(res.data)
        console.log(data.url)
  
        let newsImg=data.url
        that.setData({
          newsImg:newsImg
        })
        that.modifyHead(newsImg);
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
          filePath: url,
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
  },
  modifyHead:function(url){
    var self = this;
  
    wx.request({
      url: app.globalData.url + '/api/opreat/edit_avator',
      data: {
        "uid": app.globalData.uid,
        "avator":app.globalData.url+url
      },
      success(res) {
        console.log(res.data);
        if(res.data=='1'){
          self.personalInformation();
        }else{
          wx.showToast({
            title: "上传失败",
            icon: 'none', //如果要纯文本，不要icon，将值设为'none'
            mask: true,
            duration: 2000
          })
        }
      },
    })
  },
  personalInformation(value) {
    var self = this;
    wx.request({
      url: app.globalData.url + '/api/ownopt/mine',
      data: {
        "uid": app.globalData.uid
      },
      success(res) {
        console.log(res.data);
        let personal = res.data;
       
        self.setData({
          personalCon: personal,
          nones: 'block',
          images:[self.data.urls+personal.person_or_company.id_back,self.data.urls+personal.person_or_company.id_front]
        });

      },
    })
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