<template>
  <div class="person-container">
    <el-row class="person-cell">
      <el-col :span="6">学校</el-col>
      <el-col :span="18" class="person-cell-content">{{school}}</el-col>
    </el-row>
    <el-row class="person-cell">
      <el-col :span="6">学号</el-col>
      <el-col :span="18" class="person-cell-content">{{studentId}}</el-col>
    </el-row>
    <el-row class="person-cell">
      <el-col :span="6">出生日期
      </el-col>
      <el-col :span="18" class="person-cell-content">{{birthday}}</el-col>
    </el-row>
    <el-row class="person-cell">
      <el-col :span="6">姓名</el-col>
      <el-col :span="18" class="person-cell-content">{{username}}</el-col>
    </el-row>
    <el-row class="person-cell">
      <el-col :span="6">学院</el-col>
      <el-col :span="18" class="person-cell-content">{{collage}}</el-col>
    </el-row>
    <el-row class="person-cell">
      <el-col :span="6">入学年份</el-col>
      <el-col :span="18" class="person-cell-content">{{year}}</el-col>
    </el-row>
    <el-row class="person-cell">
      <el-col :span="6">所属团队</el-col>
      <el-col :span="18" class="person-cell-content">
        <el-tag class="checkbox-tag" type="success" v-for="(item, index) in groupList" :key="index">{{item}}</el-tag>
      </el-col>
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
      <el-button type="success" @click="showImgDialog()">修改头像</el-button>
      <el-button type="success" @click="showEditDialog()">修改个人信息</el-button>
      <el-button type="success" @click="showChangePasswordDialog()">修改密码</el-button>
    </div>
    <!-- 修改个人信息Dialog -->
    <el-dialog title="标记个人信息" :visible.sync="isShowEditDialog">
      <el-form ref="form" :model="userInfo" label-width="120px">
        <el-form-item label="学校">
          <el-input v-model="userInfo.school"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="userInfo.studentId"></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
          v-model="userInfo.birthday"
          type="date"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="学院">
          <el-input v-model="userInfo.collage"></el-input>
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="userInfo.major"></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="userInfo.klass"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="userInfo.number"></el-input>
        </el-form-item>
        <div class="btns-container">
          <el-button type="success" @click="editInfo()">修改</el-button>
        </div>
      </el-form>
    </el-dialog>
    <my-upload field="UserImg"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      :width="300"
      :height="300"
      :url= imgRequest
      :params="params"
      :headers="headers"
      v-model="isShowImgDialog"
      img-format="jpg"
    ></my-upload>
    <el-dialog title="修改密码" :visible.sync="isShowChangePasswordDialog" type="flex" align="middle">
      <el-row class="person-edit-cell">
        <el-col :span="8">原密码：</el-col>
        <el-col :span="16" class="person-cell-content">
          <el-input type="password" v-model="oldPassword"></el-input>
        </el-col>
     </el-row>
     <el-row class="person-edit-cell">
       <el-col :span="8">新密码：</el-col>
       <el-col :span="16" class="person-cell-content">
          <el-input type="password" v-model="newPassword"></el-input>
        </el-col>
      </el-row>
      <div class="btns-container">
        <el-button type="success" @click="changePassword()">确定修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload/upload-2.vue'

