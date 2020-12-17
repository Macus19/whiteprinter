<template>
  <div class="group-container">
    <el-row type="flex" style="height:100%" >
      <el-col :span="17" class="content">
        <p class="group-title">
          <span>当前团队：{{currentGroup||'暂无团队'}}</span>
          <span v-if="currentGroup">团队邀请码：{{currentTeamId}}</span>
          <el-button v-if="currentGroup" v-clipboard:copy="currentTeamId" v-clipboard:success="successCopy" size="small" type="success">复制邀请码</el-button>
        </p>
        <div class="award-container" style="height:90%;overflow-y:scroll;overflow-x:hidden;">
            <award-item
              @reflash="getGroupActivity()"
              v-for="item in awardList"
              :indiJoin="item.indiJoin"
              :key="item.eventId"
              :score="item.score"
              :tagList="item.tagList"
              :department="item.department"
              :eventId="item.id"
              :isGroup="item.isGroup"
              :isEssay="item.isEssay"
              :essayJournal="item.essayJournal"
              :type="item.type"
              :title="item.title"
              :time="item.time"
            ></award-item>
            <p v-if="awardList.length === 0">暂无活动或论文！</p>
          </div>
      </el-col>
      <el-col :span="6" class="group-operate">
        <div class="btns-container">
          <el-button class="buttons" @click="showAddGroupDialog()">加入团队</el-button>
        </div>
        <el-select v-model="currentGroup" placeholder="请选择" @change="getGroupActivity()">
          <el-option
            v-for="(item, index) in groupList"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <div class="btns-container">
          <el-button @click="showCreateGroupDialog()">创建团队</el-button>
        </div>
        <div class="btns-container">
          <el-button  v-if="!isCurrentGroupLeader" @click="exitGroup()">退出当前团队</el-button>
        </div>
        <div class="btns-container">
          <el-button  v-if="isCurrentGroupLeader" @click="showDrawer()">导出团队信息</el-button>
        </div>
        <div class="btns-container">
          <el-button v-if="isCurrentGroupLeader" @click="exitGroup()">解散当前团队</el-button>
        </div>
        <div v-if="currentGroup" class="member">
          <p class="member-title">队员信息</p>
          <p>队长：{{leader.studentId}} {{leader.studentName}}</p>
          <p v-if="index<groupMemberList.length-1" v-for="(item, index) in groupMemberList" :key="index">成员{{index+1}}:{{item}} {{groupMemberNameList[index]}}</p>
        </div>
      </el-col>
    </el-row>
    <!-- 加入团队框 -->
    <el-dialog title="加入团队" :visible.sync="isShowAddGroupDialog">
      <el-row class="add-cell" type="flex" align="middle">
        <el-col :span="6">团队ID：</el-col>
        <el-col :span="18" class="add-cell-content">
          <el-input v-model="addGroup.groupId"></el-input>
        </el-col>
      </el-row>
      <el-row class="add-cell">
        <el-col :span="6">团队密码：</el-col>
        <el-col :span="18" class="add-cell-content">
          <el-input v-model="addGroup.groupKey"></el-input>
        </el-col>
      </el-row>
      <div class="add-btns">
        <el-button type="success" @click="addGroupFun()">添加</el-button>
      </div>
    </el-dialog>
    <!-- 创建团队框 -->
    <el-dialog title="创建团队" :visible.sync="isShowCreateGroupDialog">
      <el-row class="add-cell" type="flex" align="middle">
        <el-col :span="6">团队名称：</el-col>
        <el-col :span="18" class="add-cell-content">
          <el-input v-model="createGroup.groupName"></el-input>
        </el-col>
      </el-row>
      <el-row class="add-cell" type="flex" align="middle">
        <el-col :span="6">团队密码：</el-col>
        <el-col :span="18" class="add-cell-content">
          <el-input v-model="createGroup.groupKey"></el-input>
        </el-col>
      </el-row>
      <div class="add-btns">
        <el-button type="success" @click="createGroupFun()">添加</el-button>
      </div>
    </el-dialog>
    <!-- 右侧弹出筛选栏 -->
    <el-drawer
      :visible.sync="isShowDrawer"
      direction="rtl"
      size="20%"
      :modal="false"
      @close="clearAccount()"
    >
      <p>选择导出成员的学号</p>
      <el-checkbox-group v-model="account">
        <div class="checkbox-cell" v-for="(item, index) in groupMemberList" :key="index">
          <el-checkbox :label="item"></el-checkbox>
        </div>
        <div class="divider"></div>
      </el-checkbox-group>
      <el-checkbox-group v-model="result">
        <div class="checkbox-cell">
          <el-checkbox label="姓名"></el-checkbox>
        </div>
        <div class="checkbox-cell">
          <el-checkbox label="生日"></el-checkbox>
        </div>
        <div class="checkbox-cell">
          <el-checkbox label="电话"></el-checkbox>
        </div>
        <div class="checkbox-cell">
          <el-checkbox label="学校"></el-checkbox>
        </div>
        <div class="checkbox-cell">
          <el-checkbox label="学院"></el-checkbox>
        </div>
        <div class="checkbox-cell">
          <el-checkbox label="专业"></el-checkbox>
        </div>
        <div class="checkbox-cell">
          <el-checkbox label="年级"></el-checkbox>
        </div>
        <div class="checkbox-cell">
          <el-checkbox label="班级"></el-checkbox>
        </div>
      </el-checkbox-group>
      <div class="output-btns">
        <el-button @click="showDialog()">确认筛选</el-button>
      </div>
    </el-drawer>
    <!-- 排序弹窗 -->
     <el-dialog title="排序" :visible.sync="isShowSortDialog">
      <div class="sort-container">
        <el-row type="flex" justify="space-around" align="middle" v-for="(item, index) in result" :key="index">
          <el-col :span="3">第{{index+1}}项</el-col>
          <el-col :span="8">
            <el-select @change="getItem" :data-index="index" v-model="sortList[index]">
              <el-option
                v-for="(i, idx) in result"
                :key="idx"
                :value="i"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <div class="sort-container-btns">
          <el-button type="primary" @click="downloadUrl()">确认</el-button>
          <el-button type="success">重置</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="isShowCopyDialog">
      <div class="copy-container">
        <p class="text-pre">文本预览</p>
        <el-input class="preview" type="textarea" v-model="outputText"></el-input>
        <div>文件下载链接为：{{excelUrl}}</div>
        <div class="copy-container-btns">
          <el-button type="success" v-clipboard:copy="outputText" v-clipboard:success="successCopy">点击复制文本</el-button>
          <el-button type="success" v-clipboard:copy="excelUrl" v-clipboard:success="successCopy">点击复制链接</el-button>
          <el-button type="success" @click="dirtDownload()">下载导出文件</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AwardItem from '../component/AwardItem'

