<template>
  <div class="award-item-container">
    <!-- 获奖类型 -->
    <div class="award-item-type">{{isEssay ? '论文':'获奖'}}</div>
    <!-- 标题 -->
    <div class="award-item-title">
      <el-row>
        <el-col :span="23">{{title}}</el-col>
        <el-col :span="1" class="award-item-icon">
        <el-tooltip effect="dark" content="删除该活动" placement="top-start">
          <i class="el-icon-circle-close" @click="deleteItem()"></i>
        </el-tooltip>
        </el-col>
      </el-row>
    </div>
    <!-- 折叠面板 -->
    <el-collapse>
      <el-collapse-item name="1">
        <span class="collapse-title" slot="title">
          <i class="el-icon-medal"></i>
          <span>活动详情</span>
        </span>
        <div class="collapse-container">
          <!-- 标签 -->
          <el-tag v-if="eventClass === 0" v-for="(item, index) in tagList" :key="index">{{item}}</el-tag>
          <!-- 获奖时间 -->
          <p class="collapse-time">时间：{{time}}</p>
          <!-- 颁奖部门 -->
          <p class="collapse-award-department">奖项授予单位：{{department}}</p>
          <p v-if="isEssay" class="collapse-award-department">发布：{{essayJournal}}</p>
          <p v-if="indiJoin.length > 0">参与成员:
            <el-tag type="info" v-for="(item, index) in indiJoin" :key="index">{{item}}</el-tag>
          </p>
          <p v-if="eventClass === 2" class="collapse-applicant">申请人：{{applicant}}</p>
          <p v-if="eventClass === 2" class="collapse-register-number">专利号：{{registerNumber}}</p>
          <p v-if="eventClass === 3" class="collapse-principal">负责人：{{principal}}</p>
          <p v-if="eventClass === 3" class="collapse-timeBegin">开项时间：{{timeBegin}}</p>
          <p v-if="eventClass === 3" class="collapse-timeOver">结项时间：{{timeOver}}</p>
          <p v-if="eventClass === 4" class="collapse-content">内容：{{content}}</p>
          <p class="collapse-award-department">分类：{{type}}</p>
          <p class="collapse-score" v-if="eventClass !== 4">综测分：{{score}}</p>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'AwardItem',
  data () {
    return {}
  },
  props: ['title', 'eventId', 'type', 'tagList', 'time', 'department', 'score', 'isGroup', 'isEssay', 'essayJournal', 'indiJoin', 'principal', 'eventClass', 'applicant', 'appliedAmount', 'timeBegin', 'timeOver', 'projectCategory', 'content', 'registerNumber'],
  components: {},
  methods: {
    deleteItem: function () {
      this.$confirm(
        '确定要删除该活动吗？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then((res) => {
        this.axios({
          method: 'POST',
          url: `${process.env.API_HOST}/delData`,
          data: {
            token: this.global.token,
            Activity_Id: this.eventId
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
              type: 'success',
              message: '删除成功！'
            })
            this.$emit('reflash', true)
          } else {
            this.$message({
              type: 'error',
              message: '无权限删除，请联系队长！'
            })
          }
        })
      })
    }
  }
}
</script>
<style scoped>
.award-item-container {
  padding:20px;
  margin: 5px auto;
}
.award-item-type{
  padding: 10px 0;
  background-color: #f7f8fa;
}
.award-item-title{
  padding: 10px 0;
  font-weight: bold;
}
.award-item-title .el-icon-circle-close{
  font-size: 20px;
  cursor: pointer;
}
.award-item-icon{
  text-align: right;
}
.award-item-container .el-icon-medal{
  font-size: 20px;
}
.collapse-container .el-tag{
  margin: 5px 10px 0 0;
}
.collapse-container p{
  margin: 10px 0 0 0;
}
.collapse-title {
    flex: 1 0 90%;
    order: 1;
}
.el-collapse-item__header {
    flex: 1 0 auto;
    order: -1;
}
</style>
