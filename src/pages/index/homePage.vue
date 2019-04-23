<template>
  <div class="homePage">
    <swiper autoplay="true" circular="true" interval="2000" class="content_image">
      <swiper-item v-for="(item, index) in imgArr" :key="index">
        <img :src="item" class="content_image">
      </swiper-item>
    </swiper>
    <div class="content">
      <div class="singNow" @tap="toStoreList">
        <div class="singNow_text">
          <span>现在欢唱</span>
          <span>Singing Now</span>
        </div>
        <img src="/static/static/homePage/singNow.png" alt>
      </div>
      <div class="storeValue">
        <div class="singNow_text">
          <span>优惠储值</span>
          <span>Stored Value</span>
          <img src="/static/static/homePage/redTip.png" alt>
        </div>
        <img src="/static/static/homePage/storedValue.png" alt>
      </div>
    </div>
    <div class="adImg_bottom">
      <img src="/static/static/homePage/ad.png" alt>
    </div>
  </div>
</template>

<script>
import { userLocationShow, loginShow } from "../../utils/user_verify.js";
export default {
  // mpType: 'page',
  config: {
    navigationBarTitleText: "首页"
  },
  data() {
    return {
      imgArr: [
        "https://api.wuwei-tech.com/uploads/201812/88a8b3256a49b34105140b1b9d4f49be.jpg",

        "https://api.wuwei-tech.com/uploads/201812/6653338882f70db801481bd523bce6bc.jpg",

        "https://api.wuwei-tech.com/uploads/201812/06e4927cf6d84fc8385989959af715b3.jpg"
      ]
    };
  },
  mounted() {
    let _this = this;
    //调取用户信息 授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success: function(res) {
              // console.log(res)
              wx.setStorageSync("myInfo", res.rawData);
              // that.getheadImg()
            }
          });
        } else {
          wx.login({
            success: res => {
              console.log(res);
              _this.$fly
                .get(_this.$api.GET_TOKEN, {
                  code: res.code
                })
                .then(res => {
                  wx.setStorageSync("token", res.data.data.token);
                  wx.navigateTo({
                    url: `/pages/userLogin/wx_userInfo`
                  });
                });
            }
          });
        }
      }
    });

    // 获取用户地理位置信息
    wx.getSetting({
      success: function(res) {
        if (res.authSetting["scope.userLocation"]) {
          wx.getLocation({
            success: function(res) {
              wx.setStorageSync("latitude", res.latitude);
              wx.setStorageSync("longitude", res.longitude);
            }
          });
        } else {
          wx.authorize({
            scope: "scope.userLocation",
            success() {
              wx.getLocation({
                success: function(res) {
                  wx.setStorageSync("latitude", res.latitude);
                  wx.setStorageSync("longitude", res.longitude);
                }
              });
            }
          });
        }
      }
    });

    // 测试 获取首页数据请求
    this.$fly.get(this.$api.INDEX_IMG).then(res => {
      console.log(res);
    });
  },
  methods: {
    toStoreList(){
      wx.navigateTo({ url: '/pages/index/storeList' });
    }
  }
};
</script>

<style scoped>
.homePage {
  display: flex;
  flex-direction: column;
}
.content_image {
  width: 100%;
  height: 496rpx;
}
.content {
  width: 665rpx;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 63rpx;
}
.singNow {
  width: 100%;
  height: 78rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 77rpx;
}
.storeValue {
  width: 100%;
  height: 78rpx;
  margin-bottom: 145rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.singNow img,
.storeValue img {
  width: 84rpx;
  height: 84rpx;
}
.singNow_text {
  display: flex;
  flex-direction: column;
  width: 172rpx;
  height: 78rpx;
  position: relative;
}
.singNow_text img {
  width: 112rpx;
  height: 31rpx;
  position: absolute;
  top: 10rpx;
  left: 150rpx;
}
.singNow_text span:nth-of-type(1) {
  font-size: 36rpx;
  font-weight: bold;
  color: #1f1a17;
}

.singNow_text span:nth-of-type(2) {
  font-size: 27rpx;
  color: #b8b8b8;
}
.adImg_bottom {
  width: 665rpx;
  margin: 0 auto;
}
.adImg_bottom img {
  width: 100%;
  height: 136rpx;
}
</style>
