<template>
  <div class="output-container">
    <div class="output-tag-list">
      <el-row class="top-bar">
        <el-col :span="20">筛选类别：</el-col>
        <el-col :span="4" class="top-bar-menu">
        <el-tooltip class="item" effect="dark" content="筛选条目" placement="top-start">
          <i @click="showDrawer()" class="el-icon-menu"></i>
        </el-tooltip>
        </el-col>
      </el-row>
      <div class="choose-tags-content">
        <el-tag type="primary" v-for="(item, index) in chooseTags" :key="index">{{item}}</el-tag>
      </div>
    </div>
    <output-item
      v-for="(item) in showList"
      :key="item.eventId"
      :score="item.score"
      :indiJoin="item.indiJoin"
      :tagList="item.tagList"
      :isGroup="item.isGroup"
      :isEssay="item.isEssay"
      :department="item.department"
      :eventId="item.id"
      :type="item.type"
      :title="item.title"
      :essayJournal="item.essayJournal"
      :time="item.time"
    ></output-item>
    <el-drawer
      :visible.sync="isShowDrawer"
      direction="rtl"
      size="20%"
      :modal="false"
    >
      <el-checkbox-group v-model="result">
        <div class="checkbox-cell">
          <el-radio-group v-model="eventOwn" @change="test()">
            <el-radio  :label="-1">所有</el-radio>
            <el-radio  :label="0">个人</el-radio>
            <el-radio  :label="1">团队</el-radio>
          </el-radio-group>
        </div>
        <div class="checkbox-cell">
          <el-radio-group v-model="eventClass" @change="eventFilter()">
            <el-radio :label="-1">全部</el-radio>
            <el-radio :label="0">奖项</el-radio>
            <el-radio :label="1">论文</el-radio>
          </el-radio-group>
        </div>
        <div class="checkbox-cell">
          <el-checkbox label="姓名"></el-checkbox>
        </div>
        <div class="checkbox-cell">
          <el-checkbox label="班级"></el-checkbox>
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
          <el-checkbox label="电话"></el-checkbox>
        </div>
        <div class="checkbox-cell">
          <el-checkbox label="活动名字（奖项/论文）"></el-checkbox>
        </div>
        <div class="checkbox-cell" v-if="eventClass!=1">
          <el-checkbox label="颁发单位"></el-checkbox>
        </div>
        <div class="checkbox-cell">
          <el-checkbox label="综测分"></el-checkbox>
        </div>
        <div class="checkbox-cell" v-if="eventClass!=1">
          <el-checkbox label="获奖类别" @change="seeType()"></el-checkbox>
          <div>
            <el-tag :type="item.isChoosed?'success':'info'" @click="changeSituation($event)" :data-id="item.id" class="checkbox-tag" v-for="item in typeList" :key="item.id">{{item.value}}</el-tag>
          </div>
        </div>
        <div class="checkbox-cell" v-if="eventClass!=1">
          <el-checkbox label="活动奖项"></el-checkbox>
        </div>
        <div class="checkbox-cell" v-if="eventClass!=0">
          <el-checkbox label="发布期刊"></el-checkbox>
        </div>
        <div class="checkbox-cell" v-if="eventClass!=0">
          <el-checkbox label="第几作者"></el-checkbox>
        </div>
        <div class="checkbox-cell">
          <el-checkbox label="获奖级别" @change="seeLevel()"></el-checkbox>
          <div>
            <el-tag :type="item.isChoosed?'success':'info'" @click="changeLevelSituation($event)" :data-id="item.id" class="checkbox-tag" v-for="item in levelList" :key="item.id">{{item.value}}</el-tag>
          </div>
        </div>
        <div class="checkbox-cell">
          <el-checkbox label="获奖时间"></el-checkbox>
            <div class="checkbox-date">
              <el-date-picker
                v-model="beginTime"
                type="date"
                placeholder="开始时间"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </div>
            <div class="checkbox-date">
              <el-date-picker
                v-model="endTime"
                type="date"
                placeholder="结束时间"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </div>
        </div>
      </el-checkbox-group>
      <div class="output-btns">
        <el-button @click="showDialog()">确认筛选</el-button>
      </div>
    </el-drawer>
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
        <el-input class="preview" type="textarea" rows="10" v-model="outputText"></el-input>
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
import OutputItem from './OutputItem'

