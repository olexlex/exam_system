<template>
  <div id="resDetail">
    <div id="resTopMenu">
      <router-link to="resultList"
        ><i class="el-icon-arrow-left"></i
      ></router-link>
    </div>
    <div id="main">
      <div id="resMidAnaly">
        <div id="circle">
          <el-progress
            type="circle"
            :percentage="parseInt(this.TotoalScore / this.QNum * 100)"
          ></el-progress>
        </div>
        {{ testName }}
        得分：{{ TotoalScore }}

        <div id="byType">
          <div id="perbyType">
            <div id="singleResAnaly">
              单选题：{{ singleScore }}分
              <div id="progressBar">
                <div v-if="singleScore / singleNum < 0.5">
                  <el-progress :text-inside="true" :stroke-width="20" :percentage="(singleScore / singleNum * 100).toFixed(1)" status="exception"></el-progress>
                </div>
                <div
                  v-if="
                    (singleScore / singleNum >= 0.5) &
                    (singleScore / singleNum < 1)
                  "
                >
                <el-progress :text-inside="true" :stroke-width="20" :percentage="(singleScore / singleNum * 100).toFixed(1)"></el-progress>
                  <!-- <el-progress
                    :percentage="(singleScore / singleNum) * 100"
                  ></el-progress> -->
                </div>
                <div v-if="singleScore / singleNum == 1">
                  <el-progress :text-inside="true" :stroke-width="20" :percentage="(singleScore / singleNum * 100).toFixed(1)" status="success"></el-progress>
                </div>
              </div>
            </div>
            <div id="multipleResAnaly">
              多选题：{{ multipleScore }}分
              <div id="progressBar">
                <div v-if="multipleScore / multipleNum < 0.5">
                  <el-progress :text-inside="true" :stroke-width="20" :percentage="(multipleScore / multipleNum* 100).toFixed(1) " status="exception"></el-progress>
                </div>
                <div
                  v-if="
                    (multipleScore / multipleNum >= 0.5) &
                    (multipleScore / multipleNum < 1)
                  "
                >
                <el-progress :text-inside="true" :stroke-width="20" :percentage="(multipleScore / multipleNum* 100).toFixed(1) "></el-progress>
                  <!-- <el-progress
                    :percentage="(multipleScore / multipleNum) * 100"
                  ></el-progress> -->
                </div>
                <div v-if="multipleScore / multipleNum == 1">
                  <el-progress :text-inside="true" :stroke-width="20" :percentage="(multipleScore / multipleNum* 100).toFixed(1) " status="success"></el-progress>
                </div>
              </div>
            </div>
            <div id="judgeResAnaly">
              判断题：{{ judgeScore }}分
              <div id="progressBar">
                <div v-if="judgeScore / judgeNum < 0.5">
                  <el-progress :text-inside="true" :stroke-width="20" :percentage="(judgeScore / judgeNum* 100) .toFixed(1)" status="exception"></el-progress>
                </div>
                <div
                  v-if="
                    (judgeScore / judgeNum >= 0.5) & (judgeScore / judgeNum < 1)
                  "
                >
                <el-progress :text-inside="true" :stroke-width="20" :percentage="(judgeScore / judgeNum* 100) .toFixed(1)"></el-progress>
                  <!-- <el-progress
                    :percentage="(judgeScore / judgeNum) * 100"
                  ></el-progress> -->
                </div>
                <div v-if="judgeScore / judgeNum == 1">
                   <el-progress :text-inside="true" :stroke-width="20" :percentage="(judgeScore / judgeNum* 100) .toFixed(1)" status="success"></el-progress>
                </div>
              </div>
            </div>
            <div id="ansResAnaly">
              简答题：{{ ansScore.toFixed(1) }}分
              <div id="progressBar">
                <div v-if="ansScore / ansNum < 0.5">
                   <el-progress :text-inside="true" :stroke-width="20" :percentage="(ansScore / ansNum* 100).toFixed(1) " status="exception"></el-progress>
                </div>
                <div
                  v-if="(ansScore / ansNum >= 0.5) & (ansScore / ansNum < 1)"
                >
                <el-progress :text-inside="true" :stroke-width="20" :percentage="(ansScore / ansNum* 100).toFixed(1)"></el-progress>
                  <!-- <el-progress
                    :percentage="(ansScore / ansNum) * 100"
                  ></el-progress> -->
                </div>
                <div v-if="ansScore / ansNum == 1">
                  <el-progress :text-inside="true" :stroke-width="20" :percentage="(ansScore / ansNum* 100).toFixed(1)" status="success"></el-progress>
                </div>
              </div>
            </div>
          </div>
          <el-button round @click="showmore2()">分析错题</el-button>
        </div>
      </div>

      <div id="resBottomShow"></div>
    </div>
  </div>
</template>



