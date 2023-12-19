<template>
  <div class="add">
      <section class="append">
        <ul >
          <div >
            <el-select v-model="optionValue" placeholder="请选择题型" class="w150" >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div v-if="optionValue == '单选题' " >
            <el-input
              placeholder="请输入对应专业"
              v-model="postChange.section"
              class="w150"
              clearable>
            </el-input>
          </div>
          <div v-if="optionValue == '多选题' " >
            <el-input
              placeholder="请输入对应专业"
              v-model="postChange2.section"
              class="w150"
              clearable>
            </el-input>
          </div>
          <div v-if="optionValue == '判断题'">
            <el-input
              placeholder="请输入对应专业"
              v-model="postJudge.section"
              class="w150"
              clearable>
            </el-input>
          </div>
           <div v-if="optionValue == '简答题'">
            <el-input
              placeholder="请输入对应专业"
              v-model="postShortAnswer.section"
              class="w150"
              clearable>
            </el-input>
          </div>
          <div v-if="optionValue == '单选题'">
            <el-select v-model="postChange.rightAnswer" placeholder="选择正确答案" class="w150">
              <el-option
                v-for="item in rights"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div v-if="optionValue == '多选题'">
            <el-input v-model="postChange2.rightAnswer" placeholder="选择正确答案" class="w150">
            </el-input>
          </div>
        </ul>
        <!-- 选择题部分 -->
        <div class="change" v-if="optionValue == '单选题'">
          <div class="title">
            <el-tag>题目:</el-tag><span>在下面的输入框中输入题目</span>
            <el-input
              type="textarea"
              rows="4"
              v-model="postChange.question"
              placeholder="请输入题目内容"
              resize="none"
              class="answer">
            </el-input>
          </div>
          <div class="options">
            <ul>
              <li>
                <el-tag type="success">A</el-tag>
                <el-input
                  placeholder="请输入选项A的内容"
                  v-model="postChange.answerA"
                  clearable="">
                </el-input>
              </li>
              <li>
                <el-tag type="success">B</el-tag>
                <el-input
                  placeholder="请输入选项B的内容"
                  v-model="postChange.answerB"
                  clearable="">
                </el-input>
              </li>
              <li>
                <el-tag type="success">C</el-tag>
                <el-input
                  placeholder="请输入选项C的内容"
                  v-model="postChange.answerC"
                  clearable="">
                </el-input>
              </li>
              <li>
                <el-tag type="success">D</el-tag>
                <el-input
                  placeholder="请输入选项D的内容"
                  v-model="postChange.answerD"
                  clearable="">
                </el-input>
              </li>
            </ul>
          </div>
          <div class="title">
            <el-tag>解析:</el-tag><span>在下面的输入框中输入题目解析</span>
            <el-input
              type="textarea"
              rows="4"
              v-model="postChange.analysis"
              placeholder="请输入答案解析"
              resize="none"
              class="answer">
            </el-input>
          </div>
          <div class="submit">
            <el-button type="primary" @click="changeSubmit()">立即修改</el-button>
          </div>
        </div>
         <!-- 多选题部分 -->
        <div class="change" v-if="optionValue == '多选题'">
          <div class="title">
            <el-tag>题目:</el-tag><span>在下面的输入框中输入题目</span>
            <el-input
              type="textarea"
              rows="4"
              v-model="postChange2.question"
              placeholder="请输入题目内容"
              resize="none"
              class="answer">
            </el-input>
          </div>
          <div class="options">
            <ul>
              <li>
                <el-tag type="success">A</el-tag>
                <el-input
                  placeholder="请输入选项A的内容"
                  v-model="postChange2.answerA"
                  clearable="">
                </el-input>
              </li>
              <li>
                <el-tag type="success">B</el-tag>
                <el-input
                  placeholder="请输入选项B的内容"
                  v-model="postChange2.answerB"
                  clearable="">
                </el-input>
              </li>
              <li>
                <el-tag type="success">C</el-tag>
                <el-input
                  placeholder="请输入选项C的内容"
                  v-model="postChange2.answerC"
                  clearable="">
                </el-input>
              </li>
              <li>
                <el-tag type="success">D</el-tag>
                <el-input
                  placeholder="请输入选项D的内容"
                  v-model="postChange2.answerD"
                  clearable="">
                </el-input>
              </li>
            </ul>
          </div>
          <div class="title">
            <el-tag>解析:</el-tag><span>在下面的输入框中输入题目解析</span>
            <el-input
              type="textarea"
              rows="4"
              v-model="postChange2.analysis"
              placeholder="请输入答案解析"
              resize="none"
              class="answer">
            </el-input>
          </div>
          <div class="submit">
            <el-button type="primary" @click="change2Submit()">立即修改</el-button>
          </div>
        </div>
        <!-- 判断题 -->
        <div class="change judge" v-if="optionValue == '判断题'">
          <div class="title">
            <el-tag>题目:</el-tag><span>在下面的输入框中输入题目</span>
            <el-input
              type="textarea"
              rows="4"
              v-model="postJudge.question"
              placeholder="请输入题目内容"
              resize="none"
              class="answer">
            </el-input>
          </div>
          <div class="judgeAnswer">
            <el-radio v-model="postJudge.rightAnswer" label="T">正确</el-radio>
            <el-radio v-model="postJudge.rightAnswer" label="F">错误</el-radio>
          </div>
          <div class="title">
            <el-tag>解析:</el-tag><span>在下面的输入框中输入题目解析</span>
            <el-input
              type="textarea"
              rows="4"
              v-model="postJudge.analysis"
              placeholder="请输入答案解析"
              resize="none"
              class="answer">
            </el-input>
          </div>
          <div class="submit">
            <el-button type="primary" @click="judgeSubmit()">立即修改</el-button>
          </div>
        </div>
         <!-- 简答题部分 -->
        <div class="change fill" v-if="optionValue == '简答题'">
          <div class="title">
            <el-tag>题目:</el-tag><span>输入题目</span>
            <el-input
              type="textarea"
              rows="4"
              v-model="postShortAnswer.question"
              placeholder="请输入题目内容"
              resize="none"
              class="answer">
            </el-input>
          </div>
          <div class="fillAnswer">
            <el-tag>正确答案:</el-tag>
            <el-input v-model="postShortAnswer.rightAnswer"></el-input>
          </div>
          <div class="title analysis">
            <el-tag type="success">解析:</el-tag><span>下方输入框中输入答案解析</span>
            <el-input
              type="textarea"
              rows="4"
              v-model="postShortAnswer.analysis"
              placeholder="请输入答案解析"
              resize="none"
              class="answer">
            </el-input>
          </div>
          <div class="submit">
            <el-button type="primary" @click="fillSubmit()">立即修改</el-button>
          </div>
        </div>
      </section>
  </div>
