<template>
    <el-menu
        default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#fff"
        active-text-color="#0195ff"
        router="true">
        <el-menu-item index="1" route="/student">考试中心</el-menu-item>
        <el-menu-item index="2" route="/student/papers">我的试卷</el-menu-item>
        <el-submenu index="3">
            <template slot="title">{{$store.state.user.name}}</template>
            <el-menu-item index="3-1">个人中心</el-menu-item>
            <el-menu-item index="3-2">退出</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>

<style>

</style>