// pages/douban/splash.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjects: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp()
    app.request("https://api.douban.com/v2/movie/coming_soon?star=0&count=3&apikey=0df993c66c0c636e29ecbb5344252a4a").then(
      data => {
        this.setData({ subjects: data.subjects })
      }
    )

    wx.setStorage({
      data: true,
      key: 'has_shown_splash',
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