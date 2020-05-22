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
          <el-menu-item index="/main">数据查看</el-menu-item>
          <el-menu-item index="/Person">个人</el-menu-item>
          <el-menu-item>关于我们</el-menu-item>
          <el-menu-item>数据导入</el-menu-item>
          <el-menu-item>数据导出</el-menu-item>
          <el-menu-item>新手指南</el-menu-item>
          <el-menu-item>设置</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <router-view></router-view>
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
  mounted: function () {
    this.getUserInfo()
    this.getUserAvatar()
  },
  components: {
  },
  methods: {
    getUserInfo: function () {
      this.axios({
        method: 'POST',
        url: '/api/getInfo',
        data: {
          student_id: this.global.account,
          student_password: this.global.key
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
      this.axios({
        method: 'GET',
        url: `/api/getImg/${this.global.account}.jpg`
      }).then((res) => {
        this.imgUrl = `http://whale.vipgz1.idcfengye.com/getImg/${this.global.account}.jpg`
      })
    }
  }
}
</script>
<style scoped>
.main-container{
  height:100%
}
.el-row{
  height:100%
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
</style>
