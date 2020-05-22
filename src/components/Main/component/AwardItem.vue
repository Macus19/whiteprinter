<template>
  <div class="award-item-container">
    <!-- 获奖类型 -->
    <div class="award-item-type">{{type}}</div>
    <!-- 标题 -->
    <div class="award-item-title">
      <el-row>
        <el-col :span="23">{{title}}</el-col>
        <el-col :span="1" class="award-item-icon">
          <i class="el-icon-circle-close"></i>
        </el-col>
      </el-row>
    </div>
    <!-- 折叠面板 -->
    <el-collapse>
      <el-collapse-item name="1">
        <template slot="title">
          <i class="el-icon-medal"></i>
        </template>
        <div class="collapse-container">
          <!-- 标签 -->
          <el-tag type="success" v-for="(item, index) in tagList" :key="index">{{item}}</el-tag>
          <!-- 获奖时间 -->
          <p class="collapse-time">获奖时间：{{time}}</p>
          <!-- 颁奖部门 -->
          <p class="collapse-award-department">奖项授予单位：{{department}}</p>
          <p class="collapse-score">综测分：{{score}}</p>
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
  props: ['title', 'eventId', 'type', 'tagList', 'time', 'department', 'score'],
  components: {},
  methods: {}
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
}
.award-item-icon{
  text-align: right;
}
.collapse-container .el-tag{
  margin: 5px 10px 0 0;
}
.collapse-container p{
  margin: 10px 0 0 0;
}
</style>
