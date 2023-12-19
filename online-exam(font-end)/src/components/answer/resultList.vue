<template>
  <div id="result">
    <div id="testEntity" v-for="(value, index) in FinishedresList" :key="index">
      <el-descriptions
        class="margin-top"
        :title="value.name"
        :column="2"
        border
      >
        <template slot="extra">
          <el-button type="primary" size="small" @click.stop="showmore(value.id)"
            >查看详情</el-button
          >
            <!--点击之后要传递value.id-->
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            用户名
          </template>
          {{username}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            试卷ID
          </template>
          {{ value.id }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-timer"></i>
            提交时间
          </template>
          {{ value.endTime }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            专业方向
          </template>
          <el-tag size="small">{{ value.major1Name }}</el-tag>
          <el-tag size="small">{{ value.major2Name }}</el-tag>
          <!-- <el-tag size="small">{{ value.major3 }}</el-tag> -->
        </el-descriptions-item>
        
      </el-descriptions>
    </div>
  </div>
</template>

<script>
export default {
  name: "resultList",
  data() {
    return {
      username:localStorage.username,
      userId: "",
      resList: [
      ],
      TotoalScore:0,
    };
  },
  computed: {
    FinishedresList: function () {
      return this.resList.filter((entity) => entity.isEnded);
    },
  },
  created() {
    this.getResData();
  },
  methods: {
    getResData() {
      //this.TotoalScore=this.$route.params.TotoalScore;
      //console.log(this.TotoalScore);
      this.userId = localStorage.id; 
      //考试列表
      this.$axios
        .get(`/paper/user/${localStorage.id}`, {
          params: {},
        })
        .then(
          (res) => {
            console.log(res.data)
            let resData = res.data;
            this.resList = resData.data;
          },
          (err) => {
            console.log(err);
          }
        );
    },
    showmore(e) {
      
       this.$router.push({
        path: "/resDetailList",
        query: {
          testID: e,
        },
      }).then(res => {})
     
      
    },
  },
};
</script>

<style>
#result {
  background-color: rgb(255, 255, 255);
  padding: 20px;
  margin-top: 20px;
  margin-left: 10px;
  width: 90%;
}
#testEntity {
  padding: 10px;
  border: solid rgba(0, 0, 0, 0.104);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin: 10px;
}
</style>