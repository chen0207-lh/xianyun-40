<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{this.$route.query.deparDate}}
      </el-col>
      <el-col :span="4">
        <!--  @change="handleAirport" -->
        <el-select size="mini" v-model="airport" placeholder="起飞机场">
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <!-- @change="handleFlightTimes" -->
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间">
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from} ,${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <!--  @change="handleCompany" -->
        <el-select size="mini" v-model="company" placeholder="航空公司">
          <el-option
            v-for="(item,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <!-- @change="handleAirSize" -->
        <el-select size="mini" v-model="airSize" placeholder="机型">
          <el-option
            v-for="(item,index) in flightSize"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <!-- @click="handleFiltersCancel" 点击清空刚刚选中的筛选数据 -->
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
    <!-- 因为使用computed计算属性会返回一个值 如果不在本页面调用就不能运行，所以就随便调用下为了让函数执行起来 -->
    <span>{{filterData}}</span>
  </div>
</template>

<script>
export default {
  props: {
    // 从父组件传递过来的数据
    data: {
      // 类型
      type: Object,
      // 如果传递过来发的值没有引用时会自动输出空对象{}
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小

      flightSize: [
        { label: "大", value: "L" },
        { label: "中", value: "M" },
        { label: "小", value: "S" }
      ]
    };
  },
  computed: {
    // 多选
    filterData() {
      let arr = this.data.flights.filter(item => {
        let vaild = true;
        // 选择机场
        if (this.airport && item.org_airport_name !== this.airport) {
          vaild = false;
        }
        // 起飞时间
        if (this.flightTimes) {
          const [from, to] = this.flightTimes.split(",");
          const start = item.dep_time.split(":")[0];
          if (start < from || start >= to) {
            vaild = false;
          }
        }
        // 航空公司
        if (this.company && item.airline_name !== this.company) {
          vaild = false;
        }
        // 机型
        if (this.airSize && item.plane_size !== this.airSize) {
          vaild = false;
        }
        return vaild;
      });
      // 发射事件
      this.$emit("setDataList", arr);
      // 因为使用computed计算属性要返回一个值，并要在本页面调用一下不然就不能运行，为了调用了不影响页面的布局所以返回一个空的值
      return "";
    }
  },
  methods: {
    // 选择单个
    // // 选择机场时候触发
    // handleAirport(value) {
    //   // 过滤后的数组
    //   const arr = this.data.flights.filter(v => {
    //     return value === v.org_airport_name;
    //   });
    //   // 发射事件到父组件
    //   this.$emit("setDataList", arr);
    // },

    // // 选择出发时间时候触发
    // handleFlightTimes(value) {
    //   const [from, to] = value.split(",");
    //   const arr = this.data.flights.filter(v => {
    //     const start = +v.dep_time.split(":")[0];
    //     return start >= +from && start < +to;
    //   });
    //   this.$emit("setDataList", arr);
    // },

    // // 选择航空公司时候触发
    // handleCompany(value) {
    //   const arr = this.data.flights.filter(v => {
    //     return value === v.airline_name;
    //   });
    //   this.$emit("setDataList", arr);
    // },

    // // 选择机型时候触发
    // handleAirSize(value) {
    //   const arr = this.data.flights.filter(v => {
    //     return value === v.plane_size;
    //   });
    //   this.$emit("setDataList", arr);
    // },

    // 撤销条件时候触发 清空所有筛选的数据
    handleFiltersCancel() {
      this.airport="", // 机场
      this.flightTimes= "", // 出发时间
      this.company= "", // 航空公司
      this.airSize= "" // 机型大小
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>