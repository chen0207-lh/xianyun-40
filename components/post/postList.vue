<template>
  <div>
    <div class="post-wrapper">
      <div class="search-wrapper">
        <div class="search-bar el-row is-justify-space-between is-align-middle el-row--flex">
          <input type="text" placeholder="请输入想去的地方，比如：'广州'" v-model="searchCity" />
          <i class="el-icon-search" @click="handleCity"></i>
        </div>
        <div class="search-recommend">
          推荐：
          <span>广州</span>
          <span>上海</span>
          <span>北京</span>
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
    <div class="post-list">
      <div>
        <!---->
        <div class="post-item card" v-for="(item,index) in postsList.data" :key="index">
          <h4 title="塞班贵？一定是你的打开方式不对！6000块玩转塞班" class="post-title">
            <a href="`/post/detail?id=${item.id}`" class>{{item.title}}</a>
          </h4>
          <p class="post-desc">
            <!-- v-html="`${item.content}`" -->
            <a href="`/post/detail?id=${item.id}`" class>{{item.summary}}</a>
          </p>
          <div class="card-images el-row is-justify-space-between is-align-middle el-row--flex">
            <a href="`/post/detail?id=${item.id}`">
              <img :src="`${item.images[0]}`" />
            </a>
            <a href="`/post/detail?id=${item.id}`">
              <img :src="`${item.images[1]}`" />
            </a>
            <a href="`/post/detail?id=${item.id}`">
              <img :src="`${item.images[2]}`" />
            </a>
          </div>
          <span class="post-info el-row is-justify-space-between el-row--flex">
            <div class="post-info-left el-row is-align-middle el-row--flex">
              <span>
                <i class="el-icon-location-outline"></i>
                <!-- {{item.city.name}}{{handleCity(item.city.name)}} -->
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
</template>

<script>
export default {
  data() {
    return {
      searchCity: "",
      postsList: [],
      total: 0,
      pageIndex: 1,
      pageSize: 5
    };
  },
  mounted() {
    const { city } = this.$route.query;
    this.$axios({
      url: "/posts",
      city
    }).then(res => {
      console.log(res);
      this.postsList = res.data;
      this.total = res.data.total;
      this.$store.state.commit("post/getPostList", this.postsList);
    });
  },
  methods: {
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
    handleCity() {}
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