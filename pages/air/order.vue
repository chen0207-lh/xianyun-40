<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <!-- 把数据传递给子组件orderForm -->
        <orderForm :data="infoData" />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <orderAside :data="infoData" />
      </div>
    </el-row>
  </div>
</template>

<script>
import orderForm from "@/components/air/orderForm.vue";
import orderAside from "@/components/air/orderAside.vue";
export default {
  data() {
    return {
      // 当前选中的机票信息
      infoData: {
        // 座位列表
        seat_infos: {}
      }
    };
  },
  components: {
    orderForm,
    orderAside
  },
  mounted() {
    //   获取到URL上的参数
    const { id, seat_xid } = this.$route.query;
    //   发送请求获取机票列表的详情数据
    this.$axios({
      url: "/airs/" + id,
      params: {
        seat_xid
      }
    }).then(res => {
      console.log(res);
      // 赋值给infoData
      this.infoData = res.data;
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}
/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>