export default {
  data () {
    return {
      school: '',
      studentId: '',
      birthday: '',
      username: '',
      collage: '',
      major: '',
      klass: '',
      number: '',
      year: '',
      groupList: [],
      // 用来修改的用户信息
      userInfo: {
        school: '',
        studentId: '',
        birthday: '',
        username: '',
        collage: '',
        major: '',
        klass: '',
        year: '',
        number: ''
      },
      oldPassword: '',
      newPassword: '',
      isShowChangePasswordDialog: false,
      isShowEditDialog: false,
      imgDataUrl: '',
      params: {
        token: this.global.token
        // name: 'UsrtImg'
      },
      imgRequest: `${process.env.API_HOST}/updateImg`,
      headers: {
        smail: '*_~'
      },
      isShowImgDialog: false
    }
  },
  components: {
    myUpload
  },
  created: function () {
    this.getUserInfo()
    this.getGroupList()
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
      }).then((res) => {
        if (res.data.status === 200) {
          this.school = res.data.student_school
          this.username = res.data.student_name
          this.birthday = res.data.student_birthday.substring(0, 10)
          this.studentId = res.data.student_id
          this.collage = res.data.student_department
          this.klass = res.data.student_class
          this.year = res.data.student_year
          this.major = res.data.student_major
          this.number = res.data.student_phone
        } else if (res.data.status === 401) {
          this.$message({
            message: 'token过期！请重新登录！',
            type: 'error'
          })
        } else {
          this.$message({
            message: '服务器开小差啦~',
            type: 'warning'
          })
        }
      })
    },
    getGroupList: function () {
      this.axios({
        url: `${process.env.API_HOST}/getTeam`,
        method: 'POST',
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
      }).then((res) => {
        console.log(res)
        if (res.data.status === 200) {
          res.data.data.forEach(item => {
            this.groupList.push(item[1])
          })
          console.log(this.groupList)
        } else if (res.data.status === 401) {
          this.$message({
            message: 'token过期！请重新登录！',
            type: 'error'
          })
        } else {
          this.$message({
            message: '服务器开小差啦~',
            type: 'warning'
          })
        }
      })
    },
    showEditDialog: function () {
      this.isShowEditDialog = true
      let info = {
        year: this.year,
        school: this.school,
        studentId: this.studentId,
        birthday: this.birthday,
        username: this.username,
        collage: this.collage,
        major: this.major,
        klass: this.klass,
        number: this.number
      }
      this.userInfo = info
    },
    editInfo: function () {
      this.axios({
        method: 'POST',
        url: `${process.env.API_HOST}/setInfo`,
        data: {
          token: this.global.token,
          'student_id': this.userInfo.studentId,
          'student_name': this.userInfo.username,
          'student_birthday': this.userInfo.birthday,
          'student_phone': this.userInfo.number,
          'student_school': this.userInfo.school,
          'student_department': this.userInfo.collage,
          'student_major': this.userInfo.major,
          'student_year': this.userInfo.year,
          'student_class': this.userInfo.klass
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
        if (res.data.status === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.isShowEditDialog = false
          this.getUserInfo()
        } else {
          this.$message({
            message: '修改失败！',
            type: 'info'
          })
        }
      })
    },
    showImgDialog: function () {
      this.isShowImgDialog = !this.isShowImgDialog
    },
    cropSuccess: function (imgDataUrl, field) {
      console.log('-------- crop success --------')
      this.imgDataUrl = imgDataUrl
    },
    cropUploadSuccess (jsonData, field) {
      console.log('-------- upload success --------')
      console.log(jsonData)
      this.$emit('updateImg', true)
    },
    cropUploadFail (status, field) {
      console.log('-------- upload fail --------')
      console.log(status)
      console.log('field: ' + field)
    },
    showChangePasswordDialog: function () {
      this.isShowChangePasswordDialog = true
    },
    /**
     * 更改密码
     */
    changePassword: function () {
      this.axios({
        method: 'POST',
        url: `${process.env.API_HOST}/ChangePwd`,
        data: {
          token: this.global.token,
          old_password: this.oldPassword,
          new_password: this.newPassword
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
        if (res.data === 200) {
          this.$message({
            message: '修改成功！',
            type: 'success'
          })
          this.isShowChangePasswordDialog = false
        } else {
          this.$message({
            message: '修改失败！',
            type: 'info'
          })
        }
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
  padding:20px 260px;
}
.person-edit-cell{
   padding:20px 150px;
}
.person-cell-content{
  text-align: right;
}
.checkbox-tag{
  margin: 5px  0 0 10px;
}
.btns-container{
  text-align: center;
}
</style>
