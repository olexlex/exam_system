<template>
  <div id="admin">
    <top/>
    <section>
       <div>
          <el-container>
          <leftlist/>
          <maincontent/>
          </el-container>
       </div>
    </section>
  </div>
</template>

<script>
import top from '@/components/admin/Top'
import maincontent from '@/components/admin/MainContent'
import leftlist from '@/components/admin/LeftList'
export default {
  components:{
    top,maincontent,leftlist
  }
}
</script>
<style  scoped>

</style>
