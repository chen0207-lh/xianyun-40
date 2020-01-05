<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥{{$store.state.air.allPrice}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "QRCode";
export default {
  data() {
    return {
      orderData: {},
      //   定时器
      timer: false
    };
  },
  methods: {
    checkPay() {
      // setInterval(函数表达式，毫秒数)；
      // setInterval()会不停的调用函数，直到clearInterval()被调用或者窗口被关闭，由 setInterval()返回的ID值可用作clearInterval()方法的参数。
      let timer = setInterval(() => {
        // 查询付款的状态
        this.$axios({
          url: "/airorders/checkpay",
          method: "POST",
          data: {
            //  订单id
            id: this.orderData.id,
            //  支付接口返回的订单金额
            nonce_str: this.orderData.price,
            //  订单编号
            out_trade_no: this.orderData.orderNo
          },
          headers: {
            // Bearer是token字符串前面必须要声明的，后面加上空格，再连接上token
            Authorization: "Bearer " + this.$store.state.user.userInfo.token
          }
        }).then(res => {
          // 订单支付成功提示用户
          if (res.data.statusTxt !== "订单未支付") {
            this.$alert("订单支付成功", "提示");
            // 停止定时器
            clearInterval(this.timer);
            // this.$router.back()
          }
        });
      }, 3000);
    }
  },
  mounted() {
    // 获取到URL链接上的id值
    const { id } = this.$route.query;
    // setTimeout(函数表达式，毫秒数)；
    // setTimeout()只执行函数一次，如果需要多次调用可以使用setInterval(),或者在函数体内再次调用setTimeout()
    setTimeout(() => {
      // 发请求获取订单详情
      this.$axios({
        url: "/airorders/" + id,
        headers: {
          // Bearer是token字符串前面必须要声明的，后面加上空格，再连接上token
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        console.log(res);
        this.orderData = res.data;
        // 获取到存放二维码canvas的元素
        let stage = document.getElementById("qrcode-stage");
        // 生成二维码    {width:200} 把二维码的宽度设置大一点
        QRCode.toCanvas(stage, this.orderData.payInfo.code_url, { width: 200 });
        this.checkPay();
      });
    }, 0);
  },
  destroyed() {
    // 组件卸载时候清除定时器
    clearInterval(this.timer);
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>