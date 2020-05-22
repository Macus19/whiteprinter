<template>
  <div class="data-check-container">
    <el-col class="right-content">
      <el-tabs v-model="activeName" stretch>
        <el-tab-pane label="获奖经历" name="award">
          <div class="award-container">
            <award-item
              v-for="item in awardList"
              :key="item.eventId"
              :score="item.score"
              :tagList="item.tagList"
              :department="item.department"
              :eventId="item.id"
              :type="item.type"
              :title="item.title"
              :time="item.time"
            ></award-item>
          </div>
        </el-tab-pane>
        <el-tab-pane label="个人经历" name="person">
          <div class="person-container"></div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </div>
</template>

<script>
import AwardItem from '../component/AwardItem'

export default {
  data () {
    return {
      activeName: 'award',
      awardList: []
    }
  },

  components: {
    AwardItem
  },

  created: function () {
    this.getAwardList()
  },
  methods: {
    getAwardList: function () {
      this.axios({
        method: 'POST',
        url: '/api/getData',
        data: {
          student_id: this.global.account,
          student_password: this.global.key
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
        let eventList = res.data
        let itemList = []
        eventList.forEach(item => {
          let tmp = {
            id: item[6],
            type: item[8],
            title: item[7],
            tagList: [item[10], item[8]],
            time: item[11],
            department: item[9],
            score: item[12]
          }
          itemList.push(tmp)
        })
        this.awardList = itemList
        console.log(this.awardList)
      })
    }
  }
}
</script>
<style scoped>
</style>