</template>

<script>
import Vue from 'vue'
import store from '@/store'
export default {
  
 data() {
    return {
      question:{
        answer:'',
        description:'',
        id:'',
        majorId:'',
        majorName:'',
        selectionA:'',
        selectionB:'',
        selectionC:'',
        selectionD:'',
        selectionE:'',
        selectionF:'',
        selectionNum:'',
        typeId:''
      },
      id:'',
      options: [ //题库类型
        {
          value: '单选题',
          label: '单选题'
        },
        {
          value: '多选题',
          label: '多选题'
        },
        {
          value: '判断题',
          label: '判断题'
        },
        {
          value: '简答题',
          label: '简答题'
        },
      ],
      rights: [ //正确答案
        {
          value: 'A',
          label: 'A'
        },
        {
          value: 'B',
          label: 'B'
        },
        {
          value: 'C',
          label: 'C'
        },
        {
          value: 'D',
          label: 'D'
        },
      ],
      optionValue: '单选题', //题型选中值
      subject: '', //试卷名称用来接收路由参数
      postChange: { //选择题提交内容
        majorId:'',
        type_id: 1,
        rightAnswer: '', //正确答案选中值
        question: '', //题目
        analysis: '', //解析
        answerA: '',
        answerB: '',
        answerC: '',
        answerD: '',
        section:''
      },
       postChange2: { //选择题提交内容
         majorId:'',
        type_id: 2,
        rightAnswer: '', //正确答案选中值
        question: '', //题目
        analysis: '', //解析
        answerA: '',
        answerB: '',
        answerC: '',
        answerD: '',
        section:''

      },
      postJudge: { //判断题提交内容
        majorId:'',
        type_id: 3,
        rightAnswer: '', //正确答案选中值
        question: '', //题目
        analysis: '', //解析
        answer:'',
        section:''

      },
      postShortAnswer: { //判断题提交内容
         majorId:'',
        type_id: 4,
        rightAnswer: '', //正确答案选中值
        question: '', //题目
        analysis: '', //解析
        answer:'',
        section:''

      },
    };
  },
  mounted(){
    if(store.state.question.answer!='')
    {
        this.question=store.state.question
        switch (this.question.typeId) {
            case 1:
                this.optionValue='单选题'
                this.postChange.majorId=this.question.majorId
                this.postChange.question=this.question.description
                this.postChange.rightAnswer=this.question.answer
                this.postChange.section=this.question.majorName
                this.postChange.answerA=this.question.selectionA
                this.postChange.answerB=this.question.selectionB
                this.postChange.answerC=this.question.selectionC
                this.postChange.answerD=this.question.selectionD
                break;
            case 2:
                this.optionValue='多选题'
                this.postChange2.majorId=this.question.majorId
                this.postChange2.question=this.question.description
                this.postChange2.rightAnswer=this.question.answer
                this.postChange2.section=this.question.majorName
                this.postChange2.answerA=this.question.selectionA
                this.postChange2.answerB=this.question.selectionB
                this.postChange2.answerC=this.question.selectionC
                this.postChange2.answerD=this.question.selectionD
                break;
            case 3:
                this.optionValue='判断题'
                this.postJudge.majorId=this.question.majorId
                this.postJudge.question=this.question.description
                this.postJudge.rightAnswer=this.question.answer
                this.postJudge.section=this.question.majorName
                break;
            case 4:
                this.optionValue='简答题'
                this.postShortAnswer.majorId=this.question.majorId
                this.postShortAnswer.question=this.question.description
                this.postShortAnswer.rightAnswer=this.question.answer
                this.postShortAnswer.section=this.question.majorName
                break;       
            default:
                break;
        }

    }
  },
  methods:{
    changeSubmit(){
      if(this.postChange.question===''||this.postChange.rightAnswer===''||this.postChange.section==='')
      {
         this.$message({
                      message:'题干和正确答案以及对应专业不能为空!',
                      type:'error'
                    })
        return
      }
      this.$axios.get('/major/list')
    .then((response) =>{
              if(response.data.errno===0){
                for(let i=0;i< response.data.data.length;i++)
                {
                  let value= response.data.data[i]
                  if(value.name===this.postChange.section)
                  {
                    this.postChange.majorId=value.id
                    this.$axios.put('/quest/'+this.question.id,{
                    answer:this.postChange.rightAnswer,
                    description:this.postChange.question,
                    id:this.question.id,
                    majorId:this.postChange.majorId,
                    selectionA:this.postChange.answerA,
                    selectionB:this.postChange.answerB,
                    selectionC:this.postChange.answerC,
                    selectionD:this.postChange.answerD,
                    selectionNum:4,
                    typeId:1
                    
                   }).then((response)=>{
                    console.log(response)
                   })
                   .catch((error) =>{
                    console.log(error);
                    });
                     this.$message({
                      message:'修改成功!',
                      type:'success'
                    })
                    return
                  }
                  else{
                    if(i===response.data.data.length-1)
                    this.$message({
                      message:'没有对应专业!',
                      type:'error'
                    })
                  }
                }
              }
            })
            .catch((error) =>{
              console.log(error);
            });
  },
   change2Submit(){
      if(this.postChange2.question===''||this.postChange2.rightAnswer===''||this.postChange2.section==='')
      {
         this.$message({
                      message:'题干和正确答案以及对应专业不能为空!',
                      type:'error'
                    })
        return
      }
      this.$axios.get('/major/list')
    .then((response) =>{
              if(response.data.errno===0){
                for(let i=0;i< response.data.data.length;i++)
                {
                  let value= response.data.data[i]
                  if(value.name===this.postChange2.section)
                  {
                     this.postChange2.majorId=value.id
                    this.$axios.put('/quest/'+this.question.id,{
                    answer:this.postChange2.rightAnswer,
                    description:this.postChange2.question,
                    id:this.question.id,
                    majorId:this.postChange2.majorId,
                    selectionA:this.postChange2.answerA,
                    selectionB:this.postChange2.answerB,
                    selectionC:this.postChange2.answerC,
                    selectionD:this.postChange2.answerD,
                    selectionNum:4,
                    typeId:2
                    
                   }).then((response)=>{
                    console.log(response)
                   })
                   .catch((error) =>{
                    console.log(error);
                    });
                     this.$message({
                      message:'修改成功!',
                      type:'success'
                    })
                    return
                  }
                  else{
                    if(i===response.data.data.length-1)
                    this.$message({
                      message:'没有对应专业!',
                      type:'error'
                    })
                  }
                }
              }
            })
            .catch((error) =>{
              console.log(error);
            });
  },
    judgeSubmit(){
  if(this.postJudge.question===''||this.postJudge.rightAnswer===''||this.postJudge.section==='')
      {
         this.$message({
                      message:'题干和正确答案以及对应专业不能为空!',
                      type:'error'
                    })
        return
      }
      this.$axios.get('/major/list')
    .then((response) =>{
              if(response.data.errno===0){
                for(let i=0;i< response.data.data.length;i++)
                {
                  let value= response.data.data[i]
                  if(value.name===this.postJudge.section)
                  {
                    this.postJudge.majorId=value.id
                    this.$axios.put('/quest/'+this.question.id,{
                    answer:this.postJudge.rightAnswer,
                    id:this.question.id,
                    description:this.postJudge.question,
                    majorId:this.postJudge.majorId,
                    selectionA:this.postJudge.answerA,
                    selectionB:this.postJudge.answerB,
                    selectionC:this.postJudge.answerC,
                    selectionD:this.postJudge.answerD,
                    selectionNum:2,
                    typeId:3
                    
                   }).then((response)=>{
                    console.log(response)
                   })
                   .catch((error) =>{
                    console.log(error);
                    });
                    this.$message({
                      message:'修改成功!',
                      type:'success'
                    })
                    return
                  }
                  else{
                    if(i===response.data.data.length-1)
                    this.$message({
                      message:'没有对应专业!',
                      type:'error'
                    })
                  }
                }
              }
            })
            .catch((error) =>{
              console.log(error);
            });
    },
    fillSubmit(){
  if(this.postShortAnswer.question===''||this.postShortAnswer.rightAnswer===''||this.postShortAnswer.section==='')
      {
         this.$message({
                      message:'题干和正确答案以及对应专业不能为空!',
                      type:'error'
                    })
        return
      }
      this.$axios.get('/major/list')
    .then((response) =>{
              if(response.data.errno===0){
                for(let i=0;i< response.data.data.length;i++)
                {
                  let value= response.data.data[i]
                  if(value.name===this.postShortAnswer.section)
                  {
                    this.postShortAnswer.majorId=value.id
                    this.$axios.post('/quest/'+this.question.id,{
                    answer:this.postShortAnswer.rightAnswer,
                    id:this.question.id,
                    description:this.postShortAnswer.question,
                    majorId:this.postShortAnswer.majorId,
                    selectionA:this.postShortAnswer.answerA,
                    selectionB:this.postShortAnswer.answerB,
                    selectionC:this.postShortAnswer.answerC,
                    selectionD:this.postShortAnswer.answerD,
                    selectionNum:0,
                    typeId:4
                    
                   }).then((response)=>{
                    console.log(response)
                   })
                   .catch((error) =>{
                    console.log(error);
                    });
                    this.$message({
                      message:'修改成功!',
                      type:'success'
                    })
                    return
                  }
                  else{
                    if(i===response.data.data.length-1)
                    this.$message({
                      message:'没有对应专业!',
                      type:'error'
                    })
                  }
                }
              }
            })
            .catch((error) =>{
              console.log(error);
            });
    }
}
}
</script>
<style scoped>

