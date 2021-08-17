// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    avatar:'',
    openid:'',
    nickName:'',


  },
  login:function(){
    var that=this
    wx.getUserInfo({
      success: function(res) {
        // console.log(res.userInfo)
        that.setData({
          nickName:res.userInfo.nickName,
          avatar:res.userInfo.avatarUrl

        })
        // console.log(nickName)
      }
    })
    wx.login({
      //获取code
      success: function (res) {
        var code = res.code; //返回code
        var nickname=that.data.nickName
        // console.log(1111)
        // console.log(nickname)
        // console.log(code);
        var appId = 'wxfa9888e3dd76373b';
        var secret = 'deb899500f2c5e55cb3289582a8c39e0';
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'json'
          },
          success: function (res) {
            var thats=that
            var nk=thats.data.nickName
            var ck=thats.data.avatar
            // console.log(222)
            // console.log(nk)
            var openid = res.data.openid //返回openid
            wx.request({
              url: 'http://127.0.0.1:8000/drom/user/',
              data: {
               nickname:nk ,
              avatar:ck,
                token:openid
              },
              dataType: 'json',
              method: 'POST',
              responseType: 'text',
              timeout: 0,
              success: (result) => {
                // console.log(result)
              },
              fail: (res) => {},
              complete: (res) => {},
            })

            // console.log('openid为' + openid);
          }
        })
      }
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