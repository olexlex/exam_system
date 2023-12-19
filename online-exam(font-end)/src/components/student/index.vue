<template>
    <div id="student">
        <Top/>
        <router-view ></router-view>
    </div>
</template>

<script>
    import Top from "./top.vue"

    export default {
        name: 'StudentIndex',
        components: {
            Top,
        }
    }
</script>

<style>
#student{
   background-color: #eee;
  /* margin-top: 60px;  */
}
</style>
