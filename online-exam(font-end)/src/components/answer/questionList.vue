<template>
  <div class="answer">
    <!--题目流-->
    <div class="ansleft">
      <div id="name">{{ testName }}</div>
      <div id="testInfo">
        <p>
          <span style="font-weight: 600">考试开始时间：</span>
          {{ BeginTime }}<br />
          <span style="font-weight: 600">考试内容：</span>
          {{ major1 }}  {{ major2 }}  <br />
          <span style="font-weight: 600">本次考试共：</span>
          {{ totalQes }} 题
        </p>
      </div>

      <!--具体题目列表-->
      <div class="QList">
        <h3>第一部分：单选题</h3>
        <!--单选题-->
        <div>
          <div id="Single" v-for="(value, index) in qesList1" :key="index">
            <!--题干-->
            <div id="contentDiscribe">
              <!-- <i
              class=" el-icon-arrow-right"
              style="margin-right: 15px; font-size: 30px; color: orange"
            ></i> -->
              <span id="contentNumber">{{ parseInt(index) + 1 }}. </span>
              <span id="content">{{ value.description }}</span>
            </div>

            <div id="choiceDiscribe">
              <p v-show="value.selectionNum - 0 > 0">
                A. {{ value.selectionA }}
              </p>
              <p v-show="value.selectionNum - 1 > 0">
                B. {{ value.selectionB }}
              </p>
              <p v-show="value.selectionNum - 2 > 0">
                C. {{ value.selectionC }}
              </p>
              <p v-show="value.selectionNum - 3 > 0">
                D. {{ value.selectionD }}
              </p>
              <p v-show="value.selectionNum - 4 > 0">
                E. {{ value.selectionE }}
              </p>
              <p v-show="value.selectionNum - 5 > 0">
                F. {{ value.selectionF }}
              </p>
            </div>

            <div id="choiceMade">
              <!--v-model="singleChoice[index]-->
              <el-radio-group v-model="answerList1[index]" size="medium">
                <el-radio
                  v-show="value.selectionNum - 0 > 0"
                  label="A"
                  border
                ></el-radio>
                <el-radio
                  v-show="value.selectionNum - 1 > 0"
                  label="B"
                  border
                ></el-radio>
                <el-radio
                  v-show="value.selectionNum - 2 > 0"
                  label="C"
                  border
                ></el-radio>
                <el-radio
                  v-show="value.selectionNum - 3 > 0"
                  label="D"
                  border
                ></el-radio>
                <el-radio
                  v-show="value.selectionNum - 4 > 0"
                  label="E"
                  border
                ></el-radio>
                <el-radio
                  v-show="value.selectionNum - 5 > 0"
                  label="F"
                  border
                ></el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>

        <br />
        <h3>第二部分：多选题</h3>
        <!--多选题-->
        <div>
          <div id="Multiple" v-for="(value, index) in qesList2" :key="index">
            <!--题干-->
            <div id="contentDiscribe">
              <!-- <i
              class=" el-icon-arrow-right"
              style="margin-right: 15px; font-size: 30px; color: orange"
            ></i> -->
              <span id="contentNumber">{{ parseInt(index) + 1 }}. </span>
              <span id="content">{{ value.description }}</span>
            </div>
            <div id="choiceDiscribe">
              <p v-show="value.selectionNum - 0 > 0">
                A. {{ value.selectionA }}
              </p>
              <p v-show="value.selectionNum - 1 > 0">
                B. {{ value.selectionB }}
              </p>
              <p v-show="value.selectionNum - 2 > 0">
                C. {{ value.selectionC }}
              </p>
              <p v-show="value.selectionNum - 3 > 0">
                D. {{ value.selectionD }}
              </p>
              <p v-show="value.selectionNum - 4 > 0">
                E. {{ value.selectionE }}
              </p>
              <p v-show="value.selectionNum - 5 > 0">
                F. {{ value.selectionF }}
              </p>
            </div>
            <div id="choiceMade"> 
              <el-checkbox
                v-show="value.selectionNum - 0 > 0"
                label="A"
                border
                v-model="answerList2A[index]"
              ></el-checkbox>

              <el-checkbox
                v-show="value.selectionNum - 1 > 0"
                label="B"
                border
                v-model="answerList2B[index]"
              ></el-checkbox>
              <el-checkbox
                v-show="value.selectionNum - 2 > 0"
                label="C"
                border
                v-model="answerList2C[index]"
              ></el-checkbox>
              <el-checkbox
                v-show="value.selectionNum - 3 > 0"
                label="D"
                border
                v-model="answerList2D[index]"
              ></el-checkbox>
              <el-checkbox
                v-show="value.selectionNum - 4 > 0"
                label="E"
                border
                v-model="answerList2E[index]"
              ></el-checkbox>
              <el-checkbox
                v-show="value.selectionNum - 5 > 0"
                label="F"
                border
                v-model="answerList2F[index]"
              ></el-checkbox>
            </div>
          </div>
        </div>

        <br />
        <h3>第三部分：判断题</h3>
        <!--判断题-->
        <div>
          <div id="Judge" v-for="(value, index) in qesList3" :key="index">
            <!--题干-->
            <div id="contentDiscribe">
              <!-- <i
              class=" el-icon-arrow-right"
              style="margin-right: 15px; font-size: 30px; color: orange"
            ></i> -->
              <span id="contentNumber">{{ parseInt(index) + 1 }}. </span>
              <span id="content">{{ value.description }}</span>
            </div>
            <div id="choiceMade">
              <!--v-model="singleChoice[index]-->
              <el-radio-group v-model="answerList3[index]" size="medium">
                <el-radio label="T" border>T</el-radio>
                <el-radio label="F" border>F</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>

        <br />
        <h3>第四部分：简答题</h3>
        <!--简答题-->
        <div>
          <div id="Ans" v-for="(value, index) in qesList4" :key="index">
            <!--题干-->
            <div id="contentDiscribe">
              <!-- <i
              class=" el-icon-arrow-right"
              style="margin-right: 15px; font-size: 30px; color: orange"
            ></i> -->
              <span id="contentNumber">{{ parseInt(index) + 1 }}. </span>
              <span id="content">{{ value.description }}</span>
            </div>
            <div id="inputAns">
              <el-input
                v-model="answerList4[index]"
                placeholder="请输入内容"
                clearable
              ></el-input>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--右侧信息栏-->
    <div class="ansright">
      <!-- <div id="TimeCount">
        <img src="@/assets/img/answer-clock.png" /><br />倒计时
      </div>
      <div>{{ countdown }}min</div> -->
      <div id="button">
        <el-button type="primary" @click="PaperSubmit">我要交卷</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "questionList",
  data() {
    return {
      testID: 0,

      testName: null, //考试名字
      countdown: 180, //考试剩余时间,分钟为单位
      BeginTime: null, //考试开始时间
      EndTime: null, //考试结束时间
      major1: null,
      major2: null,
      major3: null,
      totalQes: null,
      qesList1: [],
      qesList2: [],
      qesList3: [],
      qesList4: [],
      QList: null, //保存题目列表（包含正确答案）
      WrongQ: [], //记录错误题的index
      singleNum: 0,
      multipleNum: 0,
      judgeNum: 0,
      ansNum: 0,
      singleScore: 0,
      multipleScore: 0,
      judgeScore: 0,
      ansScore: 0,
      TotoalScore: 0,

      //用户选择的答案
      answerList1: [],
      answerList2:[],
      answerList2A: null,
      answerList2B: null,
      answerList2C: null,
      answerList2D: null,
      answerList2E: null,
      answerList2F: null,

      answerList3: [],
      answerList4: [],
      submit: [],
      qesList:[],
    };
  },
  created() {
    //this.getCookies()
    this.getExamData();
    this.showTime();
  },
  methods: {
    showTime() {
      setInterval(() => {
        this.countdown -= 1; //修改剩余时间
        if (this.time == 10) {
          //考试还剩10分钟
        }
        if (this.time == 0) {
          //考试时间到
          PaperSubmit();
        }
      }, 1000 * 60); //每隔60s调用一次匿名函数
    },
    getTime(date) {
      //日期格式化
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },
    getExamData() {
      //开始时间的判断
      //
      //ID
      //考试规定时间
      this.testID = this.$route.query.examCode;
      //考试名字
      this.$axios.get(`/paper/${this.testID}`).then(
        (res) => {
          console.log(res.data)
          let examData = { ...res.data.data };
          this.testName = examData.name;
          this.major1 = examData.major1Name;
          this.major2 = examData.major2Name;
          this.totalQes = examData.questNum;
          this.BeginTime = examData.startTime;
          this.EndTime = examData.endTime;
        },
        (err) => {
          console.log(err);
        }
      );

      //题目列表
      //单选题
      this.$axios
        .get(`/quest/paper/${this.testID}`, {
          //     typeID: 1,
        })
        .then((res) => {
          console.log(res);
          let Data = res.data.data;
          this.qesList=Data;
          this.qesList1 = Data.filter((entity) => entity.typeId == 1);
          this.qesList2 = Data.filter((entity) => entity.typeId == 2);
          this.qesList3 = Data.filter((entity) => entity.typeId == 3);
          this.qesList4 = Data.filter((entity) => entity.typeId == 4);

          this.answerList1=new Array(this.qesList1.length).fill("")
          this.answerList3=new Array(this.qesList3.length).fill("")
          this.answerList4=new Array(this.qesList4.length).fill("")

          this.answerList2A = new Array(this.qesList2.length).fill("")
          this.answerList2B = new Array(this.qesList2.length).fill("")
          this.answerList2C = new Array(this.qesList2.length).fill("")
          this.answerList2D = new Array(this.qesList2.length).fill("")
          this.answerList2E = new Array(this.qesList2.length).fill("")
          this.answerList2F = new Array(this.qesList2.length).fill("")
        });
      
      //获取题目答案
      this.$axios
        .get(`/quest/paper/${this.testID}`, {
          params: {},
        })
        .then(
          (res) => {
            let resData = res.data;
            this.Qlist = resData.data;
          },
          (err) => {
            console.log(err);
          }
        );
    },
    select() {
      console.log(1)
    },
    PaperSubmit() {
     let AList=[];
      this.answerList1.forEach((value)=>{
        if(value=='')AList.push('未作答');
        else AList.push(value);
        });

      let ans='';
      for (let index = 0; index < this.qesList2.length; index++) {

        if(this.answerList2A[index]==true){
          this.answerList2A[index]='A';
        }
        if(this.answerList2B[index]==true){
          this.answerList2B[index]='B';
        }
        if(this.answerList2C[index]==true){
          this.answerList2C[index]='C';
        }
        if(this.answerList2D[index]==true){
          this.answerList2D[index]='D';
        }
        if(this.answerList2E[index]==true){
          this.answerList2E[index]='E';
        }
        if(this.answerList2F[index]==true){
          this.answerList2F[index]='F';
        }
        if(this.answerList2A[index]==false){
          this.answerList2A[index]='';
        }
        if(this.answerList2B[index]==false){
          this.answerList2B[index]='';
        }
        if(this.answerList2C[index]==false){
          this.answerList2C[index]='';
        }
        if(this.answerList2D[index]==false){
          this.answerList2D[index]='';
        }
        if(this.answerList2E[index]==false){
          this.answerList2E[index]='';
        }
        if(this.answerList2F[index]==false){
          this.answerList2F[index]='';
        }
        
        ans=this.answerList2A[index]+this.answerList2B[index]+this.answerList2C[index]+this.answerList2D[index]
        +this.answerList2E[index]+this.answerList2F[index];
        if(ans=='')AList.push('未作答');
        else AList.push(ans);
        
        ans='';
      }

      this.answerList3.forEach((value)=>{
        console.log('55555555'+value+'666666');
        if(value=='')AList.push('未作答');
        else AList.push(value);
        });
      this.answerList4.forEach((value)=>{
        
        if(value=='')AList.push('未作答');
        else AList.push(value);
        });
      this.processData(AList)

      let date = new Date();
      this.EndTime = this.getTime(date); //提交时间
      //提交数据
      let m = 0;
      while (m < this.totalQes) {
        this.submit.push({
          paperId:this.testID,
          questId:this.qesList[m].id,
          questIndex:m,
          questAnswer:AList[m]
        })
        m++;
      }
      console.log(this.submit)
      this.$axios.post(
        `/paper/${this.testID}/submit`,
        {
          id: this.testID,
          answers: this.submit,
        }
      ).then(res=>{
        this.$router.push({name: 'resultList', params: {TotalScore: this.TotoalScore}})
      })
      
    },
    processData(Alist) {
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
        if (this.Qlist[n].answer == Alist[n])
          this.singleScore++;
        else this.WrongQ.push(n);
        n++;
      }
      //多选
      while (n < this.singleNum + this.multipleNum) {
        if (this.Qlist[n].answer == Alist[n])
          this.multipleScore++;
        else this.WrongQ.push(n);
        n++;
      }
      //判断
      while (n < this.singleNum + this.multipleNum + this.judgeNum) {
        if (this.Qlist[n].answer == Alist[n])
          this.judgeScore++;
        else this.WrongQ.push(n);
        n++;
      }
      //简答
      while (
        n <
        this.singleNum + this.multipleNum + this.judgeNum + this.ansNum
      ) {
        if (this.Qlist[n].answer == Alist[n]) this.ansScore++;
        else this.WrongQ.push(n);
        n++;
      }
      //计算总分
      this.TotoalScore =
        this.singleScore + this.multipleScore + this.judgeScore + this.ansScore;
        console.log(this.TotoalScore)
    },
  },
};
</script>

