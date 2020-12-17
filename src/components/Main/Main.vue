<template>
  <div class="main-container">
    <el-row>
      <!-- 左侧导航栏 -->
      <el-col class="left-navi" :span="4">
        <div class="user-avatar">
          <img :src="imgUrl"/>
          <h4>{{username}}</h4>
        </div>
        <el-menu
          :default-active="$route.path"
          background-color="#545c64"
          text-color="#fff"
          router
        >
          <el-menu-item index="/main">个人记录总览</el-menu-item>
          <el-menu-item index="/Group">团队  ·  一起鲸记</el-menu-item>
          <el-menu-item index="/Person">个人信息</el-menu-item>
          <el-menu-item index="/AboutUs">关于我们</el-menu-item>
          <el-menu-item index="/Output">数据导出</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" class="main-content">
        <router-view @updateImg="getUserAvatar()"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      imgUrl: '',
      activeIndex: '/DataCheck'
    }
  },
  created: function () {
    // eslint-disable-next-line eqeqeq
    if (localStorage.getItem('token') && localStorage.getItem('account')) {
      this.global.token = localStorage.getItem('token')
      this.global.account = localStorage.getItem('account')
    } else {
      this.$router.push('/')
    }
    this.getUserInfo()
    this.getUserAvatar()
  },
  components: {
  },
  methods: {
    getUserInfo: function () {
      this.axios({
        method: 'POST',
        url: `${process.env.API_HOST}/getInfo`,
        data: {
          token: this.global.token
        },
        transformRequest: [
          function (data) {
            let ret = ''
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                '=' +
                encodeURIComponent(data[it]) +
                '&'
            }
            return ret
          }
        ],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        this.username = res.data.student_name
      })
    },
    getUserAvatar: function () {
      let timestamp = new Date().getTime()
      this.axios({
        method: 'GET',
        url: `${process.env.API_HOST}/getImg/${this.global.account}.jpg?v=${timestamp}`
      }).then((res) => {
        this.imgUrl = `http://whale.vipgz4.idcfengye.com/getImg/${this.global.account}.jpg?v=${timestamp}`
      })
    }
  }
}
</script>
<style scoped>
.main-container{
  height:100%
}
.main-container >>> .el-menu{
  border-right:none
}
.el-row{
  height:100%;
}
.left-navi{
  height: 100%;
  border-right: 1px solid #808080;
  background-color:#545c64
}
.user-avatar{
  text-align: center;
  color: #fff;
}
.user-avatar img{
  width:150px;
  height: 150px;
  border-radius:50%;
  margin-top:50px
}
.main-content{
  height: 100%;
}
</style>
