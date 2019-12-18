const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '输入文字弹幕',
    colorList: ["#FFFFFF", "#FF29AD", "#FF1212", "#FFE514", "#00FF28", "#53B1FF", "#00E8E0", "#A052FF"],
    textList: ["你好", "想认识你", "我买单", "求带走", "走,出去聊聊", "加个好友呗", "雨女无瓜", "老司机，带带我", "美女好", "哥姐带带老实人", "在？一起聊个天", "苏喂苏喂苏喂~"],
    speedList: [0.5,0.75,1,1.5,2],
    cIndex: 0,
    tIndex: 0,
    sIndex: 2,
    isShow: false,
    width: 200,
    height: 250,
    color: "#FFFFFF",
    isWrite: true,
    fontSize: Math.round(app.globalData.windowWidth * 0.65),
    interval: 10000,
    scorll: {},
    animation: {},
    timer: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setKeepScreenOn({
      keepScreenOn: true
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var animation = wx.createAnimation({
      timingFunction: 'linear'
    });
    this.data.animation = animation;
    this.scorll()
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
  * 动画控制
  */
  scorll() {
    var scorllH = app.globalData.windowHeight + this.data.fontSize * this.data.text.length
    this.data.interval = parseInt(scorllH * 4 / this.data.speedList[this.data.sIndex])
    var scorllAmt = () => {
      this.data.animation.translate3d(-scorllH, 0, 0).step({
        duration: this.data.interval
      })
      this.data.animation.translate3d(0, 0, 0).step({
        duration: 0
      })
      this.setData({
        scorll: this.data.animation.export()
      })
    };
    scorllAmt();
    // 循环动画
    this.data.timer = setInterval(() => {
      scorllAmt();
    }, this.data.interval + 500);
  },
  /**清除动画 */
  clearScorll() {
    const that = this
    clearInterval(that.data.timer)
    that.data.animation.translate3d(0, 0, 0).step({
      duration: 0
    })
    that.setData({
      scorll: that.data.animation.export()
    })
  },
  // 点击隐藏多余东西
  click() {
    this.setData({
      isWrite: !this.data.isWrite,
      isShow: false
    })
  },
  send(e) {
    this.clearScorll()
    this.data.text = e.detail.value
    this.setData({
      text: this.data.text
    })
    setTimeout(() => {
      this.scorll()
    }, 100)
  },
  open() {
    this.setData({
      isShow: !this.data.isShow,
      isWrite: false
    })
  },
  confirm() {
    this.setData({
      isShow: !this.data.isShow,
      isWrite: true
    })
  },
  // 选择颜色
  selectC(e) {
    this.data.color = this.data.colorList[e.currentTarget.dataset.index]
    this.setData({
      cIndex: e.currentTarget.dataset.index
    })
  },
  //选择速度
  selectS(e){
    this.clearScorll()
    this.setData({
      sIndex: e.currentTarget.dataset.index
    })
    setTimeout(() => {
      this.scorll()
    }, 100)
  },
  // 选择模板文字
  selectT(e) {
    this.clearScorll()
    this.data.text = this.data.textList[e.currentTarget.dataset.index]
    this.setData({
      tIndex: e.currentTarget.dataset.index,
      text: this.data.text
    })
    setTimeout(() => {
      this.scorll()
    }, 100)
  },
})