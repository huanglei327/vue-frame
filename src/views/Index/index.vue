<template>
  <div class="index">
    <div class="portrait-list">
      <div class="portrait-img"></div>
      {{msg}}
    </div>
    <div class="index-bd">
      <div class="kind-list">
        <div class="kind-list-item" v-for="item in list" :key="item.id">
          <div v-on:click="kindToggle(item.id)" :class="{ 'kind-list-item-hd': item.status, 'kind-list-item-hd-show': item.open }">
            <div class="kind-list-text">
              <van-row>
                <van-col span="20" style="height:32px;line-height:32px;">
                  {{item.name}}
                </van-col>
                <van-col span="4">
                  <div v-if="item.bage!=='' && item.bage>0" class="bage-radius">{{item.bage}}</div>
                </van-col>
              </van-row>
            </div>
            <img class="kind-list-img" :src="item.src" />
          </div>
          <div :class="{ 'kind-list-item-bd': item.status, 'kind-list-item-bd-show': item.open }">
            <div :class="{'navigator-box': item.status, 'navigator-box-show': item.open} ">
              <van-cell-group v-for="( page,pindex) in  item.pages" :key="pindex">
                <router-link :to="page.url">
                  <van-cell is-link>
                    <div>
                      <van-row>
                        <van-col span="6"><img :src="page.imgn" /></van-col>
                        <van-col span="14" style="height:32px;line-height:32px;">
                          {{page.tname}}
                        </van-col>
                        <van-col span="4">
                          <div v-if="page.bage!=='' && page.bage>0" class="bage-radius">{{page.bage}}</div>
                        </van-col>
                      </van-row>
                    </div>
                  </van-cell>
                </router-link>
              </van-cell-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import view from "../../assets/images/view.png";
