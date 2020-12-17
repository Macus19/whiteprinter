<template>
  <div class="data-check-container">
   <el-row>
    <el-col :span="17" class="right-content">
      <el-tabs v-model="activeName" stretch class="tabbar">
        <el-tab-pane label="奖项" name="award">
          <div class="award-container">
            <award-item
              @reflash="getAwardList()"
              v-for="item in awardList"
              :key="item.eventId"
              :indiJoin="item.indiJoin"
              :score="item.score"
              :tagList="item.tagList"
              :department="item.department"
              :isGroup="item.isGroup"
              :isEssay="item.isEssay"
              :eventId="item.id"
              :type="item.type"
              :title="item.title"
              :essayJournal="item.essayJournal"
              :time="item.time"
            ></award-item>
          </div>
        </el-tab-pane>
        <el-tab-pane label="论文" name="person">
          <div class="award-container">
            <award-item
              @reflash="getAwardList()"
              v-for="item in paperList"
              :eventClass="item.eventClass"
              :key="item.eventId"
              :indiJoin="item.indiJoin"
              :score="item.score"
              :tagList="item.tagList"
              :department="item.department"
              :isGroup="item.isGroup"
              :isEssay="item.isEssay"
              :eventId="item.id"
              :type="item.type"
              :title="item.title"
              :essayJournal="item.essayJournal"
              :time="item.time"
            ></award-item>
          </div>
        </el-tab-pane>
        <el-tab-pane label="专利" name="patent">
          <div class="award-container">
            <award-item
              @reflash="getAwardList()"
              v-for="item in patentList"
              :eventClass="item.eventClass"
              :key="item.eventId"
              :applicant="item.applicant"
              :registerNumber="item.registerNum"
              :indiJoin="item.indiJoin"
              :score="item.score"
              :tagList="item.tagList"
              :department="item.department"
              :isGroup="item.isGroup"
              :eventId="item.id"
              :type="item.type"
              :title="item.title"
              :time="item.time"
            ></award-item>
          </div>
        </el-tab-pane>
        <el-tab-pane label="项目" name="project">
          <div class="award-container">
            <award-item
              @reflash="getAwardList()"
              v-for="item in projectList"
              :eventClass="item.eventClass"
              :principal="item.principal"
              :timeBegin="item.timeBegin"
              :timeOver="item.timeOver"
              :appliedAmount="item.appliedAmount"
              :key="item.eventId"
              :indiJoin="item.indiJoin"
              :score="item.score"
              :tagList="item.tagList"
              :department="item.department"
              :isGroup="item.isGroup"
              :eventId="item.id"
              :type="item.type"
              :title="item.title"
              :time="item.time"
            ></award-item>
          </div>
        </el-tab-pane>
        <el-tab-pane label="经历" name="experience">
          <div class="award-container">
            <award-item
              @reflash="getAwardList()"
              v-for="item in experienceList"
              :eventClass="item.eventClass"
              :key="item.eventId"
              :indiJoin="item.indiJoin"
              :score="item.score"
              :tagList="item.tagList"
              :department="item.department"
              :isGroup="item.isGroup"
              :eventId="item.id"
              :type="item.type"
              :title="item.title"
              :content="item.content"
              :time="item.time"
            ></award-item>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="7">
      <div class="statis-container">
        <p class="statis-title">你的小鲸鱼统计栏</p>
        <div class="statis-top">
          <p class="info-list">
            <span>上次登录时间：</span>
            <span>{{userLoginInfo.last_loading}}</span>
          </p>
          <p class="info-list">
            <span>鲸龄：</span>
            <span>{{userLoginInfo.till_time}}</span>
          </p>
        </div>
        <div class="statis-middle">
          <p class="statis-middle-title">筛选统计时间</p>
          <div class="time-pickers">
            <el-date-picker
             v-model="beginDate"
             type="date"
             value-format="yyyy-MM-dd"
            ></el-date-picker>
            <div>---</div>
            <el-date-picker
             v-model="endDate"
             type="date"
             value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="btns-container">
            <el-button type="success" size="small" @click="getUserStatis()">统计</el-button>
          </div>
          <div class="statis-bottom">
            <p class="info-list">
              <span>综测总分：</span>
              <span>{{userStatis.Total_scores}}分</span>
            </p>
            <p class="info-list">
              <span>总共参与活动数量：</span>
              <span>{{userStatis.Total_activity}}项</span>
            </p>
            <p class="info-list">
              <span>个人奖项数：</span>
              <span>{{userStatis.Total_ind_award}}项</span>
            </p>
            <div class="detail-list">
              <ul>
                <li>社会服务：{{userStatis.Total_ind_award_so}}项</li>
                <li>学术竞赛：{{userStatis.Total_ind_award_it}}项</li>
                <li>文体活动：{{userStatis.Total_ind_award_en}}项</li>
              </ul>
            </div>
            <p class="info-list">
              <span>个人论文数：</span>
              <span>{{userStatis.Total_ind_essay}}项</span>
            </p>
            <p class="info-list">
              <span>团队奖项数：</span>
              <span>{{userStatis.Total_team_award}}项</span>
            </p>
            <div class="detail-list">
              <ul>
                <li>社会服务：{{userStatis.Total_team_award_so}}项</li>
                <li>学术竞赛：{{userStatis.Total_team_award_so}}项</li>
                <li>文体活动：{{userStatis.Total_team_award_so}}项</li>
              </ul>
            </div>
            <p class="info-list">
              <span>团队论文数：</span>
              <span>{{userStatis.Total_team_eassy}}项</span>
            </p>
          </div>
        </div>
      </div>
    </el-col>
    <div class="data-check-add-btns" @click="turnToAddPage()">
      +
      <el-tag type="primary" class="hover-tip">添加项目</el-tag>
    </div>
  </el-row>
  </div>
