<template>
  <div class="about-us-container">
    <div class="img-content">
      <img class="logo" src="../../../assets/LOGO.png">
    </div>
    <p class="header">Whale Printer(鲸记)</p>
    <p class="intro">是一款记录大学生活动获奖经历小程序,可以根据用户的需求，个性化导出内容以便奖项填表、简历书写、活动报名等。</p>
    <div class="intro2">
      <p>我们的小蓝鲸刚刚来到这个世界</p>
      <p>或许有这样那样的缺点，或许有你喜欢的特点</p>
      <p>但我们非常希望你们能够提供宝贵的建议</p>
      <p>你们的鼓励是我们前进路上最足的底气</p>
    </div>
    <el-row type="flex" class="bottom">
      <el-col :span="12">
        <div class="suggest-left">
          <el-input type="textarea" rows="3" v-model="suggest" cols="10" placeholder="请写下您的建议···"></el-input>
          <div class="btns-container">
            <el-button type="primary" @click="sendSuggest()">发送</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="developer">
          <p>交互微信小程序上层-张可欣</p>
          <p>网络服务器接口中层-薛海威</p>
          <p>核心数据库开发底层-韦明杰</p>
        </div>
        <div class="support">
          <p>欢迎捐赠以维持服务器运营</p>
          <p>嗷嗷待哺的嗨威:18320919861</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      suggest: ''
    }
  },

  components: {},

  methods: {
    sendSuggest: function () {
      this.$message({
        message: '发送成功！',
        type: 'success'
      })
    }
  }
}

</script>
<style scoped>
.about-us-container{
  overflow: hidden;
  padding:25px;
  text-align: center;
}
.img-content{
  text-align: center;
}
.logo{
  width:200px
}
.header{
  font-size: 36px;
  font-weight: bold;
  text-align: center;
}
.intro2{
  margin: 30px;
}
.bottom{
  padding: 0 100px;
}
.suggest-left{
  padding: 10px 30px;
}
.developer{
  font-size: 14px;
  color:#808080
}
.developer p {
  margin-top:0px;
  margin-bottom: 10px;
}
.btns-container{
  margin-top:10px
}
.suggest-left{
  border-right: 2px solid rgba(128, 138, 135,0.5);
}
.suggest-left >>> .el-textarea__inner{
  width:300px;
  margin: 0 auto;
}
.support{
  margin: 15px;
  font-size: 12px;
  color:#808080
}
</style>
