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
    app.request("https://frodo.douban.com/api/v2/subject_collection/movie_showing/items?start=0&count=5&apiKey=054022eaeae0b00e0fc068c0c0a2102a").then(
      data => {
        this.setData({ subjects: data.subject_collection_items })
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