.add {
	 margin: 0px 40px;
}
 .add .box {
	 padding: 0px 20px;
}
 .add .box ul li {
	 margin: 10px 0px;
	 display: flex;
	 align-items: center;
   
}
 .add .box ul li .el-input {
	 width: 6%;
}
 .add .box ul li .w150 {
	 margin-left: 20px;
	 width: 7%;
}
 .add .el-icon-circle-plus {
	 margin-right: 10px;
}
 .add .icon-daoru-tianchong {
	 margin-right: 10px;
}
 .add .append {
	 margin: 0px 20px;
}
 .add .append ul {
	 display: flex;
	 align-items: center;
}
 .add .append ul li {
	 margin-right: 20px;
}
 .add .append .change {
	 margin-top: 20px;
	 padding: 20px 16px;
	 background-color: #40a0ff86;
	 border-radius: 4px;
}
 .add .append .change .title {
	 padding-left: 6px;
	 color: #2f4f4f;
}
 .add .append .change .title span:nth-child(1) {
	 margin-right: 6px;
}
 .add .append .change .title .answer {
	 margin: 20px 0px 20px 8px;
}
 .add .append .change .title .el-textarea {
	 width: 98% !important;
}
 .add .append .change .options ul {
	 display: flex;
	 flex-direction: column;
}
 .add .append .change .options ul li {
	 display: flex;
	 justify-content: center;
	 align-items: center;
	 width: 98%;
	 margin: 10px 0px;
}
 .add .append .change .options ul li span {
	 margin-right: 20px;

}
 .add .append .change .submit {
   width: 900px;

	 display: flex;
	 justify-content: center;
	 align-items: center;
}
 .add .append .fill .fillAnswer {
	 display: flex;
	 justify-content: center;
	 align-items: center;
}
 .add .append .fill .fillAnswer span {
	 margin-right: 6px;
}
 .add .append .fill .fillAnswer .el-input {
	 width: 91% !important;
}
 .add .append .fill .analysis {
	 margin-top: 20px;
	 margin-left: 5px;
}
 .add .append .judge .judgeAnswer {
	 margin-left: 20px;
	 margin-bottom: 20px;
}
 .add .append .w150 {
	 width: 150px;
}
 .add .append li:nth-child(2) {
	 display: flex;
	 align-items: center;
	 justify-content: center;
}
.w150{
  margin-right: 40px;
}

</style>