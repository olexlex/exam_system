<template>
    <div id="message">
        <el-descriptions title="个人信息" :column="1" border>
            <el-descriptions-item label="姓名">{{userProfile.name}}</el-descriptions-item>
            <el-descriptions-item label="年龄">{{userProfile.age}}</el-descriptions-item>
            <el-descriptions-item label="家庭地址" :span="2">{{userProfile.address}}</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{userProfile.email}}</el-descriptions-item>
            <el-descriptions-item label="电话">{{userProfile.phone}}</el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script>
    export default {
        name: 'StudentMessage',
        data() {
            return {
                userProfile: {}
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.$axios.get(`/user/profile/${localStorage.id}`).then(
                    res => {
                        this.userProfile = res.data.data
                        console.log(this.userProfile)
                    },
                    error => {
                        console.log(error.message)
                    }
                )
            }
        }
    }
</script>

<style scoped>
    #message {
        width: 600px;
        margin-bottom: 600px;
    }
</style>