<template>
  <div>
    <div class="menus-wrapper">
      <div class="menus-body">
        <div class="menus">
          <div class="menu-item" v-for="(item,index) in cityList.data" :key="index">
            <span>{{item.type}}</span>
            <span class="el-icon-arrow-right"></span>
            <div class="sub-menus">
              <ul>
                <li v-for="(res,index) in item.children" :key="index">
                  <!-- :href="`post?${item.city}`" -->
                  <a :href="`post?${res.city}#`" @click="ClickCity(res.city)">
                    <i>{{index+1}}</i>
                    <strong>{{res.city}}</strong>
                    <span>{{res.desc}}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!---->
      </div>
      <div class="aside-recommend">
        <h4 class="aside-title">推荐城市</h4>
        <a href="/post#" class="aside-recommend-item">
          <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityList: [],
      postsList: []
    };
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      console.log(res);
      this.cityList = res.data;
    });

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
    ClickCity(val) {
      // let val = this.$route.query.city;
      // console.log(val);
      const arr = this.postsList.filter(v => {
        let res = val.slice(0, 2) + "市" + val.slice(2);
        console.log(res);
        return res === v.city.name;
      });
      this.$emit("handleClickCity",arr);
    }
  }
};
</script>

<style lang='less' scoped>
.aside-title{
  margin: 20px 0 10px 0;
  font-weight: 500;
  padding-bottom:5px; 
  border-bottom: 1px solid #dddddd;
}
.aside-recommend-item {
  img {
    width: 260px;
  }
}
.el-icon-arrow-right {
  margin-left: 140px;
  font-size: 18px;
}
.menus-wrapper .sub-menus {
  position: absolute;
  left: 260px;
  top: 0;
  width: 350px;
  padding: 10px 20px;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #ddd;
}
.menu-item .sub-menus {
  display: none;
}
.menu-item:hover .sub-menus {
  display: block;
  position: absolute;
  left: 260px;
  top: 0;
}
.menus-wrapper .sub-menus ul li {
  font-size: 14px;
  line-height: 1.5;
}

.menus-wrapper .sub-menus ul li {
  vertical-align: middle;
}

.menus-wrapper .sub-menus ul li i {
  color: orange;
  font-size: 24px;
  font-style: italic;
}

.menus-wrapper .sub-menus ul li strong {
  margin: 0 10px;
  color: orange;
  font-weight: 400;
}

.menus-wrapper .sub-menus ul li strong:hover {
  text-decoration: underline;
}

.menus-wrapper .sub-menus ul li span {
  color: #999;
}

.menus-wrapper .sub-menus ul li span:hover {
  text-decoration: underline;
}
.menus-wrapper {
  position: relative;
  width: 260px;
  z-index: 2;
}

.menus-wrapper .menus {
  width: 260px;
  border: 1px solid #ddd;
  border-right: none;
  border-bottom: none;
  box-shadow: 0 0 1px #f5f5f5;
  z-index: 2;
}

.menus-wrapper .menu-item {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  padding: 0 20px;
  font-size: 14px;
  z-index: 2;
}
</style>