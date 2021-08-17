// pages/newsDetail/newsDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news:null,
    isShowCommentModal:false,
    reply:{}

  },
  getMore:function(e){
    var root_id=e.currentTarget.dataset.root;
    var idx=e.currentTarget.dataset.idx;
    wx.request({
      url: 'http://127.0.0.1:8000/release/commnet/',
      data:{
        root:root_id
      },
      method: 'GET',
      responseType: 'text',
      dataType:'json',
      timeout: 0,
      success: (result) => {
        this.setData({
          ['news.comment['+idx+'].child']:result.data

        })
  
        
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  
  },
  onClickClearReply:function(){
    this.setData({
     reply:{
       depth:1,
       nid:this.data.reply.nid
     }
    })
  },  
  onClickShowCommentModal:function(e){
    console.log(e.currentTarget.dataset)
    this.setData({
      isShowCommentModal:true,
      reply:e.currentTarget.dataset
    })
  },
  inputComment:function(e){
    this.setData({
      ['reply.content']: e.detail.value
    })
  },
  onClickCancelCommentModal:function(){
    this.setData({
      isShowCommentModal:false,
      reply:{}
    })

  },
  onClickPostComment:function(){
    if(!this.data.reply.content){
      wx.showToast({
        title: '评论不能为空',
        icon:'none'
      })
    }
    wx.request({
      url: 'http://127.0.0.1:8000/release/release/',
      data: {
        news:this.data.reply.nid,
        depth:this.data.reply.depth,
        reply:this.data.reply.cid,
        content:this.data.reply.content,
        root:this.data.reply.rid
      },
      dataType: 'json',
      enableCache: true,
      enableHttp2: true,
      enableQuic: true,
      method:'POST',
      responseType: 'text',
      timeout: 0,
      success: (result) => {
        if(result.statusCode == 201){
          if (this.data.reply.rootindex == undefined){
            var dataList = this.data.news.comment;
            dataList.unshift(result.data);
            this.setData({
              ["news.comment"]: dataList,
              ["news.comment_count"]:this.data.news.comment_count + 1
            });
            this.onClickCancelCommentModal();
          }else{
            var childCommentList = this.data.news.comment[this.data.reply.rootindex].child;
            childCommentList.unshift(result.data);
            this.setData({
              ["news.comment[" + this.data.reply.rootindex + "].child"]: childCommentList,
              ["news.comment_count"]: this.data.news.comment_count + 1
            });
            this.onClickCancelCommentModal();
          }
          

        }
      }
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var newsId=options.newsId;
    wx.request({
      url: 'http://127.0.0.1:8000/release/news/'+newsId+"/",
      method: 'GET',
      responseType: 'text',
      timeout: 0,
      success: (result) => {
        console.log(result.data);
        this.setData({
          news:result.data
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