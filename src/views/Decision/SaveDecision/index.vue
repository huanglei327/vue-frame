<template>
  <div>
    <van-cell-group>
      <van-field required label="决策名称" type="textarea" placeholder="请在这里录入决策名称,不超过30个字" rows="1" autosize v-model="status.jcName" :error-message="status.jcName_err" />
      <van-cell is-link @click="showClassify" :value="status.infoName">
        <template slot="title">
          <span class="van-cell-text">
            <span class="cell-s-c-red">*</span>决策分类</span>
          <div class="van-field__error-message errmsg">{{status.infoName_err}}</div>
        </template>
      </van-cell>
      <van-field required label="决策内容" type="textarea" placeholder="请在这里录入决策内容,不超过30个字" rows="1" autosize v-model="status.jcContent" :error-message="status.jcContent_err" />
      <van-cell is-link @click="showPeople" :value="status.tuserName">
        <template slot="title">
          <span class="van-cell-text">
            <span class="cell-s-c-red">*</span>创意提案人
          </span>
          <div class="van-field__error-message errmsg">{{status.tuserName_err}}</div>
        </template>
      </van-cell>
      <van-cell is-link @click="showspeoplePopup" :value="status.cuserName">
        <template slot="title">
          <span class="van-cell-text">
            <span class="cell-s-c-red">*</span>创意评审人</span>
          <div class="van-field__error-message errmsg">{{status.cuserName_err}}</div>
        </template>
      </van-cell>
      <van-cell is-link @click="showDaysPopup" :value="status.jcDays">
        <template slot="title">
          <span class="van-cell-text">
            <span class="cell-s-c-red">*</span>天数</span>
          <div class="van-field__error-message errmsg">{{status.jcDays_err}}</div>
        </template>
      </van-cell>
      <div>
        <div style="width:100%;overflow:hidden;">
          <ul class="up-img-ul">
            <li>
              <div style="padding-top:20px;">
                <van-uploader :after-read="onRead" multiple accept :disabled="imgdisabled">
                  <van-icon name="photograph" class="font28" />
                </van-uploader>
                <div class="font12">上传图片</div>
              </div>
            </li>
            <li v-for="(item,index) in imglist" :key="index">
              <div class="imgX">
                <van-icon name="clear" @click="clearImg(item)" />
              </div>
              <img width="70px" height="90px" :src="item" @click="imgPreview(item)">
            </li>
          </ul>
        </div>
        <div class="van-field__error-message" style="line-height:24px;padding-left:100px;"></div>
      </div>
    </van-cell-group>
    <div class="div-btn">
      <van-button type="primary" size="newlarge" @click="btnGoJC" :disabled="jcdisabled">发起决策
      </van-button>
    </div>
    <classify-list :status="status" />
    <search-list :status="status" />
    <speople-list :status="status" />
    <day-list :status="status" />
  </div>
</template>

