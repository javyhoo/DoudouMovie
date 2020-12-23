// pages/douban/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    page: 1,
    size: 20,
    total: 1,
    movies: []

  },

  retrieve() {
    let app = getApp()
    let start = (this.data.page - 1) * this.data.size

    wx.showLoading({
      title: '加载中',
    })

    console.log("javy type = "+this.data.type+ " ; size = "+start);

    return app.request(`https://frodo.douban.com/api/v2/subject_collection/${this.data.type}/items?start=${start}&count=${this.data.size}&&apiKey=054022eaeae0b00e0fc068c0c0a2102a`)
      .then(res => {
        console.log(res)
        if (res.subject_collection_items.length) {
          let movies = this.data.movies.concat(res.subject_collection_items)
          let total = Math.floor(res.total/this.data.size)
          this.setData({ movies: movies, total: total, page:this.data.page })
          wx.setNavigationBarTitle({
            title: res.title
          })
          // console.log(movies)
        }
      }).catch(err => {
        console.error(err)
      }).finally(() => {
        wx.hideLoading()
      })
  },

  loadMorePage() {
    console.log("page="+this.data.page + " total="+this.data.total)
    if (this.data.page > this.data.total) return
    this.data.page++
    this.retrieve()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    type:options.type;

    this.setData({
      type:options.key
    })
    
    this.retrieve()
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