<template>
  <div class="content">
    <div class="detail" v-for="(item,index) in detailList" :key="index">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/post">旅游攻略</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
      </el-breadcrumb>
      <h1 class="title">{{item.title}}</h1>
      <div class="time">
        <span>攻略：2019-05-22</span>
        <span>10:57</span>
        <span>阅读：12943</span>
      </div>
      <div v-html="`${item.content}`"></div>
    </div>
    <div class="strategy">
      <h3>相关攻略</h3>
      <div v-for="(item,index) in recommend" :key="index">
        <a :href="`detail?id=${item.id}`" class="strategylist" @click='handleArticle(item.id)'>
         <div class="strategylist">
            <img v-if="item.images.length!==0" :src="`${item.images[0]}`" alt />
          <div>
            <h4>{{item.title}}</h4>
            <p>2020-01-09 10:00 阅读 2{{item.id}}</p>
          </div>
         </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailList: [],
      recommend: {}
    };
  },
  mounted() {
    const { id } = this.$route.query;
    console.log(id)
    this.$axios({
      url: "/posts",
      params: {
        id
      }
    }).then(res => {
      if (res.status===200) {
        this.detailList = res.data.data;
        console.log(this.detailList);
      }
    });

    this.$axios({
      url: "/posts/recommend",
      data: id
    }).then(res => {
      console.log(res);
      this.recommend = res.data.data;
    });
  }
};
</script>

<style lang='less'>
.content {
  display: flex;
}
.detail {
  .el-breadcrumb {
    margin: 20px 0;
  }
  width: 700px;
  margin: 0 30px 0 170px;
  span {
    img:nth-child(1) {
      width: 700px;
    }
  }
  h2,
  h3,
  p {
    padding: 5px 0;
  }
}
.title {
  height: 121px;
  width: 100%;
  border-bottom: 1px solid rgb(221, 221, 221);
}
.time {
  color: rgb(166, 153, 153);
  padding: 20px 0;
  margin-left: 400px;
}
.strategy {
  width: 280px;
  margin: 20px 0;
  h3 {
    width: 100%;
    font-weight: 400;
    border-bottom: 1px solid rgb(221, 221, 221);
  }
  a {
    display: block;
    padding: 20px 0;
    border-bottom: 1px solid rgb(221, 221, 221);

    .strategylist {
      display: flex;
      img {
        width: 100px;
        height: 80px;
        margin-right: 4px;
      }
      h4 {
        margin-bottom: 20px;
      }
      p {
        font-size: 12px;
        color: rgb(166, 166, 196);
      }
    }
  }
}
</style>