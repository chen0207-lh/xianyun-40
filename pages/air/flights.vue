<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <flightsFilters :data="cacheFlightsData" @setDataList="setDataList" />
        </div>

        <div>
          <!-- 航班头部布局 -->
          <flightsListHead/>
        </div>

        <!-- 航班列表信息   :data="item" 传递数据到flightsItem.vue渲染数据 -->
        <div>
          <flightsItem v-for="(item,index) in dataList" :key="index" :data="item" />

          <!-- 分页 -->
          <!-- size-change：pageSize 改变时会触发，返回每页条数 
          current-change ：currentPage 改变时会触发，返回当前页-->
          <!-- :current-page当前页数 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
      <flightsAside />
    </el-row>
  </section>
</template>

<script>
// 引入机票列表头部
import flightsListHead from "@/components/air/flightsListHead.vue";
// 引入机票列表
import flightsItem from "@/components/air/flightsItem.vue";
import flightsFilters from "@/components/air/flightsFilters.vue";
import flightsAside from "@/components/air/flightsAside.vue";
import moment from "moment";

export default {
  data() {
    return {
      flightsData: {
        info: {},
        options: {},
        flights: []
      }, // 航班总数据
      cacheFlightsData: {
        info: {},
        options: {},
        flights: []
      },
      //   dataList: [], // 航班列表数据，用于循环flightsItem组件，单独出来是因为要分页
      pageIndex: 1, // 当前页码
      pageSize: 5, // 当前页条数
      total: 0 // 总数
    };
  },
  components: {
    flightsListHead,
    flightsItem,
    flightsFilters,
    flightsAside
  },
  watch: {
    $route() {
      this.getflightsList();
    }
  },
  computed: {
    // 计数属性的监听函数内部引用实例属性的变化，一旦属性发生了变化，该函数也会重新计算，并且返回一个新的值
    dataList() {
      // 判断如果请求还没有完成，就返回一个空数组
      if (!this.flightsData.flights) return [];
      return this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    }
  },
  mounted() {
    //   请求获取机票列表页数据
    this.getflightsList();
    // this.$axios({
    //   url: "/airs",
    //   params: this.$route.query //获取到从机票首页从URL路径传递过来的五个 参数
    // }).then(res => {
    //   console.log(res);
    //   this.flightsData = res.data;
    //   this.cacheFlightsData={...res.data}
    //   // 页数的总数量
    //   this.total = this.flightsData.total;
    // });
  },
  methods: {
    getflightsList() {
      //   请求获取机票列表页数据
      this.$axios({
        url: "/airs",
        params: this.$route.query //获取到从机票首页从URL路径传递过来的五个 参数
      }).then(res => {
        console.log(res);
        this.flightsData = res.data;
        this.cacheFlightsData = { ...res.data };
        // 页数的总数量
        this.total = this.flightsData.total;
        // 分页初始化值为1
        this.pageIndex = 1;
      });
    },
    // 根据过滤好的数据修改this.flightsData.flights
    setDataList(arr) {
      // console.log(arr);
      // arr就是修改过滤后的数据
      this.flightsData.flights = arr;
      // 根据过滤好的数据修改总条数的数据
      this.total = arr.length;
    },
    //  切换分页条数时触发
    handleSizeChange(val) {
      this.pageSize = val;
    },
    // 切换分页数时触发
    handleCurrentChange(val) {
      this.pageIndex = val;
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>