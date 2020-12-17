<template>
  <div class="register-container">
    <el-row class="register-input" type="flex" justify="space-around" align="middle">
        <el-col :span="5">学校：</el-col>
        <el-col :span="10"><el-input v-model="school"></el-input></el-col>
    </el-row>
    <el-row class="register-input" type="flex" justify="space-around" align="middle">
        <el-col :span="5">学号：</el-col>
        <el-col :span="10"><el-input v-model="studentID"></el-input></el-col>
    </el-row>
    <el-row class="register-input" type="flex" justify="space-around" align="middle">
        <el-col :span="5">院系：</el-col>
        <el-col :span="10"><el-input v-model="collage"></el-input></el-col>
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
        <el-col :span="5">姓名：</el-col>
        <el-col :span="10"><el-input v-model="name"></el-input></el-col>
    </el-row>
    <el-row class="register-input" type="flex" justify="space-around" align="middle">
        <el-col :span="5">生日：</el-col>
        <el-col :span="10">
        <el-date-picker
          v-model="birthday"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-col>
    </el-row>
    <el-row class="register-input" type="flex" justify="space-around" align="middle">
        <el-col :span="5">入学年份：</el-col>
        <el-col :span="10">
        <el-date-picker
          v-model="year"
          type="year"
          placeholder="选择年份"
          value-format="yyyy"
        ></el-date-picker>
      </el-col>
    </el-row>
    <el-row class="register-input" type="flex" justify="space-around" align="middle">
        <el-col :span="5">联系方式：</el-col>
        <el-col :span="10"><el-input v-model="phoneNumber"></el-input></el-col>
    </el-row>
    <el-row class="register-input" type="flex" justify="space-around" align="middle">
        <el-col :span="5">密码：</el-col>
        <el-col :span="10"><el-input type="password" v-model="password"></el-input></el-col>
    </el-row>
    <div class="register-btns">
      <el-button @click="register()">注册</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      studentID: '',
      major: '',
      klass: '',
      birthday: '',
      year: '',
      school: '',
      collage: '',
      name: '',
      phoneNumber: '',
      password: ''
    }
  },

  components: {},

  methods: {
    register: function () {
      this.axios({
        method: 'POST',
        url: `${process.env.API_HOST}/register`,
        data: {
          student_id: this.studentID,
          student_password: this.password,
          student_name: this.name,
          student_birthday: this.birthday,
          student_phone: this.phoneNumber,
          student_school: this.school,
          student_department: this.collage,
          student_major: this.major,
          student_year: this.year,
          student_class: this.klass
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
        if (res.data === 200) {
          this.$message({
            message: '注册成功',
            type: 'success',
            onClose: () => {
              this.$router.push('/')
            }
          })
        }
      })
    }
  }
}

</script>
<style scoped>
.register-container{
    width:50%;
    margin: 50px auto;
}
.register-input{
    padding: 12px;
}
.register-btns{
  text-align: center;
}
</style>
