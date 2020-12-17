<template>
  <div class="person-add-container">
    <el-row class="add-cell">
      <el-col :span="6">活动类别：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-select v-model="activityType" placeholder="请选择">
          <el-option v-for="item in types" :key="item" :value="item"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="add-cell" v-if="activityType==='学术论文类'">
      <el-col :span="6">论文标题：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-input v-model="paperName"></el-input>
      </el-col>
    </el-row>
    <el-row class="add-cell" v-if="activityType==='竞赛活动类'">
      <el-col :span="6">奖项名称：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-input v-model="projectName"></el-input>
      </el-col>
    </el-row>
    <el-row class="add-cell">
      <el-col :span="6">活动时间：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-date-picker
          v-model="awardTime"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-col>
    </el-row>
    <el-row class="add-cell" v-if="activityType==='竞赛活动类'">
      <el-col :span="6">奖项类别：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-select v-model="awardType" placeholder="请选择">
          <el-option v-for="item in awardTypeList" :key="item" :value="item"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="add-cell" v-if="activityType==='竞赛活动类'">
      <el-col :span="6">活动奖项：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-select v-model="awardRank" placeholder="请选择">
          <el-option v-for="item in awardRankList" :key="item" :value="item"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="add-cell" v-if="activityType==='竞赛活动类'">
      <el-col :span="6">活动等级：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-select v-model="awardLevel" placeholder="请选择">
          <el-option v-for="item in awardLevelList" :key="item" :value="item"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="add-cell" v-if="activityType==='竞赛活动类'">
      <el-col :span="6">奖项授予单位：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-input v-model="awardDepartment"></el-input>
      </el-col>
    </el-row>
    <el-row class="add-cell" v-if="activityType==='学术论文类'">
      <el-col :span="6">发布期刊：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-input v-model="publishMagazine"></el-input>
      </el-col>
    </el-row>
    <el-row class="add-cell" v-if="activityType==='学术论文类'">
      <el-col :span="6">论文等级：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-input v-model="paperLevel"></el-input>
      </el-col>
    </el-row>
    <el-row class="add-cell" v-if="activityType==='经历类'">
      <el-col :span="6">经历名称：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-input v-model="expName"></el-input>
      </el-col>
    </el-row>
    <el-row class="add-cell" v-if="activityType==='专利类'">
      <el-col :span="6">专利号：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-input v-model="registerNumber"></el-input>
      </el-col>
    </el-row>
    <el-row class="add-cell" v-if="activityType==='专利类'">
      <el-col :span="6">申请人：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-input v-model="applicant"></el-input>
      </el-col>
    </el-row>
    <el-row class="add-cell" v-if="activityType==='专利类'">
      <el-col :span="6">申请人：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-input v-model="applicant"></el-input>
      </el-col>
    </el-row>
    <el-row class="add-cell" v-if="activityType==='项目类'">
      <el-col :span="6">负责人：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-input v-model="principal"></el-input>
      </el-col>
    </el-row>
    <el-row class="add-cell" v-if="activityType==='项目类'">
      <el-col :span="6">申请金额：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-input v-model="appliedAmount" type="number"></el-input>
      </el-col>
    </el-row>
    <el-row class="add-cell"  v-if="activityType==='项目类'">
      <el-col :span="6">开项时间：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-date-picker
          v-model="timeBegin"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-col>
    </el-row>
    <el-row class="add-cell"  v-if="activityType==='项目类'">
      <el-col :span="6">结项时间：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-date-picker
          v-model="timeOver"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-col>
    </el-row>
    <el-row class="add-cell" v-if="activityType==='经历类'">
      <el-col :span="6">经历内容：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="expContent">
        </el-input>
      </el-col>
    </el-row>
    <el-row class="add-cell" v-if="activityType==='学术论文类'">
      <el-col :span="6">第几作者：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-select v-model="writerLevel" placeholder="请选择">
          <el-option v-for="item in writerLevelList" :key="item" :value="item"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="add-cell" v-if="activityType !=='经历类'">
      <el-col :span="6">综测分数：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-input v-model="score"></el-input>
      </el-col>
    </el-row>
    <div class="add-btns">
      <el-button type="success" @click="add()">添加</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      projectName: '',
      paperName: '',
      awardLevel: '',
      types: ['竞赛活动类', '学术论文类', '经历类', '专利类', '项目类'],
      activityType: '',
      awardLevelList: ['院级', '校级', '市级', '省级', '国家级', '一般'],
      awardRank: '',
      awardRankList: ['特等奖', '一等奖', '二等奖', '三等奖', '优秀奖'],
      awardType: '',
      awardTypeList: ['社会实践与服务', '科技竞赛', '文体活动'],
      awardDepartment: '',
      qualityCategory: '',
      awardTime: '',
      publishMagazine: '',
      writerLevel: '',
      writerLevelList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      paperLevel: '',
      score: '',
      expContent: '',
      timeBegin: '',
      timeOver: '',
      projectCategory: '',
      principal: '',
      appliedAmount: ''
    }
  },

  components: {},

  methods: {
    /**
     * 添加活动
     */
    add: function () {
      // eslint-disable-next-line no-unused-vars
      let data = {}
      if (this.activityType === '竞赛活动类') {
        data = {
          token: this.global.token,
          team_id: '',
          member: [],
          Activity_Category: 0,
          Activity_Name: this.projectName,
          Activity_Time: this.awardTime,
          Award_Category: this.awardTypeList.indexOf(this.awardType),
          Activity_Award: this.awardRank,
          Activity_Level: this.awardLevel,
          Award_Given: this.awardDepartment,
          Publish: -1,
          Author: -1,
          applicant: -1,
          registerNumber: -1,
          timeBegin: -1,
          timeOver: -1,
          projectCategory: -1,
          principal: -1,
          appliedAmount: -1,
          content: -1,
          Score: this.score
        }
      } else if (this.activityType === '经历类') {
        data = {
          token: this.global.token,
          team_id: '',
          member: [],
          Activity_Category: 4,
          Activity_Name: this.projectName,
          Activity_Time: this.awardTime,
          Award_Category: -1,
          Activity_Award: -1,
          Activity_Level: -1,
          Award_Given: -1,
          Publish: -1,
          Author: -1,
          applicant: -1,
          registerNumber: -1,
          timeBegin: -1,
          timeOver: -1,
          projectCategory: -1,
          principal: -1,
          appliedAmount: -1,
          content: this.expContent,
          Score: this.score
        }
      } else if (this.activityType === '专利类') {
        data = {
          token: this.global.token,
          team_id: '',
          member: [],
          Activity_Category: 2,
          Activity_Name: this.projectName,
          Activity_Time: this.awardTime,
          Award_Category: -1,
          Activity_Award: -1,
          Activity_Level: -1,
          Award_Given: -1,
          Publish: -1,
          Author: -1,
          applicant: this.applicant,
          registerNumber: this.registerNumber,
          timeBegin: -1,
          timeOver: -1,
          projectCategory: -1,
          principal: -1,
          appliedAmount: -1,
          content: -1,
          Score: this.score
        }
      } else if (this.activityType === '项目类') {
        data = {
          token: this.global.token,
          team_id: '',
          member: [],
          Activity_Category: 3,
          Activity_Name: this.projectName,
          Activity_Time: this.awardTime,
          Award_Category: -1,
          Activity_Award: -1,
          Activity_Level: -1,
          Award_Given: -1,
          Publish: -1,
          Author: -1,
          applicant: -1,
          registerNumber: -1,
          timeBegin: this.timeBegin,
          timeOver: this.timeOver,
          projectCategory: this.projectCategory,
          principal: this.principal,
          appliedAmount: this.appliedAmount,
          content: -1,
          Score: this.score
        }
      } else {
        data = {
          token: this.global.token,
          team_id: '',
          member: [],
          Activity_Category: 1,
          Activity_Name: this.projectName,
          Activity_Time: this.awardTime,
          Award_Category: -1,
          Activity_Award: -1,
          Activity_Level: this.paperLevel,
          Award_Given: -1,
          Publish: this.publishMagazine,
          Author: this.memberWriterLevelList,
          applicant: -1,
          registerNumber: -1,
          timeBegin: -1,
          timeOver: -1,
          projectCategory: -1,
          principal: -1,
          appliedAmount: -1,
          content: -1,
          Score: this.score
        }
      }
      console.log(data)
      this.$confirm('确定要添加吗？请仔细检查信息！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.axios({
            method: 'POST',
            url: `${process.env.API_HOST}/inputData`,
            data: data
          }).then(res => {
            if (res.data === 200) {
              this.$message({
                type: 'success',
                message: '添加成功！',
                onClose: () => {
                  this.$router.push('/main')
                }
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '添加有误！'
          })
        })
    }
  }
}
</script>
<style scoped>
.add-cell {
  padding: 10px 200px;
}
.add-cell .el-input {
  width: 400px;
}
.add-cell .el-select {
  width: 400px;
}
.add-cell-content {
  text-align: right;
}
.add-btns {
  margin: 20px auto;
  text-align: center;
}
</style>
