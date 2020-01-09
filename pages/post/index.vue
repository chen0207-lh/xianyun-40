<template>
  <div class="post">
    <div class="left">
      <recommendcity :data="postsList" @handleClickCity="handleClickCity" />
    </div>
    <div class="rigth">
      <div>
        <postheader :data="postsList" @setSearch="setSearch" @recommendCity="recommendCity" />
      </div>
      <div>
        <div class="post-list">
          <div>
            <!---->
            <div class="post-item card" v-for="(item,index) in postsList" :key="index">
              <h4 title="塞班贵？一定是你的打开方式不对！6000块玩转塞班" class="post-title">
                <a :href="`/post/detail?id=${item.id}`" class>{{item.title}}</a>
              </h4>
              <p class="post-desc">
                <!-- v-html="`${item.content}`" -->
                <a :href="`/post/detail?id=${item.id}`" class>{{item.summary}}</a>
              </p>
              <div class="card-images el-row is-justify-space-between is-align-middle el-row--flex">
                <a :href="`/post/detail?id=${item.id}`">
                  <img  :src="`${item.images[0]}`" />
                </a>
                <a :href="`/post/detail?id=${item.id}`">
                  <img :src="`${item.images[1]}`" />
                </a>
                <a :href="`/post/detail?id=${item.id}`">
                  <img  :src="`${item.images[2]}`" />
                </a>
              </div>
              <span class="post-info el-row is-justify-space-between el-row--flex">
                <div class="post-info-left el-row is-align-middle el-row--flex">
                  <span>
                    <i class="el-icon-location-outline"></i>
                    <!-- {{handleCity(item.city.name)}} -->
                    {{item.city.name}}
                  </span>
                  <div class="post-user el-row is-align-middle el-row--flex">
                    &nbsp;&nbsp; by &nbsp;&nbsp;
                    <a href="/user/personal">
                      <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" />
                    </a>
                    <a href="/user/personal" class="username">{{item.account.nickname}}</a>
                  </div>
                  <span>
                    <i class="el-icon-view"></i> 12651
                  </span>
                </div>
                <span class="post-info-right">{{item.watch}} 赞</span>
              </span>
              <!-- </span>
              </span>-->
            </div>
          </div>
          <div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-sizes="[2, 4, 6, 8]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import postheader from "@/components/post/postheader.vue";
import recommendcity from "@/components/post/recommendcity.vue";
// import postList from "@/components/post/postList.vue";
export default {
  components: {
    recommendcity,
    postheader
    // postList
  },
  data() {
    return {
      searchCity: "",
      postsList: [],
      total: 0,
      pageIndex: 1,
      pageSize: 5,
      city: ""
    };
  },
  mounted() {
    this.handlepostList();
  },
  methods: {
    handlepostList() {
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
    // 切换分页数时触发
    handleCurrentChange(val) {
      console.log(val);
      this.pageIndex = val;
    },
    // 切换分页条数时触发
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
    },
    // 搜索时筛选数据
    setSearch(value) {
      // if (value.trim() === "") {
      //   this.$message.error("请输入内容");
      // }
      // // 过滤是否符合的数据
      // const arr = this.postsList.filter(v => {
      //   // 判断value的值是否符合数据中的name
      //   // name的值中的有市字的，有可能输入的会是不带市字的，所以需要添加
      //   if (value !== v.city.name) {
      //     let res = value.slice(0, 2) + "市" + value.slice(2);
      //     console.log(res);
      //     return res === v.city.name;
      //   }
      //   return value === v.city.name;
      // });
      this.postsList = value;
    },
    // 点击搜索获取数据
    recommendCity(value) {
      // // this.handlepostList()
      // console.log(value);
      // const arr = this.postsList.filter(v => {
      //   let res = value.slice(0, 2) + "市" + value.slice(2);
      //   console.log(res);
      //   return res === v.city.name;
      // });
      this.postsList = value;

      // // if (this.$store.state.post.postList !== "") {
      // //   this.$store.state.post.postList.splice();
      // // }
      // this.$store.commit("post/SearchClick", arr);
      // console.log(this.$store.state.post.postList);
      // this.postsList.data = this.$store.state.post.postList;
    },
    handleClickCity(arr) {
      // let val = this.$route.query.city;
      // console.log(val);
      // const arr = this.postsList.filter(v => {
      //   let res = val.slice(0, 2) + "市" + val.slice(2);
      //   console.log(res);
      //   return res === v.city.name;
      // });
      this.postsList = arr;
    }
  }
};
</script>

<style lang='less' scoped>
.post {
  display: flex;
  .left {
    margin: 20px 20px 20px 120px;
  }
  .rigth {
    margin: 20px;
    width: 700px;
  }
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
.post-info-left {
  font-size: 12px;
  color: #999;
}
.post-user img {
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 100px;
  margin: 5px;
}
.post-info-right {
  color: orange;
}
.post-info-left .username {
  margin-right: 10px;
}
.post-title {
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  position: relative;
}
.post-item {
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}
.post-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 15px;
  font-weight: 400;
  font-size: 18px;
}
.post-desc {
  margin-bottom: 15px;
  line-height: 1.5;
  font-size: 14px;
  height: 63px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
}
.post-desc a {
  color: #666;
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
.card-images img {
  width: 220px;
  height: 150px;
  display: block;
  -o-object-fit: cover;
  object-fit: cover;
}
</style>