</template>

<script>
import AwardItem from '../component/AwardItem'

export default {
  data () {
    return {
      activeName: 'award',
      projectItemList: [],
      types: ['竞赛活动', '学术论文', '专利', '项目', '经历'],
      beginDate: `${new Date().getFullYear() - 1}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
      endDate: new Date().toLocaleDateString().replace(/\//g, '-'),
      awardCategoryList: ['社会实践与服务', '科技竞赛', '文体活动'],
      userStatis: {
      },
      userLoginInfo: {
      }
    }
  },
  components: {
    AwardItem
  },
  computed: {
    awardList: function () {
      return this.projectItemList.filter((item) => {
        return item.eventClass === 0
      })
    },
    paperList: function () {
      return this.projectItemList.filter((item) => {
        return item.eventClass === 1
      })
    },
    patentList: function () {
      return this.projectItemList.filter((item) => {
        return item.eventClass === 2
      })
    },
    projectList: function () {
      return this.projectItemList.filter((item) => {
        return item.eventClass === 3
      })
    },
    experienceList: function () {
      return this.projectItemList.filter((item) => {
        return item.eventClass === 4
      })
    }
  },

  created: function () {
    this.getAwardList()
    this.getLoginInfo()
    this.getUserStatis()
  },
  methods: {
    getAwardList: function () {
      this.axios({
        method: 'POST',
        url: `${process.env.API_HOST}/getData`,
        data: {
          token: this.global.token
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
          let eventList = res.data.data
          console.log(res.data.data)
          let itemList = []
          eventList.forEach(item => {
            console.log(item.timeOver)
            let tmp = {
              id: item.eventId,
              eventClass: item.eventClass,
              type: this.awardCategoryList[item.awardCategory] || this.types[item.eventClass],
              title: item.eventName,
              isGroup: item.teamJoin !== null,
              // eslint-disable-next-line no-unneeded-ternary
              isEssay: item.essayId ? true : false,
              essayJournal: item.essayJournal || null,
              tagList: [item.eventRank, item.awardSet],
              indiJoin: item.indiJoin,
              time: item.eventTime.substring(0, 10),
              department: item.awardUnit || `此项为${this.types[item.eventClass]}，无授予单位！`,
              appliedAmount: item.appliedAmount || null,
              applicant: item.applicant || null,
              registerNumber: item.registerNumber || null,
              principal: item.principal || null,
              timeBegin: item.timeBegin || null,
              timeOver: item.timeOver || null,
              content: item.content || null,
              score: item.testScore
            }
            console.log(tmp)
            itemList.push(tmp)
          })
          this.projectItemList = itemList
          console.log(itemList)
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
    turnToAddPage: function () {
      this.$router.push('/add')
    },
    getUserStatis: function () {
      let eventTime = []
      if (this.beginDate !== null && this.endDate !== null) {
        eventTime = [this.beginDate, this.endDate]
      }
      this.axios({
        method: 'POST',
        url: `${process.env.API_HOST}/getStatis`,
        data: {
          token: this.global.token,
          eventTime: eventTime
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.data.status === 200) {
          this.userStatis = res.data.data
        } else {
          this.$message({
            message: '获取信息出错！',
            type: 'info'
          })
        }
      })
    },
    getLoginInfo: function () {
      this.axios({
        method: 'POST',
        url: `${process.env.API_HOST}/getLoginInfo`,
        data: {
          token: this.global.token
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
          this.userLoginInfo = res.data.data
        } else {
          this.$message({
            message: '获取信息出错！',
            type: 'info'
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.data-check-container{
  height: 100%;
  overflow: hidden;
}
.tabbar ::-webkit-scrollbar {
  display: none;
}
.tabbar >>> .el-tabs__content{
  height: 87.5vh;
  flex-grow: 1;
  overflow-y: scroll;
}
.tabbar >>>.el-tabs__header {
  padding:20px 0;
  font-size:18px;
}
.tabbar >>>.el-tabs__item {
  font-size:18px;
  line-height:30px;
}
.data-check-add-btns{
  width:70px;
  height: 70px;
  border:1px solid #808080;
  border-radius: 50%;
  text-align: center;
  line-height: 65px;
  vertical-align: middle;
  color: #fff;
  background-color: #428cb9;
  position: fixed;
  right: 500px;
  bottom: 70px;
  cursor: pointer;
  font-size: 50px;
}
.data-check-add-btns:hover .hover-tip{
  display: block;
}
.person-container{
  text-align: center;
}
.hover-tip{
  font-size:18px;
  position: absolute;
  top:75px;
  left: -10px;
  display: none;
}
.time-pickers{
  display: flex;
  justify-content: space-around;
  line-height: 35px;
}
.statis-middle >>>.el-date-editor.el-input{
  width:150px;
}
.statis-container{
  height: 100%;
}
.info-list{
  padding: 0 40px;
  text-align: left;
  /* display: flex;
  justify-content: space-between; */
}
.btns-container{
  margin: 10px auto;
  text-align: center;
}
.statis-title{
  font-weight: bold;
  font-size: 20px;
  text-align: center;
}
.statis-middle-title{
  text-align: center;
  font-weight: bold;
}
.detail-list{
  text-align: left;
  padding: 0 40px;
}
.right-content{
  height: 100%;
  border-right: 2px solid rgba(128, 138, 135,0.5);
}
</style>
