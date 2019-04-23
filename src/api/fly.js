import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()
const host = "https://test.wuwei-tech.com/index.php/"
//添加请求拦截器
fly.interceptors.request.use((request) => {
    //给所有请求添加自定义header
    if (wx.getStorageSync('token')) {
        request.timeout = 10000,
            request.headers = {
                "content-type": "application/json",
                "token": wx.getStorageSync('token')
            }
        wx.showLoading({
            title: "加载中",
            mask: true,
        });
        return request;
    } else {
        fly.lock();//锁住请求
        wx.login({
            success: function (res) {
                wx.request({
                    url: host + 'mp2/token/getToken',
                    data: {
                        code: res.code
                    },
                    success(res) {
                        wx.setStorageSync('token', res.data.data.token)
                    }
                })
            }
        })
        fly.unlock();
        return request;//继续之前的请求，
    }
})

fly.interceptors.response.use(
    (response) => {
        wx.hideLoading();
        if (response.data.code === -1) {
            wx.removeStorageSync('token');
            return 
        } else {
            return response
        }
    },
    (err) => {
        wx.hideLoading();
        if (err.status == -1) {
            // console.log('err')
            return "网络连接异常"
        } else if (err.status == 1) {
            return "网络连接超时"
        } else if (err.status == 401) {
            return "用户未登录"
        } else {
            if (err.response.data.message) {
                return err.response.data.message
            } else {
                return '请求数据失败,请稍后再试'
            }
        };
        // Do something with response error
    }
)


fly.config.baseURL = host;

export default fly;