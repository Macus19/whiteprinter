<template>
  <div class="output-item-container">
    <!-- 获奖类型 -->
    <div class="output-item-type">{{isEssay ? '论文':'获奖'}}</div>
    <!-- 标题 -->
    <div class="output-item-title">
      {{title}}
    </div>
        <div class="collapse-container">
          <!-- 标签 -->
          <el-tag type="warning" v-for="(item, index) in tagList" :key="index">{{item}}</el-tag>
          <!-- 获奖时间 -->
          <p class="collapse-time">获奖时间：{{time}}</p>
          <!-- 颁奖部门 -->
          <p v-if="!isEssay" class="collapse-award-department">奖项授予单位：{{department}}</p>
          <p v-if="isEssay" class="collapse-award-department">发布：{{essayJournal}}</p>
          <p v-if="indiJoin.length>0">参与成员:
            <el-tag type="info" v-for="(item, index) in indiJoin" :key="index">{{item}}</el-tag>
          </p>
          <p class="collapse-award-department">分类：{{type}}</p>
          <p class="collapse-score">综测分：{{score}}</p>
        </div>
  </div>
</template>

<script>
export default {
  name: 'OutputItem',
  data () {
    return {
    }
  },
  props: ['title', 'eventId', 'type', 'tagList', 'time', 'department', 'score', 'isGroup', 'isEssay', 'essayJournal', 'indiJoin'],
  components: {},

  methods: {}
}

</script>
<style scoped>
.output-item-container{
  padding:10px 20px;
  margin: 5px auto;
  border-bottom: 1px solid #eeeeee;
}
.output-item-type{
  padding: 10px 0;
}
.output-item-title{
  padding: 10px 0;
  font-weight: bold;
}
.collapse-container{
  font-size: 13px;
  color: #808080;
}
.collapse-container .el-tag{
  margin: 5px 10px 0 0;
}
</style>