<script>
import { getName, SaveJC, UpImg } from "./api";
import { ImagePreview } from "vant";
import classifyList from "./subs/ClassifyList/index.vue";
import searchList from "./subs/SearchList/index.vue";
import speopleList from "./subs/SpeopleList/index.vue";
import dayList from "./subs/DayList/index.vue";
export default {
  data() {
    return {
      value: "1",
      checked: true,
      jcdisabled: false,
      status: {
        infoId: 0,
        classifyPopup: false,
        classTitle: "决策分类",
        tuserId: 0,
        tuserName: "",
        tuserName_err: "",
        cuserId: 0,
        cuserName: "",
        cuserName_err: "",
        SearchListTitle: "创意提案人",
        SearchListPopup: false,
        speopleListTitle: "创意评审人",
        speopleListPopup: false,
        jcName: "",
        jcName_err: "",
        infoName: "",
        infoName_err: "",
        jcContent: "",
        jcContent_err: "",
        pictureNames: "",
        daysPopup: false,
        daysPopupTitle: '天数',
        jcDays: '',
        jcDays_err: ""
      },
      imgdisabled: false,
      imglist: []
    };
  },
  components: {
    classifyList,
    searchList,
    speopleList,
    dayList
  },
  mounted() { },
  methods: {
    btnGoJC() {
      const that = this;
      that.jcdisabled = true
      setTimeout(() => {
        that.jcdisabled = false
      }, 1800);
      let checklist = [
        { domId: "jcName", msg: "请输入决策名称", valiType: "" },
        { domId: "infoName", msg: "请选择决策分类", valiType: "" },
        { domId: "jcContent", msg: "请选择决策内容", valiType: "" },
        { domId: "tuserName", msg: "请选择创意提案人", valiType: "" },
        { domId: "cuserName", msg: "请选择创意评审人", valiType: "" },
        { domId: "jcDays", msg: "请选择天数", valiType: "" }
      ];

      if (!that.$checkVal.validateNull(that.status, checklist)) {
        return;
      }
      if (that.status.pictureNames != '')
        that.status.pictureNames = that.status.pictureNames.substring(0, that.status.pictureNames.length - 1)
      var DecisionMaking = {
        decisionName: that.status.jcName,
        decisionType: that.status.infoId,
        decisionContent: that.status.jcContent,
        decisionProposer: that.status.tuserName + "," + that.$common.getUserInfo("userName"),
        decisionAssessor: that.status.cuserName + "," + that.status.tuserName + ',' + that.$common.getUserInfo("userName"),
        jcDate: that.$common.getCurrentTime(),
        createUser: that.$common.getUserInfo("userName"),
        pictureNames: that.status.pictureNames,
        closeTime: that.status.jcDays
      };

      var temps = DecisionMaking.decisionAssessor.split(',')
      var newTemp = []
      for (var i = 0; i < temps.length; i++) {
        if (newTemp.indexOf(temps[i]) === -1) {
          newTemp.push(temps[i])
        }
      }
      DecisionMaking.decisionAssessor = newTemp.join(',')
      const callback = res => {
        if (res.errcode === 0) {
          that.$toast.success({
            message: "添加成功",
            duration: 2000
          });
          setTimeout(() => {
            if (res.decisionId !== "") {
              that.$router.push({
                path: '/DecisionDetails',
                query: {
                  decisionId: res.decisionId,
                  type: 2,
                  deciType: 'yicanyu'
                }
              })
              that.jcdisabled = false
            } else {
              that.$router.go(-1);
            }
          }, 1500);
        } else {
          alert(res.errmsg);
        }
      };
      SaveJC(DecisionMaking).then(callback);
    },
    showClassify() {
      this.status.classifyPopup = true;
    },
    showPeople() {
      this.status.SearchListPopup = true;
    },
    showspeoplePopup() {
      this.status.speopleListPopup = true;
    },
    showDaysPopup() {
      this.status.daysPopup = true
    },
    clearImg(item) {
      const that = this;
      for (var i = 0; i < that.imglist.length; i++) {
        if (that.imglist[i] == item) that.imglist.splice(i, 1);
      }
    },
    imgPreview(item) {
      const that = this;
      ImagePreview(that.imglist);
    },
    onRead(file) {

      const that = this;
      //数组
      if (Array.isArray(file)) {
      } else {
        const toast1 = that.$toast.loading({
          mask: false,
          message: '上传中...',
          duration: 5000
        });
        if (file.file.size > 1024 * 100 * 5) {
          toast1.clear();
          that.$dialog.alert({
            message: '请上传小于5MB的图片'
          });
          return
        }
        //对象
        const callback = res => {
          if (res.errcode === 0) {
            that.$toast.clear()
            that.$toast.success({
              message: "上传成功",
              duration: 2000
            });
            that.imglist.push(file.content);
            that.status.pictureNames += res.pictureUrl + ',';
          }
        };
        const param = {
          base64String: file.content
        };
        console.log(JSON.stringify(param))
        UpImg(param).then(callback);
      }
    }
  }
};
</script>

<style lang="less">
.imgX {
	position: absolute;
	right: 0;
	width: 30px;
	height: 30px;
	line-height: 30px;
}
.up-img-ul li {
	position: relative;
}
</style>
