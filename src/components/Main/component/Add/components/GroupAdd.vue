<template>
  <div class="group-add-container">
    <el-row class="add-cell">
      <el-col :span="6">活动类别：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-select v-model="activityType" placeholder="请选择" @change="clearAll()">
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
    <el-row class="add-cell">
      <el-col :span="6">所属团队：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-select v-model="belongGroup" placeholder="请选择" @change="showChooseGroupMemberDialog()">
          <el-option v-for="(item, index) in attendedGroup" :key="index" :value="item"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="add-cell">
      <el-col :span="6">参与成员：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-tag class="group-attend-member" v-for="(item, index) in currentGroupMember" v-if="index<5" :key="item">{{item}}</el-tag>
        <span class="group-attend-member-tip" v-if="currentGroupMember.length>5">等人</span>
        <el-button type="success" v-if="currentGroupMember.length>0" size="small" @click="changeChooseGroupMemberDialog()">更改</el-button>
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
      <el-col :span="6">论文等级：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-input v-model="paperLevel"></el-input>
      </el-col>
    </el-row>
    <el-row class="add-cell" v-if="activityType==='学术论文类'">
      <el-col :span="6">发布期刊：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-input v-model="publishMagazine"></el-input>
      </el-col>
    </el-row>
    <el-row class="add-cell" v-if="activityType==='学术论文类'">
      <el-col :span="6">第几作者：</el-col>
      <el-col :span="18" class="add-cell-content">
        <div class="wirter" v-for="(item, index) in currentGroupMember" :key="index" v-if="index<5">
          <span>{{item}}</span>
          <el-tag type="success">{{memberWriterLevelList[index]}}作</el-tag>
        </div>
      </el-col>
    </el-row>
    <!-- <el-row class="add-cell" v-if="activityType==='经历类'">
      <el-col :span="6">经历内容：</el-col>
      <el-col>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="expContent">
        </el-input>
      </el-col>
    </el-row> -->
    <el-row class="add-cell">
      <el-col :span="6">综测分数：</el-col>
      <el-col :span="18" class="add-cell-content">
        <el-input v-model="score"></el-input>
      </el-col>
    </el-row>
    <el-dialog title="参与成员" :visible.sync="isShowGroupMemberDialog">
      <el-checkbox-group v-model="currentGroupMember">
        <el-checkbox v-for="(item, index) in attendGroupMember" :key="index" :label="item"></el-checkbox>
      </el-checkbox-group>
      <div class="add-btns">
        <el-button @click="closeGroupMemberDialog()">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog title="作者" :visible.sync="isShowWriterLevelDialog">
      <div class="writer-level-container">
        <el-row type="flex" justify="space-around" align="middle" v-for="(item, idx) in currentGroupMember" :key="idx">
          <el-col :span="4">{{item}}</el-col>
          <el-col :span="16">
            <el-select v-model="memberWriterLevelList[idx]" placeholder="请选择">
              <el-option v-for="item in writerLevelList" :key="item" :value="item"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <div class="add-btns">
        <el-button @click="closeWriterLevelDialog()">确认</el-button>
      </div>
      </div>
    </el-dialog>
    <div class="add-btns">
      <el-button type="success" @click="addActivity()">添加</el-button>
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
      attendedGroup: [],
      attendedGroupMap: [],
      belongGroup: '',
      currentGroupMember: [], // 参与的团队成员
      attendGroupMemberMap: new Map(),
      attendGroupMember: [], // 团队所有成员
      isShowGroupMemberDialog: false,
      isShowWriterLevelDialog: false,
      memberWriterLevelList: [], // 参加组员的论文第几作者
      writerLevelList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      score: '',
      paperLevel: '',
      expContent: ''
    }
  },
  computed: {
  },
  components: {},
  created: function () {
    this.getGroupList()
  },
  methods: {
    /**
     * 切换时清除队员信息
     */
    clearAll: function () {
      this.currentGroupMember = []
      this.belongGroup = ''
    },
    /**
     * 显示参与成员框
     */
    showChooseGroupMemberDialog: function () {
      this.attendGroupMember = []
      this.currentGroupMember = []
      this.memberWriterLevelList = []
      this.isShowGroupMemberDialog = true
      this.getGroupMemberList()
    },
    /**
     * 显示参与成员框，但不清空
     */
    changeChooseGroupMemberDialog: function () {
      this.isShowGroupMemberDialog = true
    },
    /**
     * 关闭参与成员框
     */
    closeGroupMemberDialog: function () {
      this.isShowGroupMemberDialog = false
      if (this.activityType === '学术论文类') {
        this.showWriterLevelDialog()
      }
      console.log(this.attendedGroup)
    },
    /**
     * 显示第几作者框
     */
    showWriterLevelDialog: function () {
      this.isShowWriterLevelDialog = true
    },
    /**
     * 关闭第几作者框
     */
    closeWriterLevelDialog: function () {
      this.isShowWriterLevelDialog = false
    },
    /**
     * 获得自己参加的团队
     */
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
          let tmp = new Map()
          res.data.data.forEach(item => {
            tmp.set(item[1], item[0])
            this.attendedGroup.push(item[1])
          })
          this.attendedGroupMap = tmp
          console.log(this.attendedGroup)
        }
      })
    },
    /**
     * 获得当前选中团队的所有成员
     */
    getGroupMemberList: function () {
      this.axios({
        url: `${process.env.API_HOST}/getTeamMember`,
        method: 'POST',
        data: {
          token: this.global.token,
          team_id: this.attendedGroupMap.get(this.belongGroup)
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
          res.data.data.Members.forEach((item) => {
            this.attendGroupMemberMap.set(item[1], item[0])
            this.attendGroupMember.push(item[1])
          })
          this.attendGroupMemberMap.set(res.data.data.Leader[1], res.data.data.Leader[0])
          this.attendGroupMember.push(res.data.data.Leader[1])
        }
      })
    },
    /**
     * 添加活动
     */
    addActivity: function () {
      // eslint-disable-next-line no-unused-vars
      let data = {}
      console.log(this.attendedGroupMap)
      let currentGroupMemberMap = []
      this.currentGroupMember.forEach((item) => {
        console.log(this.attendGroupMemberMap.get(item))
        currentGroupMemberMap.push(this.attendGroupMemberMap.get(item))
      })
      if (this.memberWriterLevelList.length > currentGroupMemberMap.length) {
        this.memberWriterLevelList.splice(currentGroupMemberMap.length, this.memberWriterLevelList.length - currentGroupMemberMap.length)
      }
      if (this.activityType === '竞赛活动类') {
        data = {
          token: this.global.token,
          team_id: this.attendedGroupMap.get(this.belongGroup),
          member: currentGroupMemberMap,
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
          team_id: this.attendedGroupMap.get(this.belongGroup),
          member: currentGroupMemberMap,
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
          team_id: this.attendedGroupMap.get(this.belongGroup),
          member: currentGroupMemberMap,
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
          team_id: this.attendedGroupMap.get(this.belongGroup),
          member: currentGroupMemberMap,
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
          team_id: this.attendedGroupMap.get(this.belongGroup),
          member: currentGroupMemberMap,
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
            } else {
              this.$message({
                type: 'info',
                message: '添加有误！'
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
.group-attend-member{
    margin: 0 5px;
}
.group-attend-member-tip{
    color: #808080;
}
.wirter{
  display: inline-block;
  margin: 0 10px;
}
</style>
