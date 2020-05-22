<template>
  <div class="person-container">
    <el-row class="person-cell">
      <el-col :span="6">学号</el-col>
      <el-col :span="18" class="person-cell-content">{{studentId}}</el-col>
    </el-row>
    <el-row class="person-cell">
      <el-col :span="6">学院</el-col>
      <el-col :span="18" class="person-cell-content">{{collage}}</el-col>
    </el-row>
    <el-row class="person-cell">
      <el-col :span="6">专业</el-col>
      <el-col :span="18" class="person-cell-content">{{major}}</el-col>
    </el-row>
    <el-row class="person-cell">
      <el-col :span="6">班级</el-col>
      <el-col :span="18" class="person-cell-content">{{klass}}</el-col>
    </el-row>
    <el-row class="person-cell">
      <el-col :span="6">联系方式</el-col>
      <el-col :span="18" class="person-cell-content">{{number}}</el-col>
    </el-row>
    <div class="person-btns">
      <el-button type="success">修改头像</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      studentId: '',
      username: '',
      collage: '',
      major: '',
      klass: '',
      number: ''
    }
  },
  components: {},
  created: function () {
    this.getUserInfo()
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
      }).then((res) => {
        this.username = res.data.student_name
        this.studentId = res.data.student_id
        this.collage = res.data.student_department
        this.klass = res.data.student_class
        this.major = res.data.student_major
        this.number = res.data.contact_info
      })
    }
  }
}

</script>
<style scoped>
.person-btns{
  text-align: center;
  margin-top:30px
}
.person-cell{
  padding:20px 100px;
}
.person-cell-content{
  text-align: right;
}
</style>
