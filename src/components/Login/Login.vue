<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-logo-container">
        <img class="login-logo" src="../../assets/LOGO.png" />
      </div>
      <p class="login-title">Whale Printer</p>
      <el-row class="username-input" type="flex" align="middle">
        <el-col :span="6">用户名：</el-col>
        <el-col :span="15">
          <el-input :span="10" v-model="username"></el-input>
        </el-col>
      </el-row>
      <el-row class="password-input">
        <el-col :span="6">密码：</el-col>
        <el-col :span="15">
          <el-input type="password" @keyup.enter.native="login()" v-model="password"></el-input>
        </el-col>
      </el-row>
      <div class="login-btns">
        <p class="login-tip" @click="turnToRegisterPage()">还没有账号？点击注册</p>
        <el-button @click="login()">登录</el-button>
      </div>
    </div>
    <!-- <p>官方测试账号：20181009999</p>
    <p>测试密码：123</p>
    <p>（仅供计算机设计大赛使用，请勿恶意用途）</p> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },

  components: {},
  created: () => {},
  methods: {
    turnToRegisterPage: function () {
      this.$router.push('/register')
    },
    turnToMainPage: function () {
      this.$router.push('/main')
    },
    login: function () {
      // let data = {
      //   student_id: this.username,
      //   student_password: this.password
      // }
      // let header = {
      //   'Content-Type': 'application/x-www-form-urlencoded'
      // }
      this.axios({
        method: 'POST',
        url: `${process.env.API_HOST}/login`,
        data: {
          student_id: this.username,
          student_password: this.password
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        if (res.data.status === 200) {
          this.global.token = res.data.token
          this.global.account = this.username
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('account', this.username)
          this.turnToMainPage()
        } else {
          this.$message({
            message: '账号或密码错误！',
            type: 'error'
          })
        }
      }).catch((res) => {
        this.$message({
          message: '服务器开小差啦~',
          type: 'error'
        })
      })
    }
  }
}
</script>
<style scoped>
.login-box {
  width: 500px;
  padding: 20px;
  margin: 100px auto 80px auto;
  border: 1px solid #808080;
  border-radius: 20px;
}
.login-container p {
  text-align: center;
  margin: 10px;
}
.login-container {
  overflow: hidden;
}
.login-title {
  font-size: 32px;
  text-align: center;
}
.username-input,
.password-input {
  padding: 15px 0;
}
.login-tip {
  cursor: pointer;
  font-size: 12px;
  color: #808080;
}
.login-tip:hover {
  text-decoration: underline;
}
.login-btns {
  text-align: center;
}
.login-logo {
  width: 100px;
}
.login-logo-container {
  text-align: center;
  overflow: hidden;
}
</style>
