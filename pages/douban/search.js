// pages/douban/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchinputFocus: true,
    searchWords: "",
    wordsList: [],
    size: 20,
    page: 1,
    movies: [],
    requestinternal: -1,
  },

  onTapSearchBtn() {
    console.log("words ", this.data.searchWords)
    if (this.data.searchWords != "") {
      this.retrieve()
    }
    this.setData({
      searchinputFocus: false,
      searchWords: "",
      wordsList: []
    })
  },

  retrieve() {
    let app = getApp()
    let start = (this.data.page - 1) * this.data.size
    wx.showLoading({
      title: '加载中',
    })

    //豆瓣搜索接口失败，搜索功能无法实现
    return app.request(`https://frodo.douban.com/api/v2/search/weixin?q=${this.data.searchWords}&start=${start}&count=${this.data.size}&apikey=054022eaeae0b00e0fc068c0c0a2102a`)
      .then(res => {
        console.log(res)
        if (res.items.length) {
          let movies = this.data.movies.concat(res.items)
          let total = Math.floor(res.total / this.data.size)
          this.setData({ movies: movies, total: total, page: this.data.page })
          wx.setNavigationBarTitle({
            title: res.title
          })
          console.log(movies)
        }
      }).catch(err => {
        console.error(err)
      }).finally(() => {
        wx.hideLoading()
      })
  },

  showSearchInput() {
    this.setData({
      searchinputFocus: true
    })
  },

  //清空输入框内容
  clearSearchInput() {
    this.setData({
      searchWords: ""
    })
  },

  //当在搜索框输入内容
  onSearchInputType(e) {
    let app = getApp()
    let words = e.detail.value
    this.setData({
      searchWords: words
    });

    clearTimeout(this.data.requestinternal)

    console.log(words)

    this.data.requestinternal = setTimeout(() => {
      app.request(`https://frodo.douban.com/api/v2/search/weixin?q=${words}&start=0&count=20&apiKey=054022eaeae0b00e0fc068c0c0a2102a`).then(d => {
        console.log(d)

        if (d.subjects.length) {
          this.setData({
            wordsList: d.subjects
          })
        }
      })
    }, 2000)
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