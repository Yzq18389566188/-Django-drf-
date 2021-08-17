// pages/release/release.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList:[],
    maxId:0,
    minId:0,

  },
  Publish(){
    wx.navigateTo({
      url: "/pages/push/push",
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://127.0.0.1:8000/release/release/',
      dataType: 'json',
      method: 'GET',
      responseType: 'text',
      timeout: 0,
      success: (result) => {
        this.setData({
          newsList:result.data,
          maxId:result.data[0].id,
          minId:result.data[result.data.length-1].id
        })
        // console.log(result);
      },
      fail: (res) => {},
      complete: (res) => {},
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
    wx.request({
      url: 'http://127.0.0.1:8000/release/release/',
      data: {
        max_id:this.data.maxId
      },
      dataType: 'json',
      method: 'GET',
      responseType: 'text',
      timeout: 0,
      success: (result) => {
        console.log(result);
        if(!result.data.length){
          wx.showToast({
            title: '没有新数据',
            icon:'none'
          })
          wx.stopPullDownRefresh()
          return
        }
        var datalist=result.data.reverse();
        this.setData({
          newsList:datalist.concat(this.data.newsList),
          maxId:datalist[0].id
        })
        wx.stopPullDownRefresh()

      },
      fail: (res) => {},
      complete: (res) => {},
    })
    

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.request({
      url: 'http://127.0.0.1:8000/release/release/',
      data: {
        min_id:this.data.minId
      },
      dataType: 'json',
      method: 'GET',
      responseType: 'text',
      timeout: 0,
      success: (result) => {
        console.log(result);
        if(!result.data.length){
          wx.showToast({
            title: '没有数据',
            icon:'none'
          })
          return
        }
        this.setData({
          newsList:this.data.newsList.concat(result.data),
          minId:result.data[result.data.length-1].id
        })
        console.log(minId)
      },
      fail: (res) => {},
      complete: (res) => {},
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})