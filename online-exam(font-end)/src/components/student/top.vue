<template>
    <div id="top">
        <el-menu
            :default-active="this.$route.path"
            class="el-menu-demo menu"
            mode="horizontal"
            background-color="#fff"
            active-text-color="#0195ff"
            :router="true">
            <el-menu-item index="title" :route="this.$route.path" class="title"><i class="el-icon-reading icon"></i><span>Online-Exam</span></el-menu-item>
            <el-menu-item index="/student" class="item">考试中心</el-menu-item>
            <el-menu-item index="/student/papers">我的试卷</el-menu-item>
            <el-menu-item index="divider" :route="this.$route.path"><el-divider direction="vertical"></el-divider></el-menu-item>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-user"></i></template>
                <el-menu-item index="/student/manager">个人中心</el-menu-item>
                <el-menu-item index="/">退出</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: 'StudentTop',
        methods: {
        }
    }
</script>

<style scoped>
    #top {
        margin: 0px 70px;
    }

    .menu {
        height: 60px;
        position: fixed;
        z-index: 10;
    }

    .title {
        color: #409eff;
        font-weight: bold;
        font-size: 20px;
    }

    .icon {
        font-size: 30px;
        margin-right: 15px;
        color: #409eff ;
    }

    .el-menu>.item {
        margin-left: 737px;
    }
</style>