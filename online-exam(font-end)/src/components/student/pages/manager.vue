<template>
    <div id="container">
        <el-container>
            <el-aside width="200px">
                <el-menu
                    default-active="1"
                    :router=true
                >
                    <el-menu-item index="1" route="/student/manager">
                        <i class="el-icon-menu"></i>
                        <span slot="title">个人信息</span>
                    </el-menu-item>
                    <el-menu-item index="2" route="/student/manager/message">
                        <i class="el-icon-menu"></i>
                        <span slot="title">修改信息</span>
                    </el-menu-item>
                    <el-menu-item index="3" route="/student/manager/password">
                        <i class="el-icon-menu"></i>
                        <span slot="title">修改密码</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main><router-view></router-view></el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'MessageManager'
    }
</script>

<style>
    #container {
        margin: 0 70px;
        padding-top: 60px;
    }

    .el-menu {
        height: 100%;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #fff;
    }
</style>