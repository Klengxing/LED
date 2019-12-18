//app.js
App({
  onLaunch: function () {
    const that = this
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        that.globalData.height = res.statusBarHeight
        that.globalData.windowWidth = res.windowWidth
        that.globalData.windowHeight = res.screenHeight
      }
    })
  },
  globalData: {
    windowWidth: '',
    windowHeight: ''
  }
})