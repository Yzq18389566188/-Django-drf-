// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:"",
    newlist:[],
    id:''

  },
  navigateTo:function(e){
    let postId=e.currentTarget.dataset.postid;
    // console.log(postId)
    wx.navigateTo({
      url:   "/pages/share/share?postId="+postId
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.kind
 
    // console.log(id)
    // console.log("-----feedback--test--" + options.kind);
    wx.request({
      url: 'http://127.0.0.1:8000/apis/detailsView/',
      dataType: 'json',
      method: 'GET',
      responseType: 'text',
      success: (result) => {
        // console.log(result),
        this.setData({
          type:result.data[id-1].type
        })
      },
      fail: (res) => {},
      complete: (res) => {},
    })

    wx.request({
      url: 'http://127.0.0.1:8000/apis/ListView/',
      data:{id:id},
      dataType: 'json',
      method: 'GET',
      responseType: 'text',
      success: (result) => {
        // console.log(result.data)
        this.setData({
          newlist:result.data
        })
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