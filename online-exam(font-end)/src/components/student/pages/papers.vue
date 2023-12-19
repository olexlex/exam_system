<template>
    <div id="myPaper">
        <div class="wrapper">
            <ul class="top">
                <li class="order">
                    试卷列表
                    <el-popover
                        placement="top-start"
                        title="提示"
                        width="200"
                        trigger="hover"
                        content="历史试卷">
                        <i class="el-icon-info icon" slot="reference"></i>
                    </el-popover>
                </li>
                <li>
                  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="全部" name="first"></el-tab-pane>
                    <el-tab-pane label="进行中" name="second"></el-tab-pane>
                    <el-tab-pane label="已结束" name="third"></el-tab-pane>
                  </el-tabs>
                </li>
                <li class="search-li"><el-input v-model="key" placeholder="试卷名称"></el-input></li>
                <li><el-button type="primary" icon="el-icon-search" @click="search()">搜索试卷</el-button></li>
                <li><el-button type="primary" @click="reset()">重置</el-button></li>
            </ul>
        <ul class="paper" v-loading="loading">
            <li class="item" v-for="item in displayExams" :key="item.id" @click="toExamMsg(item.id, item.isEnded)">
                <h4>{{item.source}}</h4>
                
                <p class="name">{{item.name}}
                  <el-dropdown @command="deletePaper(item.id)" class="icon">
                    <span class="el-dropdown-link">
                      <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </p>
                <div class="info">
                    <ul>
                        <li><i class="el-icon-date icon"></i>开始时间: {{dayjs(item.startTime).format('YYYY-MM-DD HH:mm:ss')}}</li>
                        <li><i class="el-icon-date icon"></i>结束时间: {{endTime(item)}}</li>
                        <li v-show="item.questNum != null"><i class="el-icon-edit icon"></i>题目数 {{item.questNum}}</li>
                    </ul>
                </div>
            </li>
        </ul>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[2, 4, 6]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="allExams.length">
            </el-pagination>
        </div>
        </div>
        <el-backtop :right="50" :bottom="100">
          <div
            style="
              height: 100%;
              width: 100%;
              background-color: var(--el-bg-color-overlay);
              box-shadow: var(--el-box-shadow-lighter);
              text-align: center;
              line-height: 40px;
              color: #1989fa;
              font-size: 10px
            "
          >
          顶部
        </div>
        </el-backtop>
    </div>
</template>

<script>
    export default {
        inject:['reload'],
        name: 'StudentPapers',
        data() {
            return {
                loading: false,
                key: "", //搜索关键字
                storedExam: [],
                allExams: [], //所有考试信息
                displayExams: [], 
                currentPage: 1, //当前页
                pageSize: 6,
                activeName: 'first',
            }
        },
        created() {
            this.loading = true
            this.getExamInfo()
        },
        methods: {
            //获取当前所有考试信息
            getExamInfo() {
                console.log(localStorage.id)
                this.$axios.get(`/paper/user/${localStorage.id}`).then(
                    res => {
                        console.log(res.data)
                        this.allExams = res.data.data
                        this.storedExam = res.data.data
                        console.log(this.storedExam)
                        this.changePage()
                        this.loading = false
                    },
                    error => {
                        console.log(error.message)
                    }
                )
            },
            deletePaper(id) {
              this.$axios.delete(`/paper/${id}`).then(res => {
                if (res.data.errno === 0) {
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                  let res = this.allExams.pop()
                  if (this.key !== null) {
                    let index = this.storedExam.indexOf(res)
                    this.storedExam.splice(index, 1)
                  }
                  if ((this.currentPage - 1) * this.pageSize === this.allExams.length)
                    this.currentPage = this.currentPage - 1
                  this.changePage()
                }
                else
                  this.$message.error('删除失败');
              })
            },
            //改变当前记录条数
            handleSizeChange(val) {
                this.pageSize = val
                this.changePage()
            },
            //改变当前页码，重新发送请求
            handleCurrentChange(val) {
                this.currentPage = val
                this.changePage()
            },
            changePage() {
                let page = this.currentPage === this.allExams.length / this.pageSize ? this.allExams.length : this.currentPage * this.pageSize
                this.displayExams = this.allExams.slice((this.currentPage - 1) * this.pageSize, page)
            },
            reset() {
                this.allExams = this.storedExam
                this.reload()
                this.changePage()
            },
            //搜索试卷
            search() {
                if (this.key === "")
                    this.reset()
                else {
                  this.allExams = this.allExams.filter(item => {
                      return item.name.includes(this.key)
                  })
                  this.changePage()
                }
            },
            //跳转到试卷详情页
            toExamMsg(examCode, isEnded) {
              if (!isEnded)
                this.$router.push({path: '/student/examMsg', query: {examCode: examCode}})
              else 
                this.$router.push({path: '/resDetailList', query: {testID: examCode}})
            },
            endTime(paper) {
                if (paper.endTime === null) 
                    return "尚未结束"
                else
                    return this.dayjs(paper.endTime).format('YYYY-MM-DD HH:mm:ss')
            },
            handleClick(tab) {
              if (tab.index === "0") {
                this.activeName = "first"
                this.allExams = this.storedExam
              } else if (tab.index === "1") {
                this.allExams = this.storedExam
                this.activeName = "second"
                this.allExams = this.allExams.filter(item => {
                  if (!item.isEnded)
                    return item
                })
              } else {
                this.allExams = this.storedExam
                this.activeName = "third"
                this.allExams = this.allExams.filter(item => {
                  if (item.isEnded)
                    return item
                })
              }
              this.changePage()
              if (this.key !== "")
                this.search()
            }
        }
    }
</script>

<style  scoped>
  #myPaper {
  margin: 0 70px;
  padding-top: 60px;
  height: 1000px;
}

.wrapper {
  background-color: #fff;
}

.top {
  display: flex;
}

.top li {
  display: flex;
  align-items: center;
  margin: 20px;
}

.order .icon {
  margin: 0px 5px;
}

#myPaper .search-li {
  margin-left: auto;
}

.paper .item {
  width: 380px;
  border-radius: 4px;
  padding: 20px 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 4px 2px rgba(217, 222, 234, 0.3);
  transition: all 0.6s ease;
}

.paper * {
  margin: 10px 0;
}

.paper {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.paper .item {
  width: 380px;
  border-radius: 4px;
  padding: 20px 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 4px 2px rgba(217, 222, 234, 0.3);
  transition: all 0.6s ease;
  cursor: pointer;
}

.paper .item h4 {
  pointer-events: none;
}

.paper .item:hover {
  box-shadow: 0 0 4px 2px rgba(140, 193, 248, 0.45);
  transform: scale(1.03);
}

.name {
  font-weight: bold;
  }

.name .icon {
  float: right;
}

.el-dropdown {
  margin: -5px;
}

.info {
  font-size: 14px;
  color: #88949b;
}

.info .icon {
  margin-right: 5px;
}

.pagination {
  padding: 20px 0px 30px 0px;
}

.pagination .el-pagination {
  display: flex;
  justify-content: center;
}

</style>
