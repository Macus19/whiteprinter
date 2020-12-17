<template>
  <div class="add-container">
    <el-tabs v-model="activeName" stretch class="tabbar">
      <el-tab-pane label="个人活动">
        <!-- <div class="personal">
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
          <el-row class="add-cell"  v-if="activityType==='竞赛活动类'">
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
          <el-row class="add-cell"  v-if="activityType==='竞赛活动类'">
            <el-col :span="6">活动等级：</el-col>
            <el-col :span="18" class="add-cell-content">
              <el-select v-model="awardLevel" placeholder="请选择">
                <el-option v-for="item in awardLevelList" :key="item" :value="item"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="add-cell"  v-if="activityType==='竞赛活动类'">
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
           <el-row class="add-cell"  v-if="activityType==='学术论文类'">
            <el-col :span="6">第几作者：</el-col>
            <el-col :span="18" class="add-cell-content">
              <el-select v-model="writerLevel" placeholder="请选择">
                <el-option v-for="item in writerLevelList" :key="item" :value="item"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="add-cell">
            <el-col :span="6">综测分数：</el-col>
            <el-col :span="18" class="add-cell-content">
              <el-input v-model="score"></el-input>
            </el-col>
          </el-row>
          <div class="add-btns">
            <el-button type="success" @click="add">添加</el-button>
          </div>
        </div> -->
        <person-add></person-add>
      </el-tab-pane>
      <el-tab-pane label="团队活动">
        <group-add></group-add>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import GroupAdd from '../Add/components/GroupAdd'
import PersonAdd from '../Add/components/PersonAdd'

export default {
  data () {
    return {
    }
  },

  components: {
    GroupAdd, PersonAdd
  },
  created: function () {
  },
  methods: {
  }
}
</script>
<style scoped>
.tabbar >>>.el-tabs__header {
  padding:20px 0;
  font-size:18px;
}
.tabbar >>>.el-tabs__item {
  font-size:18px;
  line-height:30px;
}
</style>