<style scoped>
/*路由组件*/

.answer {
  background-color: #eee;
  padding-bottom: 10px;
}

/*左侧 */
.ansleft {
  padding-top: 10px;
  width: 90%;
  margin: 0px auto;
  text-align: left;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.ansleft #name {
  margin-left: 10px;
  font-size: 30px;
  padding: 15px 15px;
  font-weight: 600;
  text-align: center;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin-bottom: 5px;
}
.ansleft #testInfo {
  margin-left: 10px;
  background-color: rgb(254, 254, 254);
  padding: 5px 15px;
  font-size: 15px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.QList {
  padding-left: 10px;
  padding-top: 10px;
  
}
.QList #contentDiscribe {
  background-color: rgba(99, 166, 228, 0.649);
  height: auto;
  padding-top: 9px;
}
.QList #contentDiscribe #contentNumber {
  margin-left: 10px;
  font-weight: 600;
  font-size: 20px;
  font-style: italic;
}
.QList #contentDiscribe #content {
  font-weight: 600;
  font-size: 15px;
  margin-left: 5px;
  margin-top: 20%;
}
.QList #choiceDiscribe {
  padding-left: 75px;
  margin-top:15px;
  margin-bottom:15px;
  
}
.QList #choiceMade {
  padding-left: 70px;
}
.QList #Single {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding-bottom: 20px;
  margin-top:20px;
  margin-bottom: 10px;
  /*border-bottom: 1px solid rgb(126, 126, 126);*/
}
.QList #Multiple {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding-bottom: 20px;
  margin-bottom: 10px;
  margin-top:20px;
  /*border-bottom: 1px solid rgb(126, 126, 126);*/
}
.QList #Judge {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding-bottom: 20px;
  margin-top:20px;
  margin-bottom: 10px;
  /*border-bottom: 1px solid rgb(126, 126, 126);*/
}
.QList #Judge #choiceMade {
  margin-top: 10px;
}
.QList #Ans {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding-bottom: 20px;
  margin-top:20px;
  margin-bottom: 10px;
  /*border-bottom: 1px solid rgb(126, 126, 126);*/
}
.QList #Ans #inputAns {
  margin-top: 10px;
  padding-left: 70px;
  width: 50%;
}

/*右侧 */
.ansright {
  background-color: #bec9e976;
  position: fixed;
  bottom: 140px;
  right: 15px;
  border: solid #bec9e976;
  padding: 5px;
}

.ansright #TimeCount img {
  margin-top: 10px;
  height: 40px;
}
.ansright #button {
  margin-top: 5px;
}
</style>