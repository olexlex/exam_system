<template>
    <div id="message">
      <div class="title">
        <span>当前试卷</span>
      </div>
      <div class="wrapper">
        <ul class="top">
          <li class="name">{{paper.name}}</li>
          <li><i class="el-icon-edit-outline icon" @click="updateName = !updateName"></i></li>
          <li class="quest">
            <div>
              <span class="count">题目总数</span>
              <span class="total">{{paper.questNum}}</span>
            </div>
          </li>
        </ul>
        <ul class="bottom">
          <li>创建于{{dayjs(paper.startTime).format('YYYY-MM-DD')}}</li>
          <li>来自 {{this.$store.state.user.name}}</li>
          <li><el-button type="info">考试方向: {{paper.major1Name}} + {{paper.major2Name}}</el-button></li>
          <li class="quest"><el-button @click="toAnswer(paper.id)">开始答题</el-button></li>
        </ul>
        <el-divider></el-divider>
        <ul class="info">
          <li><el-link @click="open" :underline="false" icon="el-icon-document">考生须知</el-link></li>
        </ul>   
      </div>
      <div class="content">
        <el-collapse v-model="activeName">
          <el-collapse-item class="header" name="0">
            <template slot="title">
              <div class="title">
                {{paper.name}}<i class="header-icon el-icon-info icon"></i>
              </div>
            </template>
            <el-collapse-item disabled>
              <template slot="title">
                <div class="titles">单选题 (共{{quest1Num}}题)</div>
              </template>
            </el-collapse-item>
            <el-collapse-item disabled>
              <template slot="title">
                <div class="titles">多选题 (共{{quest2Num}}题)</div>
              </template>
            </el-collapse-item>
            <el-collapse-item disabled>
              <template slot="title">
                <div class="titles">是非题 (共{{quest3Num}}题)</div>
              </template>
            </el-collapse-item>
            <el-collapse-item disabled>
              <template slot="title">
                <div class="titles">简答题 (共{{quest4Num}}题)</div>
              </template>
            </el-collapse-item>
          </el-collapse-item>
      </el-collapse>
      </div>
  </div>
</template>

<script>
    export default {
        name: 'ExamMsg',
        data() {
            return {
              activeName: '0',  //默认打开序号
              paper: {},
              quest1Num: null,
              quest2Num: null,
              quest3Num: null,
              quest4Num: null,
            }
        },
        created() {
          this.init()
        },
        methods: {
          init() {
              this.getPaper(this.$route.query.examCode)
          },
          toAnswer(id) {
              if (this.paper.isEnded)
                this.$message({
                  type: 'error',
                  message: '考试已结束'
              })
              else
                this.$router.push({path:"/questionList", query:{examCode: id}})
          },
          getPaper(paperId) {
            this.$axios.get(`/paper/${paperId}`).then(
              res => {
                this.paper=res.data.data
                console.log(res.data)
              },
              error => {
                console.log(error.message)
              }
            )
            this.$axios
            .get(`/quest/paper/${paperId}`).then(
              res => {
              let Data = res.data.data;
              console.log(res.data)
              this.quest1Num = Data.filter((entity) => entity.typeId == 1).length
              this.quest2Num = Data.filter((entity) => entity.typeId == 2).length
              this.quest3Num = Data.filter((entity) => entity.typeId == 3).length
              this.quest4Num = Data.filter((entity) => entity.typeId == 4).length
            });
          },
          open() {
            this.$alert('诚信考试', '考生须知', {
              confirmButtonText: '确定'
            });
          },
        },
    }
</script>

<style  scoped>
  #message {
    padding-top: 60px;
    background-color: #eee;
    margin: 0 70px;
    height: 800px;
  }

  .title {
    margin: 20px;
  }

  .wrapper {
    background-color: #fff;
    padding: 10px;
  }

  .wrapper .top {
    display: flex;
    margin: 20px;
    align-items: center;
  }

  .name {
    color: #333;
    font-size: 22px;
    font-weight: 700;
  }

  .top .icon {
    margin-left: 10px;
    font-size: 20px;
    cursor: pointer;
  }

  .quest {
    margin-left: auto;
  }

  .count {
    color: #fff;
    padding: 4px 10px;
    background-color: #88949b;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border: 0px solid #88949b;
  }

  .total {
    padding: 2px 12px;
    font-size: 17px;
    color: #88949b;
    border: 1px dashed #88949b;
    border-left: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    font-weight: bold;
  }

  .bottom {
    display: flex;
    margin-left: 20px;
    color: #999;
    font-size: 14px;
    align-items: center;
  }

  .bottom li {
    margin-right: 14px;
  }

  .info {
    margin: 0px 0px 0px 20px;
    padding: 0px 0px 10px 0px;
  }

  .content {
    margin-top: 20px;
    background-color: #fff;
  }

  .content .header {
    padding: 10px 30px;
  }

  .content .title {
    margin: 0px;
    margin-left: 20px;
    font-size: 20px;
  }

  .content .icon {
    margin-left: 5px;
  }

  .titles {
    margin-left: 20px;
    font-size: 16px;
    color: #88949b;
    font-weight: bold;
  }
</style>
