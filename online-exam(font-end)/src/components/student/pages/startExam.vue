<template>
    <div id="myExam">
        <div class="wrapper">
            <ul class="top">
                <li class="order">
                    专业列表
                    <el-popover
                        placement="top-start"
                        title="提示"
                        width="200"
                        trigger="hover"
                        content="请从以下专业中挑选两个作为考试方向">
                        <i class="el-icon-info icon" slot="reference"></i>
                    </el-popover>
                </li>
                <li class="search-li"><el-input v-model="key" placeholder="专业名称"></el-input></li>
                <li><el-button type="primary" icon="el-icon-search" @click="search()">搜索专业</el-button></li>
                <li><el-button type="primary" @click="reset()">重置</el-button></li>
            </ul>
            <ul class="major" v-loading="loading">
                <li class="item"  v-for="item in displayMajors" :key="item.id" @click="select($event, item)">
                    <h4>{{item.name}}</h4>
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
                    :total="total">
                </el-pagination>
            </div>
            <el-divider></el-divider>
            <el-button class="exam" type="primary" @click="toExamMsg()">开始考试</el-button>
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
    </div>
</template>

<script>
    export default {
        inject:['reload'],
        name: "StudentExam",
        data() {
            return {
                loading: false,
                key: "", //搜索关键字
                allMajors: [], //所有专业信息
                selectedMajors: [], //选中专业信息
                displayMajors: [], //展示专业信息
                currentPage: 1, //当前页
                pageSize: 6,
                paperName: null, //用户输入的试卷名
                paper: null, //用户获得的试卷
                papers: null,
                isSame: false,
                total: null
            }
        },
        mounted() {
            this.loading = true
            this.init()
        },
        methods: {
            init() {
                this.$axios.get('/major/list').then(
                    res => {
                        console.log(res.data)
                        this.allMajors = res.data.data
                        this.total = this.allMajors.length
                        this.changePage()
                        this.loading = false
                    },
                    error => {
                        console.log(error.message)
                    }
                )
            },
            reset() {
                this.reload()
                this.changePage()
            },
            search() {
                if (this.key === "")
                    this.reset()
                else
                    this.displayMajors = this.allMajors.filter(item => {
                        return item.name.includes(this.key)
                    })
                if (this.key === "") 
                  this.total = this.allMajors.length
                else
                  this.total = this.displayMajors.length
            },
            select(e, value) {
                let index = this.selectedMajors.indexOf(value)
                if (index !== -1) { 
                    e.target.className = "item"
                    this.selectedMajors.splice(index, 1)
                }
                if (this.isFilled) {
                    this.$message.error('所选专业数量已达到两个');
                    return 
                }
                if (index == -1) {
                    e.target.className = "selected"
                    this.selectedMajors.push(value)
                }
            },
            async createPaper() {
                let res = await this.isSameName() 
                if (res.data.errno === 0) {
                    console.log(res.data)
                    this.papers = res.data.data
                    this.papers.forEach(element => {
                        if (element.name === this.paperName && !this.isSame) {
                            this.isSame = true
                            this.$message({
                                type: 'error',
                                message: '试卷名字重复'
                            })
                        }
                    });
                }
                else 
                {
                    console.log(res.data.errMsg)
                }
                if (this.isSame){
                    this.isSame = false
                    return
                }
                this.$axios({ //创建试卷
                    url: '/paper/create',
                    method: 'post',
                    data: {
                        "major1Id": this.$store.state.selectedMajors[0].id,
                        "major2Id": this.$store.state.selectedMajors[1].id,
                        "major3Id": null,
                        "name": this.paperName,
                        "userId": localStorage.id
                    }
                    }).then(res => {
                        if(res.data != null ) { 
                            if (res.data.errno === 902) 
                            {
                                this.$message({
                                    type: 'error',
                                    message: '试卷专业题目不足'
                                })
                                return
                            }
                            else {
                                console.log(res.data)
                                this.paper=res.data.data
                                this.$message({
                                    type: 'success',
                                    message: '成功创建试卷: ' + this.paperName
                                })
                                this.$router.push({path: '/student/examMsg', query: {examCode: this.paper.id}})
                            }
                        }
                    })
            },
            isSameName() {
                return this.$axios.get(`/paper/user/${localStorage.id}`)
            },
            toExamMsg() {
                if (!this.isFilled) {
                    this.$message.error('所选专业数量未达到两个');
                    return
                }
                else{
                    this.$store.commit('GetMajor', this.selectedMajors)
                    this.$prompt('请输入试卷名', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    }).then(({ value }) => {
                        this.paperName=value
                        this.createPaper()
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消创建'
                        });       
                    });
                }
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.changePage()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.changePage()
            },
            changePage() {
                let page = this.currentPage === this.allMajors.length / this.pageSize ? this.allMajors.length : this.currentPage * this.pageSize
                this.displayMajors = this.allMajors.slice((this.currentPage - 1) * this.pageSize, page)
            }
        },
        computed: {
            isFilled() {
                return this.selectedMajors.length === 2;
            }
        }
    }
</script>

<style  scoped>
  #myExam {
  margin: 0 70px;
  padding-top: 60px;
  height: 800px;
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

.icon {
  margin: 0px 5px;
}

#myExam .search-li {
  margin-left: auto;
}

.major .item {
  width: 380px;
  border-radius: 4px;
  padding: 20px 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 4px 2px rgba(217, 222, 234, 0.3);
  transition: all 0.6s ease;
}

.major * {
  margin: 20px 0;
}

.major {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.major .item {
  width: 380px;
  border-radius: 4px;
  padding: 20px 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 4px 2px rgba(217, 222, 234, 0.3);
  transition: all 0.6s ease;
  cursor: pointer;
}

.major .item h4 {
  pointer-events: none;
}

.major .item:hover {
  box-shadow: 0 0 4px 2px rgba(140, 193, 248, 0.45);
  transform: scale(1.03);
}

.selected {
  width: 380px;
  border-radius: 4px;
  padding: 20px 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 4px 2px rgba(217, 222, 234, 0.3);
  background-color: gray;
  cursor: pointer;
}

.selected h4 {
  pointer-events: none;
}

.pagination {
  padding: 20px 0px 10px 0px;
}

.pagination .el-pagination {
  display: flex;
  justify-content: center;
}

.exam {
  margin: 0px 20px 20px 20px;
}


</style>