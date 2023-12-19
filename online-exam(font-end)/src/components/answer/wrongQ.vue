<template>
  <div id="wrongQ">
    <div id="resTopMenu">
      <i class="el-icon-arrow-left" @click="back"></i>
    </div>
    <div id="resmain">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first">
          <div id="entityQ" v-for="(value, index) in allWrongQ" :key="index">
            <el-descriptions class="margin-top" :column="2" border>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-info"></i>
                  题号
                </template>
                {{ parseInt(value) + 1 }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-s-order"></i>
                  题目内容
                </template>
                {{ Qlist[value].description }}
              </el-descriptions-item>

              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-error" type="danger"></i>
                  你的作答
                </template>
                <el-tag size="small">{{ Alist[value].questAnswer }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-success"></i>
                  正确答案
                </template>
                <!-- <el-tag size="small" type="success">{{
                  Qlist[value].answer
                }}</el-tag> -->
                {{Qlist[value].answer}}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-tab-pane>

        <el-tab-pane label="单选题" name="second">
          <div id="entityQ" v-for="(value, index) in singleWrongQ" :key="index">
            <el-descriptions class="margin-top" :column="2" border>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-info"></i>
                  题号
                </template>
                {{ parseInt(value) + 1 }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-s-order"></i>
                  题目内容
                </template>
                {{ Qlist[value].description }}
              </el-descriptions-item>

              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-error" type="danger"></i>
                  你的作答
                </template>
                <el-tag size="small">{{ Alist[value].questAnswer }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-success"></i>
                  正确答案
                </template>
                <el-tag size="small" type="success">{{
                  Qlist[value].answer
                }}</el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-tab-pane>
        <el-tab-pane label="多选题" name="third">
          <div id="entityQ" v-for="(value, index) in multipleWrongQ" :key="index">
            <el-descriptions class="margin-top" :column="2" border>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-info"></i>
                  题号
                </template>
                {{ parseInt(value) + 1 }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-s-order"></i>
                  题目内容
                </template>
                {{ Qlist[value].description }}
              </el-descriptions-item>

              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-error" type="danger"></i>
                  你的作答
                </template>
                <el-tag size="small">{{ Alist[value].questAnswer }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-success"></i>
                  正确答案
                </template>
                <el-tag size="small" type="success">{{
                  Qlist[value].answer
                }}</el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-tab-pane>
        <el-tab-pane label="判断题" name="fourth">
          <div id="entityQ" v-for="(value, index) in judgeWrongQ" :key="index">
            <el-descriptions class="margin-top" :column="2" border>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-info"></i>
                  题号
                </template>
                {{ parseInt(value) + 1 }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-s-order"></i>
                  题目内容
                </template>
                {{ Qlist[value].description }}
              </el-descriptions-item>

              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-error" type="danger"></i>
                  你的作答
                </template>
                <el-tag size="small">{{ Alist[value].questAnswer }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-success"></i>
                  正确答案
                </template>
                <el-tag size="small" type="success">{{
                  Qlist[value].answer
                }}</el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-tab-pane>
        <el-tab-pane label="简答题" name="fifth">
          <div id="entityQ" v-for="(value, index) in ansWrongQ" :key="index">
            <el-descriptions class="margin-top" :column="2" border>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-info"></i>
                  题号
                </template>
                {{ parseInt(value) + 1 }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-s-order"></i>
                  题目内容
                </template>
                {{ Qlist[value].description }}
              </el-descriptions-item>

              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-error" type="danger"></i>
                  你的作答
                </template>
                <el-tag size="small">{{ Alist[value].questAnswer }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-success"></i>
                  正确答案
                </template>
                <!-- <el-tag size="small" type="success">{{
                  Qlist[value].answer
                }}</el-tag> -->
                {{Qlist[value].answer}}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: "wrongQ",
  data() {
    return {
      activeName: "first",
      WrongQ: [],
      Alist: [],
      Qlist: [],
      singleNum: 0,
      multipleNum: 0,
      judgeNum: 0,
      ansNum: 0,
      testID: null
    };
  },
  computed: {
    allWrongQ: function () {
      return this.WrongQ;
    },
    singleWrongQ: function () {
      return this.WrongQ.filter((entity) => entity < this.singleNum);
    },
    multipleWrongQ: function () {
      return this.WrongQ.filter(
        (entity) =>
          (entity < this.singleNum + this.multipleNum) &
          (entity >= this.singleNum)
      );
    },
    judgeWrongQ: function () {
      return this.WrongQ.filter(
        (entity) =>
          (entity < this.singleNum + this.multipleNum + this.judgeNum) &
          (entity >= this.singleNum + this.multipleNum)
      );
    },
    ansWrongQ: function () {
      return this.WrongQ.filter(
        (entity) =>
          (entity <
            this.singleNum + this.multipleNum + this.judgeNum + this.ansNum) &
          (entity >= this.singleNum + this.multipleNum + this.judgeNum)
      );
    },
  },
  created() {
    this.getData();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getData() {
      this.WrongQ = this.$route.params.WrongQ;
      //console.log(this.WrongQ);
      this.Alist = this.$route.params.Alist;
      //console.log(this.Alist);
      this.Qlist = this.$route.params.Qlist;
      this.singleNum = this.$route.params.singleNum;
      this.multipleNum = this.$route.params.multipleNum;
      this.judgeNum = this.$route.params.judgeNum;
      this.ansNum = this.$route.params.ansNum;
      this.testID = this.$route.params.testID;
    },
    back() {
      this.$router.push({path:"/resDetailList",query:{testID: this.testID}})
    }
  },
};
</script>

<style>
#wrongQ {
  margin-left: 10px;
  margin-top: 20px;

  width: 90%;
  padding: 30px;
}
#resmain{
  margin-left: 10%;
}
#entityQ {
  margin-bottom: 15px;
  width: 70%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>