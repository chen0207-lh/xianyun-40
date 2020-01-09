<template>
  <div class="post-wrapper">
    <div class="search-wrapper">
      <div class="search-bar el-row is-justify-space-between is-align-middle el-row--flex">
        <input type="text" placeholder="请输入想去的地方，比如：'广州'" v-model="searchCity" />
        <i class="el-icon-search" @click="handlesearchCity"></i>
      </div>
      <div class="search-recommend">
        推荐：
        <span
          id="id"
          v-for="(item,index) in CityList"
          :key="index"
          @click="handleCity(item)"
        >{{item}}</span>
        <!-- <span id="id" @click="handleCity()">上海</span>
        <span id="id" @click="handleCity()">北京</span>-->
      </div>
    </div>
    <div class="post-title el-row is-justify-space-between is-align-middle el-row--flex">
      <h4>推荐攻略</h4>
      <button type="button" class="el-button el-button--primary">
        <!---->
        <i class="el-icon-edit"></i>
        <span>写游记</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchCity: "",
      CityList: ["广州", "上海", "北京"],
      postsList: []
    };
  },
  mounted() {
    const { city } = this.$route.query;
    console.log(city);
    this.$axios({
      url: "/posts",
      data: { city }
    }).then(res => {
      console.log(res);
      this.postsList = res.data.data;
      this.total = res.data.total;
    });
  },
  methods: {
    handleCity(value) {
      const arr = this.postsList.filter(v => {
        let res = value.slice(0, 2) + "市" + value.slice(2);
        console.log(res);
        return res === v.city.name;
      });
      this.$emit("recommendCity", arr);
    },
    handlesearchCity() {
      this.searchCity;
      if (this.searchCity.trim() === "") {
        this.$message.error("请输入内容");
        return
      }
      // 过滤是否符合的数据
      const arr = this.postsList.filter(v => {
        // 判断this.searchCity的值是否符合数据中的name
        // name的值中的有市字的，有可能输入的会是不带市字的，所以需要添加
        if (this.searchCity !== v.city.name) {
          let res =
            this.searchCity.slice(0, 2) + "市" + this.searchCity.slice(2);
          console.log(res);
          return res === v.city.name;
        }
        return this.searchCity === v.city.name;
      });
      this.$emit("setSearch", arr);
    }
  }
};
</script>

<style lang='less' scoped>
.post-wrapper {
  width: 700px;
}
.search-wrapper .search-bar {
  width: 100%;
  box-sizing: border-box;
  height: 40px;
  line-height: 40px;
  border: 3px solid orange;
}

.search-wrapper .search-bar input {
  flex: 1;
  padding: 0 20px;
  line-height: 40px;
  outline: none;
  border: none;
  background: none;
}

.search-wrapper .search-bar i {
  font-size: 24px;
  color: orange;
  font-weight: 700;
  margin-right: 10px;
}

.search-wrapper .search-recommend {
  padding: 10px 0;
  font-size: 12px;
  color: #666;
}

.search-wrapper .search-recommend span {
  margin-right: 5px;
}

.search-wrapper .search-recommend span:hover {
  color: orange;
  text-decoration: underline;
  cursor: pointer;
}

.post-title {
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  position: relative;
}

.post-title h4 {
  font-weight: 400;
  font-size: 18px;
  color: orange;
}

.post-title h4:after {
  display: block;
  content: "";
  width: 72px;
  height: 2px;
  background: orange;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>