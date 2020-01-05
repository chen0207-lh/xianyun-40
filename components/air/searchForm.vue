<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市" prop="departCity">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="from.departCity"
          @blur="handleDepartblur"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市" prop="destCity">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          v-model="from.destCity"
          @blur="handleDestblur"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间" prop="deparDate">
        <!-- change 用户确认选择日期时触发 -->
        <!-- :picker-options="pickerOptions  禁用时间，禁用今天以前的时间 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          v-model="from.deparDate"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
// 引入时间插件
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      from: {
        departCity: "", //出发成市
        departCode: "", //出发城市代码
        destCity: "", //到达城市
        destCode: "", //到达城市代码
        deparDate: "" //出发时间
      },
      //   出发城市的下拉列表
      departData: [],
      //   到达城市的下拉列表
      destData: [],
      //   禁用今天之前的日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 < Date.now();
        }
      }
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      //   console.log(item, index);
      this.tabs.icon = item.icon;
      this.tabs.name = item.name;
      this.currentTab = index;
      if (this.currentTab === 1) {
        // this.$message.info("抱歉，暂时还没有往返机票");
        this.$alert("抱歉，暂时还没有往返机票", "提示", {
          confirmButtonText: "确定"
        });
        return (this.currentTab = 0);
      }
    },

    // 出发城市输入框失去焦点时触发
    handleDepartblur() {
      if (this.departData.length > 0) {
        // 默认选择中下拉列表的第一个出发城市名称
        this.from.departCity = this.departData[0].value;
        this.from.departCode = this.departData[0].sort;
      }
    },
    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, callback) {
      console.log(value);
      // 出发输入框输入内容会后会一直加载着，所以如果没有输入内容就不发起请求获取数据
      if (value.trim() === "") {
        // 出发输入框如果没有输入内容直接输出一个空数组
        callback([]);
        return;
      }
      // 发请求获取城市列表
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        console.log(res);
        const { data } = res.data;
        this.departData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        callback(this.departData);
      });
    },

    // 目标城市输入框失去焦点时触发
    handleDestblur() {
      if (this.destData.length > 0) {
        // 默认选择中下拉列表的第一个目标城市名称
        this.from.destCity = this.destData[0].value;
        this.from.destCode = this.destData[0].sort;
      }
    },
    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    // 代码和出发城市的差不多一样的
    queryDestSearch(value, callback) {
      if (value.trim() === "") {
        callback([]);
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
        this.destData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        callback(this.destData);
      });
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      // 获取到选中的城市代码
      this.from.departCode = item.sort;
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      // 获取到当前选中的城市代码
      this.from.destCode = item.sort;
    },

    // 确认选择日期时触发
    handleDate(value) {
      // 日期格式化moment(value).format('YYYY-MM-DD') 2020-1-1  具体参考Moment.js时间插件
      this.from.deparDate = moment(value).format("YYYY-MM-DD");
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      const { departCity, departCode, destCity, destCode } = this.from; //?
      this.from.departCity = destCity;
      this.from.departCode = destCode;

      this.from.destCity = departCity;
      this.from.destCode = departCode;
    },

    // 提交表单是触发
    handleSubmit() {
      // 自定义rules规则校验
      const rules = {
        departCity: {
          value: this.from.departCity,
          err_message: "出发城市不能为空"
        },
        destCity: {
          value: this.from.destCity,
          err_message: "到达城市不能为空"
        },
        deparDate: {
          value: this.from.deparDate,
          err_message: "出发日期不能为空"
        }
      };
      // 验证变量
      let valid = true;
      //   循环遍历上面的每一项判断rules的值是否为空
      Object.keys(rules).forEach(key => {
        //   判断valid是否为false，如果是为false就没有必要在循环
        if (valid === false) return;
        // 判断是否为空
        if (rules[key].value === "") {
          // 如果为空，输出当前那一项eer_message错误提示
          this.$message.error(rules[key].err_message);
          valid = false;
          return;
        }
      });

      if (valid === false) return;
      //   跳转到飞机列表页面
      this.$router.push({
        path: "/air/flights",
        // 带参数传递跳转过去
        query: this.from
      });
      // 把数据存储到store中
      this.$store.commit('air/setHistory',this.from)
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
