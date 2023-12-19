<template>
    <div id="message">
        <h3>修改个人信息</h3>
        <el-form label-position="right" :model="ruleForm" status-icon ref="ruleForm" label-width="100px">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" type="text"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input v-model="ruleForm.age" type="text"></el-input>
            </el-form-item>
            <el-form-item label="家庭地址" prop="address">
                <el-input v-model="ruleForm.address" type="text"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email" type="text"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-input v-model.number="ruleForm.phone" type="text"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {},
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.$axios.get(`/user/profile/${localStorage.id}`).then(
                    res => {
                        this.ruleForm = res.data.data
                        console.log(this.ruleForm)
                    },
                    error => {
                        console.log(error.message)
                    }
                )
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios({ //修改信息
                        url: `/user/profile/${localStorage.id}`,
                        method: 'put',
                        data: {
                            address: this.ruleForm.address,
                            age: this.ruleForm.age,
                            email: this.ruleForm.email,
                            name: this.ruleForm.name,
                            phone: this.ruleForm.phone,
                            userId: localStorage.id
                        }
                    }).then(res => {
                        if(res.data != null ) { //修改成功提示
                            this.$message({
                                message: '信息修改成功...',
                                type: 'success'
                            })
                        }
                    })
                } else {
                    console.log('error submit!!')
                    return false;
                }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
            }
        }
    }
</script>

<style scoped>
    h3 {
        margin-left: 100px;
        margin-bottom: 20px;
    }

    #message {
        width: 600px;
        margin-bottom: 400px;
    }
</style>