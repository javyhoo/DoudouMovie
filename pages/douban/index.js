// pages/douban/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    boards: [{ key: 'movie_showing' }, { key: 'movie_hot_gaia' }, { key: 'tv_hot' }, { key: 'tv_variety_show' }, { key: 'book_bestseller' }, { key: 'music_single' }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'has_shown_splash',
      success: res => {
        this.retrieveData()
      },
      fail: err => {
        wx.redirectTo({
          url: '/pages/douban/splash',
        })
      }
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
    wx.showLoading({
      title: '加载中',
    })
    
    this.retrieveData().then(() => wx.stopPullDownRefresh({
      success: (res) => {
        wx.hideLoading()
      },
    }))
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

  },

  retrieveData() {
    let app = getApp()

    var promises = this.data.boards.map(function (board) {
      return app.request(`https://frodo.douban.com/api/v2/subject_collection/${board.key}/items?start=0&count=10&apiKey=054022eaeae0b00e0fc068c0c0a2102a`)
        .then(function (d) {
          if (!d) {
            return board
          }

          console.log(d)

          board.title = d.subject_collection.name
          board.movies = d.subject_collection_items
          console.log(board)
          return board
        }).catch(err => console.log(err))
    })

    return app.promise.all(promises).then(boards => {
      if (!boards || !boards.length) {
        return
      }

      this.setData({ boards: boards, loading: false })
    })

  }



})