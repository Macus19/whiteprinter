<template>
  <div class="register-container">
    <el-row class="register-input" type="flex" justify="space-around" align="middle">
        <el-col :span="5">学号：</el-col>
        <el-col :span="10"><el-input v-model="studentID"></el-input></el-col>
    </el-row>
    <el-row class="register-input" type="flex" justify="space-around" align="middle">
        <el-col :span="5">专业：</el-col>
        <el-col :span="10"><el-input v-model="major"></el-input></el-col>
    </el-row>
    <el-row class="register-input" type="flex" justify="space-around" align="middle">
        <el-col :span="5">班级：</el-col>
        <el-col :span="10"><el-input v-model="klass"></el-input></el-col>
    </el-row>
    <el-row class="register-input" type="flex" justify="space-around" align="middle">
        <el-col :span="5">院系：</el-col>
        <el-col :span="10"><el-input v-model="collage"></el-input></el-col>
    </el-row>
    <el-row class="register-input" type="flex" justify="space-around" align="middle">
        <el-col :span="5">姓名：</el-col>
        <el-col :span="10"><el-input v-model="name"></el-input></el-col>
    </el-row>
    <el-row class="register-input" type="flex" justify="space-around" align="middle">
        <el-col :span="5">联系方式：</el-col>
        <el-col :span="10"><el-input v-model="phoneNumber"></el-input></el-col>
    </el-row>
    <el-row class="register-input" type="flex" justify="space-around" align="middle">
        <el-col :span="5">密码：</el-col>
        <el-col :span="10"><el-input type="password" v-model="password"></el-input></el-col>
    </el-row>
    <el-button>注册</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      studentID: '',
      major: '',
      klass: '',
      collage: '',
      name: '',
      phoneNumber: '',
      password: ''
    }
  },

  components: {},

  methods: {}
}

</script>
<style scoped>
.register-container{
    width:50%;
    margin: 50px auto;
}
.register-input{
    padding: 20px 10px;
}
</style>
