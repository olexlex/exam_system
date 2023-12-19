<template>
    <div class="answer">
        <!--题目流-->
        <div class="ansleft">
            <h2>考试名字：{{ testName }} 共{{ totalQes }}题</h2>
            <div class="QList">

                <!--单选题-->
                <div id="Single" v-for="(value, index) in qesList1" :key="index">
                    <!--题干-->
                    <div>题号{{ index+1 }} 题：{{ value.description }}</div>
                    <el-radio v-model="singleChoice[index]" label="1">{{ value.selectionA }}</el-radio>
                    <el-radio v-model="singleChoice[index]" label="2">{{ value.selectionB }}</el-radio>
                    <el-radio v-model="singleChoice[index]" label="3">{{ value.selectionC }}</el-radio>
                    <el-radio v-model="singleChoice[index]" label="4">{{ value.selectionD }}</el-radio>
                    <el-radio v-model="singleChoice[index]" label="5">{{ value.selectionE }}</el-radio>
                    <el-radio v-model="singleChoice[index]" label="6">{{ value.selectionF }}</el-radio>
                </div>
                <br/>
                <!--多选题-->
                <div id="Multiple" v-for="(value, index) in qesList2" :key="index">
                    <!--题干-->
                    <div>题号{{ index+1 }} 题：{{ value.description }}</div>
                    <el-checkbox-group v-model="multipleChoice[index]">
                        <el-checkbox label="A">{{ value.selectionA }}</el-checkbox>
                        <el-checkbox label="B">{{ value.selectionB }}</el-checkbox>
                        <el-checkbox label="C">{{ value.selectionC }}</el-checkbox>
                        <el-checkbox label="D">{{ value.selectionD }}</el-checkbox>
                        <el-checkbox label="E">{{ value.selectionE }}</el-checkbox>
                        <el-checkbox label="F">{{ value.selectionF }}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <br/>
                <!--判断题-->
                <div id="Judge" v-for="(value, index) in qesList3" :key="index">
                    <!--题干-->
                    <div>题号{{ index+1 }} 题：{{ value.description }}</div>
                    <el-radio v-model="judgeChoice[index]" label="1">T</el-radio>
                    <el-radio v-model="judgeChoice[index]" label="2">F</el-radio>
                </div>
                <br/>
                <!--简答题-->
                <div id="Ans" v-for="(value, index) in qesList4" :key="index">
                    <!--题干-->
                    <div>题号{{ index+1 }} 题：{{ value.description }}</div>
                    <el-input v-model="shortAnswer[index]" placeholder="请输入内容" clearable></el-input>
                </div>
            </div>
        </div>

        <!--右侧信息栏-->
        <div class="ansright">
            <div id="TimeCount"><img src="@/assets/answer-clock.png"><br />倒计时</div>
            <div>{{ countdown }}</div>
            <el-button type="success" @click="submit">我要交卷</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'questionList',
    data() {
        return {
            testName: '',//考试名字
            countdown: '',//考试剩余时间,分钟为单位
            BeginTime: '',//考试开始时间
            EndTime: '',//考试结束时间
            major1: '',
            major2: '',
            major3: '',
            totalQes: '',

            qesList1: [{
                "id": 12,
                "majorId": 1,
                "typeId": 1,
                "description": "语文单选2",
                "answer": null,
                "selectionNum": 5,
                "selectionA": "选项1",
                "selectionB": "选项2",
                "selectionC": "选项3",
                "selectionD": "选项4",
                "selectionE": "选项5",
                "selectionF": "选项6"
            },
            {
                "id": 13,
                "majorId": 2,
                "typeId": 1,
                "description": "数学单选1",
                "answer": null,
                "selectionNum": 4,
                "selectionA": "选项1",
                "selectionB": "选项2",
                "selectionC": "选项3",
                "selectionD": "选项4",
                "selectionE": "选项5",
                "selectionF": "选项6"
            },],
            qesList2: [{
                "id": 21,
                "majorId": 2,
                "typeId": 2,
                "description": "数学多选2",
                "answer": null,
                "selectionNum": 4,
                "selectionA": "选项1",
                "selectionB": "选项2",
                "selectionC": "选项3",
                "selectionD": "选项4",
                "selectionE": "选项5",
                "selectionF": "选项6"
            },
            {
                "id": 23,
                "majorId": 3,
                "typeId": 2,
                "description": "英语多选2",
                "answer": null,
                "selectionNum": 4,
                "selectionA": "选项1",
                "selectionB": "选项2",
                "selectionC": "选项3",
                "selectionD": "选项4",
                "selectionE": "选项5",
                "selectionF": "选项6"
            },
            {
                "id": 22,
                "majorId": 3,
                "typeId": 2,
                "description": "英语多选1",
                "answer": null,
                "selectionNum": 4,
                "selectionA": "选项1",
                "selectionB": "选项2",
                "selectionC": "选项3",
                "selectionD": "选项4",
                "selectionE": "选项5",
                "selectionF": "选项6"
            }],
            qesList3: [{
                "id": 27,
                "majorId": 2,
                "typeId": 3,
                "description": "数学判断2",
                "answer": null,
                "selectionNum": 2,
                "selectionA": "选项1",
                "selectionB": "选项2",
                "selectionC": "选项3",
                "selectionD": "选项4",
                "selectionE": "选项5",
                "selectionF": "选项6"
            },
            {
                "id": 29,
                "majorId": 3,
                "typeId": 3,
                "description": "英语判断2",
                "answer": null,
                "selectionNum": 2,
                "selectionA": "选项1",
                "selectionB": "选项2",
                "selectionC": "选项3",
                "selectionD": "选项4",
                "selectionE": "选项5",
                "selectionF": "选项6"
            },],
            qesList4: [{
                "id": 30,
                "majorId": 1,
                "typeId": 4,
                "description": "语文简答1",
                "answer": null,
                "selectionNum": 0,
                "selectionA": "选项1",
                "selectionB": "选项2",
                "selectionC": "选项3",
                "selectionD": "选项4",
                "selectionE": "选项5",
                "selectionF": "选项6"
            },
            {
                "id": 33,
                "majorId": 2,
                "typeId": 4,
                "description": "数学简答2",
                "answer": null,
                "selectionNum": 0,
                "selectionA": "选项1",
                "selectionB": "选项2",
                "selectionC": "选项3",
                "selectionD": "选项4",
                "selectionE": "选项5",
                "selectionF": "选项6"
            },],

            //用户选择的答案
            singleChoice: [],//单选
            multipleChoice: [[],[],[]],//多选
            judgeChoice: [],//判断
            shortAnswer: [],//简答
        }
    },
    created() {
        //this.getCookies()
        this.getExamData()
        this.showTime()
    },
    methods: {
        showTime() {
            setInterval(() => {
                this.countdown -= 1//修改剩余时间
                if (this.time == 10) {
                    //考试还剩10分钟
                }
                if (this.time == 0) {
                    //考试时间到
                }
            }, 1000 * 60)//每隔60s调用一次匿名函数
        },
        getTime(date) { //日期格式化
            let year = date.getFullYear()
            let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            // 拼接
            return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        },
        getExamData() {
            //开始时间的判断
            //
            //ID
            //考试规定时间
            let testID = 18//***假数据
            //考试名字
            this.$axios.get(`http://82.156.166.79:23333/paper/${testID}`, {
                params: {}
            }).then(res => {
                let examData = { ...res.data }
                this.testName = examData.name
                this.major1 = examData.major1Id
                this.major2 = examData.major2Id
                this.major3 = examData.major3Id
                this.totalQes = examData.questNum

            }, err => { console.log(err) })

            //题目列表
            //单选题
            this.$axios.get(`http://82.156.166.79:23333/quest/paper/${testID}`, {
                params: {
                    typeID: 1,
                }
            }).then(res => {
                let Data = { ...res.data }
                this.qesList1 = Data.data
            })

        },
        submit() {
            let date = new Date()
            this.EndTime = this.getTime(date)//提交时间
            //提交数据
        },
    }
}
</script>

<style>
/*路由组件*/
.answer {}

/*左侧 */
.ansleft {
    width: 100%;
    margin-left: 10px;
    text-align: left;
}

.QList #Single{
    
    margin-bottom:5px;
}
.QList #Multiple{
    
    margin-bottom:5px;
}
.QList #Judge{
    
    margin-bottom:5px;
}
.QList #Ans{
    
    margin-bottom:5px;
}

/*右侧 */
.ansright {
    background-color: #d4c9de;
    position: fixed;
    top: 140px;
    right: 15px;
}

.ansright #TimeCount img {
    height: 40px;

}
</style>