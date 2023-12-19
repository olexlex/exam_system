<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="学生账号" prop="account">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="学生密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input v-model="form.password2"></el-input>
      </el-form-item>
      <el-form-item label="学生名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="学生电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="学生年龄" prop="age">
        <el-input v-model="form.age"></el-input>
      </el-form-item>
      <el-form-item label="学生邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="学生地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')"
          >立即创建</el-button
        >
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        account: "",
        password: "",
        password2: "",
        name: "",
        age: "",
        email: "",
        phone: "",
        address: "",
      },
      id: "",

      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password2: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
        ]
      },
    };
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.onSubmit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onSubmit() {
      this.$axios
        .post("/user/user/", {
          name: this.form.account,
          password: this.form.password,
          typeId: "2",
        })
        .then((response) => {
          console.log(response);
          if (response.data.errno === 0) {
            this.id = response.data.data.id;
            this.$axios
              .put("/user/profile/" + this.id, {
                userId: this.id,
                name: this.form.name,
                phone: this.form.phone,
                email: this.form.email,
                address: this.form.address,
                age: this.form.age,
                typeId: 2,
              })
              .then((response) => {
                if (response.data.errno === 0) {
                  this.$message({
                    showClose: true,
                    type: "success",
                    message: "添加成功！",
                  });
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          } else if (response.data.errno === 600) {
            this.$message({
              showClose: true,
              type: "error",
              message: "添加失败,用户已经存在!",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>