<template>
  <div>
    <div>
        <!-- v-for="(item,index) in ['新闻','体育','娱乐']" :key="index" -->
      <span v-for="(item,index) in tabList" :key="index"
       @click="handleClick(index)"
       :class="{active: current===index}"
       style="padding:10px;">{{item}}</span>
    </div>
    <div v-if="current===0">
      <ul>
        <li>新闻1</li>
        <li>新闻1</li>
        <li>新闻1</li>
        <li>新闻1</li>
      </ul>
    </div>
    <div v-if="current===1">
      <ul>
        <li>体育1</li>
        <li>体育1</li>
        <li>体育1</li>
        <li>体育1</li>
      </ul>
    </div>
    <div v-if="current===2"> 
      <ul>
        <li>娱乐1</li>
        <li>娱乐1</li>
        <li>娱乐1</li>
        <li>娱乐1</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            tabList:['新闻','体育','娱乐'],
            current:0
        }
    },
    methods: {
        handleClick(index){
            this.current = index
        }
    }
}
</script>

<style lang='less' scoped>
.active{
    color:red;
}
</style>