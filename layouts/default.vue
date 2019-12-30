<template>
  <div>
    <Header/>
    <!-- nuxt相当于router-view，组件的占位符 -->
    <nuxt />
    <Footer/>
  </div>
</template>
<script>
// 引入头部
import Header from '@/components/header.vue'
// 引入底部
import Footer from '@/components/footer.vue'
export default {
  // 注册组件
  components: {
    Header,Footer
  }
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
}
ul,li,ol{
  list-style: none;
} 
a{
  color: inherit;
  text-decoration: none;
}
a:hover{
  color: inherit;
}
i,em{
  font-style: normal;
}
</style>