export default {
  data () {
    return {
      eventClass: -1,
      eventOwn: -1,
      isShowCopyDialog: false,
      isShowSortDialog: false,
      isShowDrawer: false,
      // 选中的标签
      chooseTags: [],
      // 筛选后的列表
      showList: [],
      // 获奖项目列表
      awardList: [],
      result: [],
      typeList: [
        {
          id: 0,
          isChoosed: false,
          value: '社会实践与服务'
        },
        {
          id: 1,
          isChoosed: false,
          value: '科技竞赛'
        },
        {
          id: 2,
          isChoosed: false,
          value: '文体活动'
        }
      ],
      levelList: [
        {
          id: 0,
          isChoosed: false,
          value: '院级'
        },
        {
          id: 1,
          isChoosed: false,
          value: '校级'
        },
        {
          id: 2,
          isChoosed: false,
          value: '市级'
        },
        {
          id: 3,
          isChoosed: false,
          value: '省级'
        },
        {
          id: 4,
          isChoosed: false,
          value: '国家级'
        }
      ],
      chooseLevel: [],
      beginTime: '',
      endTime: '',
      tableLink: '',
      sortList: [],
      awardCategoryList: ['社会实践与服务', '科技竞赛', '文体活动'],
      mapList: {
        '姓名': 'name',
        '联系方式': 'phoneNumber',
        '生日': 'birthday',
        '学校': 'school',
        '学院': 'deptName',
        '专业': 'major',
        '年级': 'grade',
        '电话': 'phoneNumber',
        '班级': 'class',
        '活动名字（奖项/论文）': 'eventName',
        '颁发单位': 'awardUnit',
        '获奖类别': 'awardCategory',
        '获奖级别': 'eventRank',
        '获奖时间': 'eventTime',
        '团队名字': 'teamJoin',
        '活动奖项': 'awardSet',
        '发布期刊': 'essayJournal',
        '第几作者': 'essayAuthor',
        '综测分': 'testScore'
      },
      outputText: '',
      excelUrl: ''
    }
  },
  components: {
    OutputItem
  },
  created: function () {
    this.getEventList()
  },
  watch: {
  },
  methods: {
    test: function () {
      this.eventFilter()
    },
    seeLevel: function () {
      if (!this.result.includes('获奖级别')) {
        this.levelList.forEach((item) => {
          item.isChoosed = false
        })
        this.chooseLevel = []
      }
    },
    seeType: function () {
      if (!this.result.includes('获奖类别')) {
        this.typeList.forEach((item) => {
          item.isChoosed = false
        })
        this.chooseTags = []
      }
    },
    changeSituation: function (e) {
      if (!this.result.includes('获奖类别')) {
        this.$message({
          message: '尚未勾选！',
          type: 'warning'
        })
      } else {
        let currentId = e.target.dataset.id
        this.$set(this.typeList[currentId], 'isChoosed', !this.typeList[currentId].isChoosed)
        let temp = []
        this.typeList.forEach((item) => {
          if (item.isChoosed) {
            temp.push(item.value)
          }
        })
        this.chooseTags = temp
        this.eventFilter()
      }
    },
    getEventList: function () {
      this.axios({
        method: 'POST',
        url: `${process.env.API_HOST}/getData`,
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
      }).then(res => {
        if (res.data.status === 200) {
          let eventList = res.data.data
          let itemList = []
          eventList.forEach(item => {
            let tmp = {
              id: item.eventId,
              type: this.awardCategoryList[item.awardCategory] || '论文',
              title: item.eventName,
              tagList: [item.eventRank, item.awardSet || item.essayJournal],
              isGroup: item.teamJoin !== null,
              // eslint-disable-next-line no-unneeded-ternary
              isEssay: item.essayId ? true : false,
              essayJournal: item.essayJournal || null,
              indiJoin: item.indiJoin,
              time: item.eventTime.substring(0, 10),
              department: item.awardUnit,
              score: item.testScore
            }
            itemList.push(tmp)
          })
          this.awardList = itemList
          this.showList = itemList
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
    changeLevelSituation: function (e) {
      if (!this.result.includes('获奖级别')) {
        this.$message({
          message: '尚未勾选！',
          type: 'warning'
        })
      } else {
        let currentId = e.target.dataset.id
        this.$set(this.levelList[currentId], 'isChoosed', !this.levelList[currentId].isChoosed)
        let temp = []
        this.levelList.forEach((item) => {
          if (item.isChoosed) {
            temp.push(item.value)
          }
        })
        this.chooseLevel = temp
      }
    },
    eventFilter: function () {
      console.log(this.eventClass)
      console.log(this.eventOwn)
      if (this.chooseTags.length === 0 && this.eventOwn === -1 && this.eventClass === -1) {
        this.showList = this.awardList
      } else {
        let tmp = this.awardList.filter((item) => {
          if (this.eventOwn === 0 && this.eventClass === 0) {
            return item.isGroup !== true && item.isEssay !== true
          } else if (this.eventOwn === 0 && this.eventClass === 1) {
            return item.isGroup !== true && item.isEssay === true
          } else if (this.eventOwn === 0 && this.eventClass === -1) {
            return item.isGroup !== true
          } else if (this.eventOwn === 1 && this.eventClass === 0) {
            return item.isGroup === true && item.isEssay !== true
          } else if (this.eventOwn === 1 && this.eventClass === 1) {
            return item.isGroup === true && item.isEssay === true
          } else if (this.eventOwn === 1 && this.eventClass === -1) {
            return item.isGroup === true
          } else if (this.eventOwn === -1 && this.eventClass === 0) {
            return item.isEssay !== true
          } else if (this.eventOwn === -1 && this.eventClass === 1) {
            return item.isEssay === true
          } else {
            return this.awardList
          }
        })
        let temp = tmp
        if (this.chooseTags.length > 0) {
          temp = tmp.filter((item) => {
            return this.chooseTags.includes(item.type) || item.isEssay
          })
        }
        this.showList = temp
        // console.log(tmp)
      }
    },
    showDrawer: function () {
      this.isShowDrawer = true
    },
    showDialog: function () {
      this.isShowSortDialog = true
      this.sortList = []
    },
    getItem: function (key, value) {
      // 如果set集合的长度不等于选中字段数组的长度，则证明存在重复项
      if (new Set(this.sortList).size !== this.sortList.length) {
        this.$message({
          message: '存在重复项！',
          type: 'warning'
        })
      }
    },
    getTextOutput: function () {
      let tmp = []
      this.sortList.forEach((item) => {
        if (!tmp.includes(this.mapList[item])) {
          tmp.push(this.mapList[item])
        } else {
          this.$message({
            message: '存在重复值！',
            type: 'warning'
          })
          return false
        }
      })
      // 没选择或者存在没有选择的空picker，返回并提示
      if (tmp.length === 0 || tmp.length !== this.result.length) {
        this.$message({
          message: '请先选择顺序！',
          type: 'warning'
        })
        return false
      }
      let timeEvent = [this.beginTime, this.endTime]
      if (this.endTime === '' || this.beginTime === '') {
        timeEvent = []
      }
      console.log(tmp)
      if (this.eventOwn === -1) {
        this.eventOwn = ''
      }
      if (this.eventClass === -1) {
        this.eventClass = ''
      }
      let awardCategory = []
      this.chooseTags.forEach((item) => {
        awardCategory.push(this.awardCategoryList.indexOf(item))
      })
      this.axios({
        method: 'POST',
        url: `${process.env.API_HOST}/OutputData`,
        data: {
          token: this.global.token,
          attributions: tmp,
          eventOwn: this.eventOwn,
          eventClass: this.eventClass,
          eventTime: timeEvent,
          awardCategory: awardCategory
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
    successCopy: function (e) {
      this.$message({
        message: '已成功复制到粘贴板！',
        type: 'success'
      })
    },
    downloadUrl: function () {
      let tmp = []
      this.sortList.forEach((item) => {
        if (!tmp.includes(this.mapList[item])) {
          tmp.push(this.mapList[item])
        } else {
          this.$message({
            message: '存在重复值！',
            type: 'warning'
          })
          return false
        }
      })
      console.log(tmp)
      console.log(this.result)
      if (tmp.length === 0 || tmp.length < this.result.length) {
        this.$message({
          message: '请先选择正确顺序！',
          type: 'warning',
          offset: 50
        })
        return false
      }
      let timeEvent = [this.beginTime, this.endTime]
      if (this.endTime === '' || this.beginTime === '') {
        timeEvent = []
      }
      console.log(tmp)
      if (this.eventOwn === -1) {
        this.eventOwn = ''
      }
      if (this.eventClass === -1) {
        this.eventClass = ''
      }
      let awardCategory = []
      this.chooseTags.forEach((item) => {
        awardCategory.push(this.awardCategoryList.indexOf(item))
      })
      this.axios({
        method: 'POST',
        url: `${process.env.API_HOST}/DownloadEventData`,
        data: {
          token: this.global.token,
          attributions: tmp,
          eventOwn: this.eventOwn,
          eventClass: this.eventClass,
          eventTime: timeEvent,
          awardCategory: awardCategory
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
    dirtDownload: function () {
      window.open(this.excelUrl)
    }
  }
}
</script>
<style scoped>
.output-container {
  height: 100%;
  overflow-y: scroll;
}
.el-icon-menu{
  font-size:36px;
}
.item{
  padding:10px 20px 0 20px;
}
.top-bar{
  padding: 20px;
}
.choose-tags-content {
  padding: 0px 20px;
}
.choose-tags-content .el-tag{
  margin: 5px 10px 0 0;
}
.top-bar-menu {
  text-align: right;
  cursor: pointer;
}
.checkbox-cell{
  padding: 10px 50px;
}
.checkbox-tag{
  margin: 5px 10px 0 0;
  cursor: pointer;
}
.output-container /deep/ .el-drawer.rtl{
  overflow-y: scroll;
}
.output-container /deep/ .el-drawer.rtl::-webkit-scrollbar{
    display: none;
}
.checkbox-date{
  padding: 5px 0;
}
.output-btns{
  text-align: center;
}
.sort-container-btns{
  margin:20px auto;
  display: flex;
  justify-content: space-around;
}
.copy-container-btns{
  display: flex;
  justify-content: space-around;
}
.preview{
  white-space: pre;
}
</style>
