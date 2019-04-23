// 获取用户的验证信息
//授权验证
export const loginShow = function () {
    wx.getSetting({
        success: function (res) {
            if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                    success: function (res) {
                        // console.log(res)
                        wx.setStorageSync('myInfo', res.rawData)
                        // that.getheadImg()
                    }
                })
            } else {
                wx.login({
                    success: function (res) {
                        // console.log(wx.getStorageSync('code'))
                        http.http({
                            url: 'mp2/token/getToken',
                            data: {
                                code: res.code
                            },
                            success(res) {
                                console.log(res)
                                wx.setStorageSync('token', res.data.data.token)
                                wx.navigateTo({
                                    url: `/pages/userLogin/wx_userInfo`,
                                })

                            }
                        })
                    }
                })

            }
        }
    })
}
//判断用户地理位置授权状态
export const userLocationShow = function () {
    let that = this
    wx.getSetting({
        success: function (res) {
            if (res.authSetting['scope.userLocation']) {
                wx.getLocation({
                    success: function (res) {
                        wx.setStorageSync('latitude', res.latitude)
                        wx.setStorageSync('longitude', res.longitude)
                    }
                })
            } else {
                wx.authorize({
                    scope: 'scope.userLocation',
                    success() {
                        wx.getLocation({
                            success: function (res) {
                                wx.setStorageSync('latitude', res.latitude)
                                wx.setStorageSync('longitude', res.longitude)
                            }
                        })
                    }
                })
            }
        }
    })
}

export const name = function () {
    return 'alit'
}