<script>
export default {
  name: "resDetailList",
  data() {
    return {
      QNum: null,
      testName: null,

      testID: null,
      Qlist: [], //保存题目列表（包含正确答案
      Alist: [], //保存作答结果列表（用户做出的选择
      singleNum: 0,
      multipleNum: 0,
      judgeNum: 0,
      ansNum: 0,
      singleScore: 0,
      multipleScore: 0,
      judgeScore: 0,
      ansScore: 0,
      TotoalScore: 0,
      WrongQ: [], //记录错误题的index
    };
  },

  created() {
    this.processData()
  },
  methods: {
    //首先获取获取整张试卷的数据
    //然后遍历统计每一项的得分，存入对应的变量
    getAnswers() {
      return this.$axios
        .get(`/paper/${this.testID}/answer`, {
          params: {},
        })
    },
    getQuests() {
      return this.$axios
        .get(`/quest/paper/${this.testID}`, {
          params: {},
        })
    },
    getInfo() {
      return this.$axios
        .get(`/paper/${this.testID}`, {
          params: {},
        })
    },
    async processData() {
      this.testID = this.$route.query.testID;
      let res = await this.getAnswers()
      this.Alist = res.data.data.answers
      res = await this.getQuests()
      this.Qlist = res.data.data
      res = await this.getInfo()
      this.QNum = res.data.data.questNum
      this.testName = res.data.data.name
      // console.log(res)
      //先获取每个题型对应的题目数量
      this.Qlist.filter((entity) => entity.typeId == 1).forEach(() => {
        this.singleNum++;
      }),
        this.Qlist.filter((entity) => entity.typeId == 2).forEach(() => {
          this.multipleNum++;
        }),
        this.Qlist.filter((entity) => entity.typeId == 3).forEach(() => {
          this.judgeNum++;
        }),
        this.Qlist.filter((entity) => entity.typeId == 4).forEach(() => {
          this.ansNum++;
        });
      //统计正确题目数量
      //Qlist中的answer 和Alist中的questAnswer
      //n从0开始表示当前题号的偏移量
      let n = 0;
      //单选
      while (n < this.singleNum) {
        if (this.Qlist[n].answer == this.Alist[n].questAnswer)
          this.singleScore++;
        else this.WrongQ.push(n);
        n++;
      }
      //多选
      while (n < this.singleNum + this.multipleNum) {
        if (this.Qlist[n].answer == this.Alist[n].questAnswer)
          this.multipleScore++;
        else this.WrongQ.push(n);
        n++;
      }
      //判断
      while (n < this.singleNum + this.multipleNum + this.judgeNum) {
        if (this.Qlist[n].answer == this.Alist[n].questAnswer)
          this.judgeScore++;
        else this.WrongQ.push(n);
        n++;
      }
      //简答
      while (
        n <
        this.singleNum + this.multipleNum + this.judgeNum + this.ansNum
      ) {
        // if (this.Qlist[n].answer == this.Alist[n].questAnswer) this.ansScore++;
        // else this.WrongQ.push(n);
        // n++;
        let point=0;
        this.$axios.get(`paper/shortAnswerJudge/${this.testID}/question/${this.Qlist[n].id}`)
        .then(res=>{
          console.log(res)
          point=res.data.data.point
          // console.log(point)
          this.ansScore+=point/100;
        },
        err=>{
          console.log(err);
        });
        this.WrongQ.push(n);
        n++;
      }
      //计算总分
      this.TotoalScore =
        this.singleScore + this.multipleScore + this.judgeScore + this.ansScore;

      // this.$router.push({
      //   name: "resultList",
      //   params: {
      //     TotoalScore: this.TotoalScore
      //   },
      // });
    },
    showmore2() {
      this.$router.push({
        name: "wrongQ",
        params: {
          WrongQ: this.WrongQ,
          Qlist: this.Qlist,
          Alist: this.Alist,
          singleNum: this.singleNum,
          multipleNum: this.multipleNum,
          judgeNum: this.judgeNum,
          ansNum: this.ansNum,
          testID: this.testID
        },
      });
    },
  },
};
</script>


<style>
#resDetail {
  /* background-color: #eee; */
  margin: 0px 10px;
  margin-top: 20px;

  
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  padding: 20px;
}
#resTopMenu {
  margin-left: 10px;
  margin-top: 5px;
  font-size: 20px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
}
#resMidAnaly {
  margin: 0PX auto;
}
#resMidAnaly #circle {
  margin-bottom: 10px;
}
#resMidAnaly #perbyType {
  margin-top: 20px;
  margin-bottom: 10px;
  padding-left: 30%;
  padding-right: 30%;
  width:40%;
}
#progressBar{
  margin-top:5px;
  margin-bottom:5px;
}
#resBottomShow {
  margin-bottom: 10px;
}
</style>