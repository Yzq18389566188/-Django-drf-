// pages/publish/publish.js
var COS = require('../../utils/cos-wx-sdk-v5.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: []
  },
//   uploadimage:function(){
//     var onlineimage=[];
//   //   var cos = new COS({
//   //     SecretId: 'AKIDLFuJUVLynLelfJ87lqvrrxbGhxkItX9y',
//   //     SecretKey: 'NTK1kiY9VdV3gEpCZopb7mU0v7CvhgQw',
      
//   // });
//   var cos = new COS({
//     // 必选参数
//     getAuthorization: function (options, callback) {
//         // 服务端 JS 和 PHP 示例：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
//         // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
//         // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048
//         wx.request({
//             url: 'http://127.0.0.1:8000/release/credential/',
//             data: {
//                 // 可从 options 取需要的参数
//             },
//             success: function (result) {
//                 var data = result.data;
//                 var credentials = data && data.credentials;
//                 if (!data || !credentials) return console.error('credentials invalid');
//                 callback({
//                     TmpSecretId: credentials.tmpSecretId,
//                     TmpSecretKey: credentials.tmpSecretKey,
//                     XCosSecurityToken: credentials.sessionToken,
//                     // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
//                     StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
//                     ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
//                 });
//             }
//         });
//     }
// });
//   for(var index in this.data.imageList){
//     var filePath=this.data.imageList[index];
//     cos.postObject({
//       Bucket: 'diet-1302638185',
//       Region: 'ap-guangzhou',
//       Key: index+'x4.png',
//       FilePath: filePath,
//       onProgress: function (info) {
//           console.log(JSON.stringify(info));
//       }
//   }, function (err, data) {
//       console.log(err || data);
//       onlineimage.push(data.Location)
  
//   });
//   }
  
   
   

//   },

  uploadImage:function(){
    var that = this;

    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        var oldLength = parseInt(this.data.imageList.length);
        let totalCount=res.tempFilePaths.length+this.data.imageList.length;
        if(totalCount>9){
          wx.showToast({
            title: '图片最多9张',
            icon:'none'
          });
          return
        };
        that.setData({
          imageList: that.data.imageList.concat(res.tempFilePaths)
        });
      }
    });
    var cos = new COS({
      // 必选参数
      getAuthorization: function (options, callback) {
          // 服务端 JS 和 PHP 示例：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
          // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
          // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048
          wx.request({
              url: 'http://127.0.0.1:8000/release/credential/',
              data: {
                  // 可从 options 取需要的参数
              },
              success: function (result) {
                  var data = result.data;
                  var credentials = data && data.credentials;
                  if (!data || !credentials) return console.error('credentials invalid');
                  callback({
                      TmpSecretId: credentials.tmpSecretId,
                      TmpSecretKey: credentials.tmpSecretKey,
                      XCosSecurityToken: credentials.sessionToken,
                      // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                      StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
                      ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
                  });
              }
          });
      }
  });
    for(let index in res.tempFilePaths){
      let imagFilrpath=res.tempFilePaths[index].path;

      var filepath=imagFilrpath.split('.');
      var ext=filepath[filepath.length-1];

      let randowString=Math.random().toString(36).slice(-8)+String(new Date.getTime());
      var filekey=randowString+"."+ext
      this.setData({
      ["imageList["+oldLength+parseInt(index)+"].key"]:filekey
      })
      cos.postObject({
        Bucket: 'diet-1302638185',
        Region: 'ap-guangzhou',
        Key: filekey,
        FilePath: imagFilrpath,
        onProgress: function (info) {
            // console.log(JSON.stringify(info));
            this.setData({
              ["imageList["+oldLength+parseInt(index)+"].percent"]:info.percent*100
            })
        }
    }, function (err, data) {
        console.log(err || data);
        onlineimage.push(data.Location)
    
    });
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
/**
 * 
 */