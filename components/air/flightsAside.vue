<template>
  <div class="aside">
    <div class="statement">
      <el-row type="flex" justify="space-between" class="statement-list">
        <el-col :span="8">
          <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></i>
          <span>航协认证</span>
        </el-col>
        <el-col :span="8">
          <i class="iconfont iconbaozheng" style="color:green;"></i>
          <span>出行保证</span>
        </el-col>
        <el-col :span="8">
          <i class="iconfont icondianhua" style="color:#409EFF;"></i>
          <span>7x24</span>
        </el-col>
      </el-row>
      <p class="service-tel">免费客服电话：4006345678转2</p>
    </div>

    <div class="history">
      <h5>历史查询</h5>
      <!-- 循环渲染数据 -->
      <!-- 从本地中获取到搜索历史的方法2：直接使用$store.state.air.history获取到历史数据 -->
      <nuxt-link
        v-for="(item,index) in history"
        :key="index"
        :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`"
      >
        <el-row type="flex" justify="space-between" align="middle" class="history-item">
          <div class="air-info">
            <div class="to-from">{{item.departCity}} - {{item.destCity}}</div>
            <p>{{item.deparDate}}</p>
          </div>
          <span>选择</span>
          <span class="el-icon-close" style="padding:0px;" @click="handleDelete(index)"></span>
        </el-row>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  // 从本地中获取到搜索历史的方法1：
  data() {
    return {
      // 通过循环history获取到数据
      history: []
    };
  },
  mounted() {
    setTimeout(() => {
      const history = this.$store.state.air.history;
      //    把获取到的数据添加到this.history中
      this.history = history;
    }, 1);
  },
  methods: {
    handleDelete(index) {
      this.history = this.history.splice(index, 1);
    }
  }
};
</script>

<style scoped lang="less">
.statement {
  border: 1px #ddd solid;

  .statement-list {
    padding: 10px 0;
    > div {
      text-align: center;
      i {
        display: block;
        font-size: 40px;
      }
      span {
        font-size: 12px;
      }
    }
  }
  .service-tel {
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
    background: #f6f6f6;
    font-size: 14px;
  }
}

.history {
  border: 1px #ddd solid;
  padding: 10px;
  margin-top: 10px;

  h5 {
    font-size: 16px;
    font-weight: normal;
    padding-bottom: 10px;
    border-bottom: 1px #eee solid;
  }

  .history-item {
    padding: 10px 0;
    font-size: 14px;
    border-bottom: 1px #eee solid;

    &:last-child {
      border: none;
    }

    .to-from {
      margin-bottom: 5px;
    }

    p {
      font-size: 12px;
      color: #666;
    }

    span {
      color: #fff;
      display: block;
      padding: 2px 10px;
      background: orange;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
    }
  }
}
</style>