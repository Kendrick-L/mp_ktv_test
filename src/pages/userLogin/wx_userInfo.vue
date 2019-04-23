<template>
  <div class="userInfo">
    <div class="top">
      <img src="/static/static/userInfo/myLoginTop.png" alt>
      <p>允许音乐派小程序获取您的基本信息</p>
    </div>
    <Button class="btn" open-type="getUserInfo" @getuserinfo="getUserInfo">授权微信用户信息</Button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    getUserInfo(e) {
      if (e.mp.detail.userInfo) {
        wx.setStorageSync("myInfo", e.mp.detail.rawData);
        wx.navigateBack({
          delta: 1
        });
      }
    }
  }
};
</script>
<style scoped>
.top {
  width: 100%;
  height: 600rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.top img {
  width: 320rpx;
  height: 80rpx;
}
.top p {
  margin-top: 100rpx;
  font-size: 24rpx;
}
.btn {
  width: 700rpx;
  height: 80rpx;
  color: #fff;
  font-size: 34rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20rpx;
  background-image: linear-gradient(to right, #b59c88, #806f67);
}
</style>