export default {
  data () {
    return {
      awardCategoryList: ['社会实践与服务', '科技竞赛', '文体活动'],
      isShowCopyDialog: false,
      isShowSortDialog: false,
      isShowDrawer: false,
      sortList: [],
      // 筛选成员学号列表
      account: [],
      // 筛选条件数组
      result: [],
      // 条件映射
      resultMap: new Map([['姓名', 'name'], ['生日', 'birthday'], ['电话', 'phoneNumber'], ['学校', 'school'], ['学院', 'deptName'], ['专业', 'major'], ['年级', 'grade'], ['班级', 'class']]),
      currentGroup: '', // 当前显示的团队
      groupList: [], // 用户参加的所有团队
      groupListMap: new Map(), // 团队和团队id映射
      // 是否显示加入团队框
      isShowAddGroupDialog: false,
      // 加入团队
      addGroup: {
        groupId: '',
        groupKey: ''
      },
      // 是否显示创建团队框
      isShowCreateGroupDialog: false,
      // 创建团队
      createGroup: {
        groupName: '',
        groupKey: ''
      },
      // 当前团队的所有成员
      groupMemberList: [],
      // 成员名字列表
      groupMemberNameList: [],
      // 是否当前团队的队长
      isCurrentGroupLeader: false,
      // 队长
      leader: {
        studentId: '',
        studentName: ''
      },
      awardList: [],
      outputText: '',
      excelUrl: ''
    }
  },

  components: {
    AwardItem
  },
  computed: {
    currentTeamId: function () {
      return this.groupListMap.get(this.currentGroup)
    }
  },
  created: function () {
    this.getGroupList()
  },
  methods: {
    /**
     * 显示加入团队框
     */
    showAddGroupDialog: function () {
      this.isShowAddGroupDialog = true
    },
    /**
     * 加入某个团队
     */
    addGroupFun: function () {
      this.axios({
        url: `${process.env.API_HOST}/attendTeam`,
        method: 'POST',
        data: {
          token: this.global.token,
          team_id: this.addGroup.groupId,
          team_key: this.addGroup.groupKey
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
            message: '成功加入！',
            type: 'success'
          })
          this.isShowAddGroupDialog = false
          this.getGroupList()
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
    /**
     * 显示创建团队框
     */
    showCreateGroupDialog: function () {
      this.isShowCreateGroupDialog = true
    },
    /**
     * 退出团队
     */
    exitGroup: function () {
      this.$alert('是否要退出当前团队？', '退出团队', {
        confirmButtonText: '确定',
        callback: (res) => {
          this.axios({
            url: `${process.env.API_HOST}/exitTeam`,
            method: 'POST',
            data: {
              token: this.global.token,
              team_id: this.currentTeamId
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
                message: '已成功退出当前团队！',
                type: 'success'
              })
              this.getGroupList()
              this.currentGroup = null
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
        }
      })
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
          this.groupList = []
          this.groupListMap = new Map()
          res.data.data.forEach(item => {
            this.groupListMap.set(item[1], item[0])
            this.groupList.push(item[1])
          })
          this.currentGroup = this.groupList[0]
          this.getGroupActivity()
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
    /**
     * 获得当前团队用户参加的活动
     */
    getGroupActivity: function () {
      this.awardList = []
      this.checkLeader()
      this.axios({
        url: `${process.env.API_HOST}/getTeamEvent`,
        method: 'POST',
        data: {
          token: this.global.token,
          team_id: this.currentTeamId
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
        this.getGroupMemberList()
        if (res.data.status === 200) {
          let eventList = res.data.data
          if (res.data.data === '') {
            return
          }
          let itemList = []
          eventList.forEach(item => {
            let tmp = {
              id: item.eventId,
              type: this.awardCategoryList[item.awardCategory] || '论文',
              title: item.eventName,
              tagList: [item.eventRank, item.awardSet || item.essayJournal],
              time: item.eventTime.substring(0, 10),
              isGroup: item.teamJoin !== null,
              indiJoin: item.indiJoin,
              // eslint-disable-next-line no-unneeded-ternary
              isEssay: item.essayId ? true : false,
              essayJournal: item.essayJournal || null,
              department: item.awardUnit || '此项为论文，无授予单位！',
              score: item.testScore
            }
            itemList.push(tmp)
          })
          this.awardList = itemList
        } else if (res.data.status === 401) {
          this.$message({
            message: 'token过期！请重新登录！',
            type: 'error'
          })
          this.$router.push('/login')
        } else {
          this.$message({
            message: '服务器开小差啦~',
            type: 'warning'
          })
        }
      })
    },
    /**
     * 检查是否当前团队的队长
     */
    checkLeader: function () {
      this.axios({
        url: `${process.env.API_HOST}/checkLeader`,
        method: 'POST',
        data: {
          token: this.global.token,
          team_id: this.currentTeamId
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
          this.isCurrentGroupLeader = true
        } else {
          this.isCurrentGroupLeader = false
        }
      })
    },
    /**
     * 创建团队
     */
    createGroupFun: function () {
      this.axios({
        url: `${process.env.API_HOST}/createTeam`,
        method: 'POST',
        data: {
          token: this.global.token,
          team_name: this.createGroup.groupName,
          team_key: this.createGroup.groupKey
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
          this.$confirm(`创建成功！团队编号为${res.data.team_id}，可以和密码一起分享给队员啦！`, '提示', {
            confirmButtonText: '确定'
          }).then((res) => {
            this.isShowCreateGroupDialog = false
            this.getGroupList()
          })
        } else if (res.data.status === 401) {
          this.$message({
            message: 'token过期！请重新登录！',
            type: 'error'
          })
          this.$router.push('/login')
        } else {
          this.$message({
            message: '服务器开小差啦~',
            type: 'warning'
          })
        }
      })
    },
    /**
     * 获得当前选中团队的所有成员
     */
    getGroupMemberList: function () {
      this.groupMemberList = []
      this.getGroupMemberNameList = []
      this.axios({
        url: `${process.env.API_HOST}/getTeamMember`,
        method: 'POST',
        data: {
          token: this.global.token,
          team_id: this.currentTeamId
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
          this.groupMemberNameList = []
          this.groupMemberList = []
          res.data.data.Members.forEach((item) => {
            this.groupMemberList.push(item[0])
            this.groupMemberNameList.push(item[1])
          })
          this.groupMemberList.push(res.data.data.Leader[0])
          this.groupMemberNameList.push(res.data.data.Leader[1])
          let tmp = {
            studentId: res.data.data.Leader[0],
            studentName: res.data.data.Leader[1]
          }
          this.leader = tmp
          console.log(this.groupList)
          console.log(this.groupMemberNameList)
        } else if (res.data.status === 401) {
          this.$message({
            message: 'token过期！请重新登录！',
            type: 'error'
          })
          this.$router.push('/login')
        } else {
          this.$message({
            message: '服务器开小差啦~',
            type: 'warning'
          })
        }
      })
    },
    /**
     * 显示右侧弹窗
     */
    showDrawer: function () {
      this.isShowDrawer = true
      this.getGroupMemberList()
      console.log(this.account)
    },
    /**
     * 清空学号数组
     */
    clearAccount: function () {
      this.groupMemberList = []
    },
    /**
     * 显示排序窗口
     */
    showDialog: function () {
      this.isShowSortDialog = true
      this.sortList = []
    },
    /**
     * 排序选择时如果有重复，进行提示
     */
    getItem: function (key, value) {
      if (new Set(this.sortList).size !== this.sortList.length) {
        this.$message({
          message: '已选过此项！',
          type: 'warning'
        })
      }
    },
    /**
     * 返回下载地址
     */
    downloadUrl: function () {
      let tmp = []
      this.sortList.forEach((item) => {
        if (!tmp.includes(this.resultMap.get(item))) {
          tmp.push(this.resultMap.get(item))
        } else {
          this.$message({
            message: '存在重复值！',
            type: 'warning'
          })
          return false
        }
      })
      if (tmp.length === 0 || tmp.length !== this.result.length) {
        this.$message({
          message: '请先选择顺序！',
          type: 'warning'
        })
        return false
      }
      this.axios({
        method: 'POST',
        url: `${process.env.API_HOST}/DownloadTeamMemberInfo`,
        data: {
          token: this.global.token,
          accounts: this.account,
          attributions: tmp
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.data.status === 200) {
          this.excelUrl = res.data.data
          this.isShowSortDialog = false
          this.isShowCopyDialog = true
          this.getTextOutput()
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
    /**
     * 返回下载数据（str）
     */
    getTextOutput: function () {
      let tmp = []
      this.sortList.forEach((item) => {
        if (!tmp.includes(this.resultMap.get(item))) {
          tmp.push(this.resultMap.get(item))
        } else {
          this.$message({
            message: '存在重复值！',
            type: 'warning'
          })
          return false
        }
      })
      if (tmp.length === 0 || tmp.length !== this.result.length) {
        this.$message({
          message: '请先选择顺序！',
          type: 'warning'
        })
        return false
      }
      this.axios({
        method: 'POST',
        url: `${process.env.API_HOST}/OutPutTeamMemberInfo`,
        data: {
          token: this.global.token,
          accounts: this.account,
          attributions: tmp
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.data.status === 200) {
          let str = ''
          res.data.data.forEach((item) => {
            let tmp = item.join(' ') + '\n'
            str += tmp
          })
          this.outputText = str
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
    /**
     * 成功复制
     */
    successCopy: function (e) {
      this.$message({
        message: '已成功复制到粘贴板！',
        type: 'success'
      })
    },
    dirtDownload: function () {
      window.open(this.excelUrl)
    }
  }
}

</script>
<style scoped>
.group-title{
  text-align: center;
  font-weight: bold;
}
.group-title span{
  display: inline-block;
  margin-left: 50px;
  font-size: 18px;
}
.group-operate{
  text-align: center;
}
.group-operate .el-select{
  width:150px
}
.add-cell {
  padding: 15px 80px;
}
.add-cell .el-input {
  width: 400px;
}
.add-cell .el-select {
  width: 400px;
}
.el-button{
    width:150px;
    margin: 10px;
}
.checkbox-cell{
  padding: 10px 50px;
}
.member{
  margin: 60px auto;
  text-align: left;
  padding: 0 40px;
}
.add-btns {
  margin: 20px auto;
  text-align: center;
}
.output-btns{
  text-align: center;
}
.sort-container-btns{
  margin:20px auto;
  display: flex;
  justify-content: space-around;
}
.divider{
  width:100%;
  height: 1px;
  background-color: #000;
}
.group-container{
  height: 100%;
  overflow-y: hidden;
}
.content ::-webkit-scrollbar{
  display: none;
}
.content{
  border-right: 2px solid rgba(128, 138, 135,0.5);
}
.group-operate{
  position: fixed;
  right: 0;
}
.member-title{
  text-align: center;
  font-size:20px;
  font-weight: bold;
}
</style>
