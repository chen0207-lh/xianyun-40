<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item>
      <div class="create">
        <div class="content">
          <h2>发表新攻略</h2>
          <p>分享你的个人游记，让更多人看到哦！</p>
          <input type="text" placeholder="请输入标题" v-model="form.title" />
          <br />
          <VueEditor :config="config" ref="vueEditor" />
          <span>选择城市</span>
          <input type="text" placeholder="请搜索游玩的城市" class="select" v-model="form.city" />
          <br />
          <div class="footer">
            <!-- <button @click="handleArticle">发布</button> -->
            <el-button type="primary" @click="handleArticle">发布</el-button>
            <em>或者</em>
            <span @click="handleDrafts">保存到草稿</span>
          </div>
        </div>
        <div class="Drafts">
          <h3>草稿箱(0)</h3>
          <div
            class="Drafts-content"
            v-for="(item,index) in $store.state.post.DraftsList "
            :key="index"
          >
            <a @click="handleForm(item.title,item.content)">
              {{item.title}}
              <i class="el-icon-edit"></i>
            </a>
            <span>{{item.time}}</span>
          </div>
        </div>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
// 引入时间插件
import moment from "moment";
import "quill/dist/quill.snow.css";
let VueEditor;
if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}
export default {
  data() {
    return {
      form: {
        content: "",
        title: "",
        city: ""
      },
      DraftsList: [],
      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://localhost:3000/upload",
          name: "file",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            console.log(res);
            insert("http://localhost:3000" + res.data.url);
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: "http://localhost:3000/upload",
          name: "file",
          uploadSuccess(res, insert) {
            console.log(res);
            insert("http://localhost:3000" + res.data.url);
          }
        }
      }
    };
  },
  components: {
    VueEditor
  },
  methods: {
    handleArticle() {
      // 获取富文本框的内容
      var quill = this.$refs.vueEditor.editor;
      this.form.content = quill.root.innerHTML;
      // if (this.content.trim() === "") {
      //   this.$message.error("内容不能为空");
      //   return;
      // }
      if (this.title === "") {
        this.$message.error("标题不能为空");
        return;
      }
      if (this.city === "") {
        this.$message.error("城市不能为空");
        return;
      }
      this.$axios({
        url: "/posts",
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        },
        data: {
          content: this.form.content,
          title: this.form.title,
          city: this.form.city
        }
      }).then(res => {
        console.log(res);
        if (res.message === "新增成功") {
          this.$message.success("新增成功");
        }
      });
    },
    handleDrafts() {
      if (this.DraftsList.length > 5) {
        this.DraftsList.pop();
      }
      var quill = this.$refs.vueEditor.editor;
      this.form.content = quill.root.innerHTML;
      let date = new Date();
      let time = moment(date).format("YYYY-MM-DD");
      //  this.form.push({time: this.time });
      // this.DraftsList.unshift(this.time);
      // for(i = 0; i < DraftsList.lenght; i++) {
      // this.DraftsList.forEach(() => {
        this.DraftsList.unshift(this.form);
      // });

      this.$store.commit("post/setDrafts", this.DraftsList);
    },
    handleForm(title, content) {
      console.log(title, content);
      this.form.title = title;
      var quill = this.$refs.vueEditor.editor;
      quill.root.innerHTML = content;
    }
  }
};
</script>


<style lang='less' scoped>
.create {
  display: flex;
}
.Drafts {
  margin: 20px 0;
  width: 178px;
  border: 1px solid #ddd;
  padding: 5px;
  .Drafts-content {
    margin: 2px 0;
    a:hover {
      color: #ffa500;
      text-decoration: underline;
    }
    span {
      font-size: 12px;
      color: #999999;
    }
  }
  h3 {
    font-weight: 300;
  }
}
.content {
  width: 750px;
  margin: 20px 20px 20px 190px;
  h2 {
    font-weight: 400;
  }
  p {
    color: #999999;
    font-size: 12px;
    padding: 10px 0;
  }
  input {
    width: 100%;
    height: 35px;
    border-radius: 4px;
    border: 1px solid #ddd;
    margin: 0 0 30px 0;
  }
  .select {
    width: 30%;
    margin: 20px 5px;
  }
  .footer {
    // button {
    //   width: 54px;
    //   height: 30px;
    //   border: 1px solid #409eff;
    //   border-radius: 4px;
    //   color: #fff;
    //   background: #409eff;
    //   margin-right: 5px;
    // }
    em {
      font-size: 14px;
    }
    span {
      color: #ffa500;
      font-size: 14px;
    }
  }
}
</style>