import content from "../../assets/images/content.png";
import form from "../../assets/images/form.png";
import nav from "../../assets/images/nav.png";
import media from "../../assets/images/media.png";
import map from "../../assets/images/map.png";
import canvas from "../../assets/images/canvas.png";
import photo from "../../assets/images/logo.jpg";
import temp1 from "../../assets/images/1.png";
import temp2 from "../../assets/images/2.png";
import temp3 from "../../assets/images/3.png";
import temp4 from "../../assets/images/4.png";
import temp5 from "../../assets/images/5.png";
import temp6 from "../../assets/images/6.png";
import temp7 from "../../assets/images/7.png";
import temp8 from "../../assets/images/8.png";
import temp9 from "../../assets/images/9.png";
import { mapGetters, mapActions } from "vuex";
import { getCountApi } from "./api";
export default {
  name: "HelloWorld",
  data() {
    return {
      photo: "../../assets/logo.jpg",
      msg: "test",
      userName: "",
      list: [
        {
          id: "view",
          name: "决策管理",
          open: false,
          status: true,
          src: temp7,
          bage: "",
          pages: [
            {
              tname: "我的决策",
              url: "/QueryDecision",
              imgn: temp1,
              bage: ""
            },
            {
              tname: "发起决策",
              url: "/SaveDecision",
              imgn: temp2,
              bage: ""
            }
          ]
        },
        {
          id: "2",
          name: "创意提案管理",
          open: false,
          status: true,
          src: temp8,
          bage: "",
          pages: [
            {
              tname: "我的提案",
              url: "/MyCreative",
              imgn: temp3,
              bage: ""
            },
            {
              tname: "发起提案",
              url: "/CreativeList",
              imgn: temp4,
              bage: ""
            }
          ]
        },
        {
          id: "3",
          name: "创意评审",
          open: false,
          status: true,
          src: temp9,
          bage: "",
          pages: [
            {
              tname: "我的评审",
              url: "/ReviewList",
              imgn: temp5,
              bage: ""
            }
          ]
        },
        {
          id: "4",
          name: "结案管理",
          open: false,
          status: true,
          src: temp7,
          bage: "",
          pages: [
            {
              tname: "我的结案",
              url: "/OverList",
              imgn: temp6,
              bage: ""
            }
          ]
        }, {
          id: "5",
          name: "多加个菜单",
          open: false,
          status: true,
          src: temp7,
          bage: "",
          pages: [
            {
              tname: "菜单1",
              url: "/EchartsInfo",
              imgn: temp6,
              bage: ""
            }
          ]
        }
      ]
    };
  },
  //computed: { ...mapGetters(['msg']) },  //对应getters.技术中的msg
  mounted() {
    const that = this;
    // that.userName = that.$common.date
    // if (that.$route.query.status !== "1") {
    //   that.$router.push({
    //     path: "/BindUser",
    //     query: {
    //       token: that.$route.query.token
    //     }
    //   });
    // } else {
    //   const userinfo = {
    //     id: 1,
    //     userName: decodeURI(that.$route.query.userName),
    //     token: that.$route.query.token
    //   };
    //   localStorage.setItem("userInfo", JSON.stringify(userinfo));
    //   that.init();
    // }
    // that.msg = JSON.stringify(that.$route.query);

    const userinfo = {
      id: 1,
      userName: "林璐茜",
      token: "456"
    };
    localStorage.setItem("userInfo", JSON.stringify(userinfo));
    that.init();
  },
  methods: {
    init() {
      const that = this;
      const c = res => {
        if (res.errcode === 0) {
          //localStorage.setItem("zycyCount", JSON.stringify(res))
          //决策
          if (res.notAnswerByDecisionCount !== null) {
            that.list[0].bage = res.notAnswerByDecisionCount;
            that.list[0].pages[0].bage = res.notAnswerByDecisionCount;
          }
          //评审
          if (res.notReviewcount !== null) {
            that.list[2].bage = res.notReviewcount;
            that.list[2].pages[0].bage = res.notReviewcount;
          }
          //未回答的问题数量对提案的提问
          if (res.notAnswerByResolutionCount !== null) {
            that.list[1].bage = res.notAnswerByResolutionCount;
            that.list[1].pages[0].bage = res.notAnswerByResolutionCount;
          }
          if (res.notResolutionCount !== null) {
            that.list[1].bage = res.notResolutionCount;
            that.list[1].pages[1].bage = res.notResolutionCount;
          }
          if (
            res.notAnswerByResolutionCount != null &&
            res.notResolutionCount !== null
          ) {
            that.list[1].bage =
              parseInt(res.notResolutionCount) +
              parseInt(res.notAnswerByResolutionCount);
          }
        }
        that.checkQuery();
        //决策提醒
      };
      const param = {
        userName: that.$common.getUserInfo("userName"),
        queryType: 0
      };
      getCountApi(param).then(c);
    },
    checkQuery() {
      const that = this;
      if (that.$route.query.remindtype !== "") {
        localStorage.setItem("wocaonima", that.$route.query.remindtype)

        if (that.$route.query.remindtype === "proposal"
          || that.$route.query.remindtype === 'decisionQuiz'
          || that.$route.query.remindtype === "decisionAnswer"
          || that.$route.query.remindtype === "decision") {
          var type = 0
          var deciType = ''
          var isExistsResolution = ''
          if (that.$route.query.isParticipationResolution === '1') {
            type = 0
            deciType = 'weicanyu'
          }
          else if (that.$route.query.isParticipationResolution === '2') {
            type = 2
            deciType = 'yicanyu'
          }
          else {
            type = 2
            isExistsResolution = '存在'
          }

          that.$router.push({
            path: "/DecisionDetails",
            query: {
              decisionId: that.$route.query.decisionId,
              type: type,
              deciType: deciType,
              isExistsResolution: isExistsResolution
            }
          });
        }
        if (that.$route.query.remindtype === "review") {
          var type = 2
          if (that.$route.query.isReview === '1') {
            type = 1
          }
          that.$router.push({
            path: "/ReviewDicyList",
            query: {
              decisionId: that.$route.query.decisionId,
              type: type
            }
          });
        }
        if (that.$route.query.remindtype === "resolutionAnswer"
          || that.$route.query.remindtype === "resolutionQuiz") {
          that.$router.push({
            path: "/CreativeDetails",
            query: {
              decisionId: that.$route.query.decisionId,
              resolutionId: that.$route.query.resolutionId
            }
          });
        }
        // if(that.$route.query.remindtype === "resolutionAnswer"
        //   || that.$route.query.remindtype === "resolutionQuiz"){

        //   }
        // if (that.$route.query.remindtype === "decision") {
        //   that.$router.push({
        //     path: "/CreativeList",
        //     query: {
        //       decisionId: that.$route.query.decisionId
        //     }
        //   });
        // }
        if (that.$route.query.remindtype === "close") {
          that.$router.push({
            path: "/DecisionDetails",
            query: {
              decisionId: that.$route.query.decisionId,
              statusStr: '待结案'
            }
          });
        }
        // if (that.$route.query.remindtype === "decisionQuiz") {
        //   that.$router.push({
        //     path: "/CreativeList",
        //     query: {
        //       decisionId: that.$route.query.decisionId
        //     }
        //   });
        // }
        // if (that.$route.query.remindtype === "resolutionQuiz") {
        //   that.$router.push({
        //     path: "/ReviewList"
        //   });
        // }
        // if (that.$route.query.remindtype === "decisionAnswer") {
        //   that.$router.push({
        //     path: "/CreativeList",
        //     query: {
        //       decisionId: that.$route.query.decisionId
        //     }
        //   });
        // }
        // if (that.$route.query.remindtype === "resolutionAnswer") {
        //   that.$router.push({
        //     path: "/ReviewList",
        //   });
        // }
        localStorage.setItem("caodanStorage", "1");
      }
    },
    kindToggle: function (id) {
      let list = this.list;
      for (var i = 0; i < list.length; i++) {
        if (list[i].id == id) {
          list[i].open = !list[i].open;
        } else {
          list[i].open = false;
        }
      }
      this.list = list;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" >
.index {
	//background: white;
}
.portrait-list {
	background: white;
	// background: url(/static/img/logo.c3b7e7d.jpg) no-repeat;
	// background-size: 100% 100%;
	// margin: 0 auto;
	width: 100%;
	.portrait-img {
		background: url(/static/img/logo.c3b7e7d.jpg) no-repeat;
		background-size: 100% 100%;
		margin: 0 10px 0 15px;
		height: 200px;
	}
	.p-photo {
		margin: 0 auto;
		width: 100px;
		height: 100px;
		padding-top: 30px;
		.photo {
			width: 100px;
			height: 100px;
			border-radius: 50px;
		}
	}
	.p-p-title {
		text-align: center;
		padding: 10px 0;
	}
}
.bor {
	border-right: 1px solid #e5e5e5;
	border-bottom: 1px solid #e5e5e5;
}
.bornone {
	border-right: 1px solid white;
}
.p-list {
	text-align: center;
	padding: 15px 0;

	.p-img {
		height: 50px;
		line-height: 50px;
	}
	.p-title {
		height: 20px;
		line-height: 20px;
		color: #665858;
	}
}
.bage-radius {
	background: red;
	color: white;
	border-radius: 50%;
	width: 20px;
	height: 20px;
	text-align: center;
	line-height: 22px;
	margin-top: 5px;
}
</style>
