<template>
  <div>
    <div class="detailsPanel">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="决策信息" name="0" class="details">
          <div>
            <van-row>
              <van-col span="6">决策名称:</van-col>
              <van-col span="18">{{list.decisionName}}</van-col>
            </van-row>
          </div>
          <div>
            <van-row>
              <van-col span="6">决策类型:</van-col>
              <van-col span="18">{{list.decisionTypeStr}}</van-col>
            </van-row>
          </div>
          <div>
            <van-row>
              <van-col span="6">决策内容:</van-col>
              <van-col span="18">{{list.decisionContent}}</van-col>
            </van-row>
          </div>

          <div>
            <van-row>
              <van-col span="6">时间要求:</van-col>
              <van-col span="18">{{list.closeTime}}天</van-col>
            </van-row>
          </div>

          <div>
            <van-row>
              <van-col span="6">决策人:</van-col>
              <van-col span="18">{{list.createUser}}</van-col>
            </van-row>
          </div>

          <div>
            <van-row>
              <van-col span="6">创建时间:</van-col>
              <van-col span="18">{{listDtl.createTime}}</van-col>
            </van-row>
          </div>
          <ul class="up-img-ul">
            <li v-for="(item,index) in imgList" :key="index">
              <img width="70px" height="90px" @click="imgPreview(index)" :src="item">
            </li>

          </ul>
        </van-collapse-item>
        <van-collapse-item title="提案信息" name="1">
          <div class="details">

            <div>
              <van-row>
                <van-col span="6">提案名称:</van-col>
                <van-col span="18">{{listDtl.resolutionName}}</van-col>
              </van-row>
            </div>
            <div>
              <van-row>
                <van-col span="6">提案内容:</van-col>
                <van-col span="18">{{listDtl.resolutionContent}}</van-col>
              </van-row>
            </div>
            <div>
              <van-row>
                <van-col span="6">提案时间:</van-col>
                <van-col span="18">{{listDtl.createTime}}</van-col>
              </van-row>
            </div>
            <div>
              <van-row>
                <van-col span="6">倒计时:</van-col>
                <van-col span="18">
                  <span class="colored">{{timesValue}}</span>
                </van-col>
              </van-row>
            </div>
            <ul class="up-img-ul">
              <li v-for="(item,index) in tianImgList" :key="index">
                <img width="70px" height="90px" @click="imgPreviewTiAn(index)" :src="item">
              </li>

            </ul>
          </div>
        </van-collapse-item>
        <van-collapse-item title="评审" name="2">
          <div v-if="psList.length>0">
            <div class="details" v-for="(item,index) in psList" :key="index">
              <div v-if="scoreShow">
                <van-row>
                  <van-col span="4">分数:</van-col>
                  <van-col span="12">
                    <van-rate v-model="item.resolutionScore" /></van-col>
                  <van-col span="4">{{item.resolutionScore}}分</van-col>
                </van-row>
              </div>
              <div>
                <van-row>
                  <van-col span="4">优点:</van-col>
                  <van-col span="18"> {{item.resolutionMerit}}</van-col>
                </van-row>
              </div>
              <div>
                <van-row>
                  <van-col span="4">缺点:</van-col>
                  <van-col span="18"> {{item.resolutionDefect}}</van-col>
                </van-row>
              </div>
              <div>
                <van-row>
                  <van-col span="4">结论:</van-col>
                  <van-col span="18">{{item.resolutionConclusion}}</van-col>
                </van-row>
              </div>
              <div>
                <van-row>
                  <van-col span="4">评审人:</van-col>
                  <van-col span="18">{{item.createUser}}</van-col>
                </van-row>
              </div>
            </div>
          </div>
          <div v-else class="no-data">
            暂无评审
          </div>
        </van-collapse-item>
        <van-collapse-item title="问答" name="3">
          <div v-if="tiwenlist.length>0">

            <div v-for="(item,index) in tiwenlist" :key="index">
              <div>
                <van-row class="wdt-title">
                  <van-col span="4" class="wdt-toux"><img :src="toux"> </van-col>
                  <van-col span="6">{{item.createUser}}</van-col>
                  <van-col span="12">{{item.createTime}}</van-col>
                </van-row>
                <van-row class="wd-f">
                  <van-col span="20">{{item.quizCentent}}</van-col>
                  <van-col span="4" class="ff" v-if="isShowFF">
                    <div @click="showAnswer(item.quizId)" style="color:blue;">回复</div>
                  </van-col>
                </van-row>
                <div v-for="(ff,ffindex) in item.answerInfoList" :key="ffindex">
                  <van-col span="20" class="div-ff">

                    <span v-if="listDtl.createUser === ff.createUser">提案人</span>
                    <span v-else> {{ff.createUser}}</span>
                    回复:{{ff.answerCentent}}
                  </van-col>
                  <van-col span="4" class="ff" v-if="isAshowFF && ffindex+1 === item.answerInfoList.length">
                    <div @click="showAnswer(item.quizId)" style="color:blue;line-height:30px;">回复</div>
                  </van-col>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="no-data">
            暂无提问
          </div>
        </van-collapse-item>
      </van-collapse>
      <div style="width:100%;height:48px;background:white;"></div>
    </div>
    <div class="de-boA" v-if="tabtnShow">
      <div class="dflex">
        <div class="b-cheng" v-if="istiwenshow" @click="btn_tw">提问</div>
        <div class="b-green" @click="btn_ps">评审</div>
      </div>
    </div>

    <van-popup v-model="show" style="width:80%;" class="creative">
      <div v-if="tiwenShow">
        <div class="popup-title text-align-c">
          <h3>{{popupTitle}}</h3>
        </div>
        <van-cell-group>
          <van-field v-model="quizCentent" required label="提问" type="textarea" placeholder="请录入提问信息，提案名称不超过200个字" rows="6" autosize />
        </van-cell-group>
        <div class="div-btn">
          <van-button type="primary" size="newlarge" @click="btnSaveTw">发起提问
          </van-button>
        </div>
      </div>
      <div v-if="pingshenShow">
        <div class="popup-title text-align-c">
          <h3>{{popupTitle}}</h3>
        </div>
        <van-cell-group>
          <van-field type="number" min="1" max="99" required clearable label="分数" placeholder="请输入分数1-10" v-model="psObj.resolutionScore" :error-message="psObj.resolutionScore_err" />
          <van-field type="textarea" maxlength="50" required clearable label="结论" placeholder="请输入结论，不超过50字" rows="1" autosize :error-message="psObj.resolutionConclusion_err" v-model="psObj.resolutionConclusion" />
          <van-field type="textarea" maxlength="200" required clearable label="优点" placeholder="请在这里录入优点,不超过200个字" :error-message="psObj.resolutionMerit_err" v-model="psObj.resolutionMerit" rows="2" autosize />
          <van-field type="textarea" maxlength="200" required clearable label="缺点" placeholder="请在这里录入缺点,不超过200个字" rows="2" autosize :error-message="psObj.resolutionDefect_err" v-model="psObj.resolutionDefect" />
        </van-cell-group>
        <div class="div-btn">
          <van-button type="primary" size="newlarge" @click="btnSavePs">提交
          </van-button>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="ffshow" position="bottom">
      <div>
        <van-cell-group>
          <van-field v-model="answerCentent" type="textarea" placeholder="回复" rows="1" autosize>
            <van-button slot="button" size="small" type="primary" @click="addAnswer()">回复</van-button>
          </van-field>
        </van-cell-group>
      </div>
    </van-popup>
  </div>
</template>

<script>
import view from "../../../assets/images/smallxr0.png";
import { getResolutionApi } from "@/utils/httpUtils/api.js";
import { ImagePreview } from "vant";
import {
  getCreativeDetails,
  addQuizInfo,
  addResolutionDtlInfo,
  getQuizInfo,
  getDecisionMaking,
  addAnswerInfo,
  getResolutionInfo
} from "./api";
import {
  GetdecisionMakingByIdApi,
  getResolutionInfoApi,
  getPSInfoApi
} from "@/utils/httpUtils/api.js";
export default {
  data() {
    return {
      activeNames: ["1", "0", "2", "3"],
      msg: "adasd",
      show: false,
      popupTitle: "提问",
      tiwenShow: true,
      pingshenShow: false,
      message: "",
      list: {},
      listDtl: [],
      decisionList: {},
      psObj: {
        resolutionMerit: "",
        resolutionDefect: "",
        resolutionScore: "",
        resolutionConclusion: "",
        resolutionMerit_err: "",
        resolutionDefect_err: "",
        resolutionScore_err: "",
        resolutionConclusion_err: ""
      },
      quizCentent: "",
      userName: "",
      decisionId: 0,
      resolutionId: 0,
      tiwenlist: [],
      toux: view,
      isShowFF: false,
      isAshowFF: false,
      ffshow: false,
      answerCentent: "",
      imgList: [],
      tianImgList: [],
      scoreShow: false,
      currentName: "",
      tabtnShow: true,
      pageType: "",
      psList: [],
      dicyTimes: "",
      istiwenshow: true,
      userNameA: "",
      timesValue: ''
    };
  },
  mounted() {
    const that = this;
    that.userNameA = that.$common.getUserInfo("userName");
    that.resolutionId = that.$route.query.resolutionId;
    that.decisionId = that.$route.query.decisionId;
    that.currentName = that.$common.getUserInfo("userName");
    that.pageType = that.$route.query.pageType;
    if (that.pageType === "No") {
      that.tabtnShow = false;
      that.scoreShow = true
    }
    that
      .getInit()
      // .then(() => {
      //   //return that.getJcInfo();
      //   return that.getResoluInfo()
      // })
      .then(() => {
        return that.getResoluInfo();
      })
      .then(() => {
        return that.getQui();
      })
      .then(() => {
        return that.getPSInfo();
      })
      .then(() => {
        that.checkDiv();
      });
  },
  filters: {
    filterFun(value) {
      const status = {
        "10": "提案中",
        "20": "评审中",
        "90": "结案"
      };
      return status[value];
    }
  },
  methods: {
    getInit() {
      return new Promise((resolve, reject) => {
        const that = this;
        const callback = res => {
          if (res.errcode === 0) {
            that.list = res.data[0];
            that.decisionId = res.data[0].decisionId;
            that.resolutionId = res.data[0].resolutionId;
            for (var i = 0; i < res.data[0].pictureList.length; i++) {
              const a = res.data[0].pictureList[i];
              that.imgList.push(
                "http://merit.dsunyun.com/m_decisionMaking/loadImage?fileName=" +
                a.pictureName
              );
            }
            resolve();
          }
        };
        const param = {
          decisionId: that.decisionId
          // resolutionId:that.resolutionId,
          // resolutionType: 0,
          // userName: that.$common.getUserInfo("userName")
        };
        GetdecisionMakingByIdApi(param).then(callback);
      });
    },
    checkDiv() {
      const that = this;
      console.log(that.listDtl.createUser);
      console.log(that.$common.getUserInfo("userName"));
      console.log("---");
      if (that.listDtl.createUser === that.$common.getUserInfo("userName")) {
        that.isShowFF = true;
        that.tiwenShow = false;
        // that.tabtnShow = false;
        that.istiwenshow = false;
      } else {
        that.isAshowFF = true;
      }
    },
    getPSInfo() {
      return new Promise((resolve, reject) => {
        const that = this;
        const c = res => {
          if (res.errcode === 0) {
            that.psList = res.data;
          } else {
          }
          resolve("something");
        };
        const param = {
          resolutionId: that.$route.query.resolutionId
        };

        getResolutionInfoApi(param).then(c);
      });
    },
    getResoluInfo() {
      return new Promise((resolve, reject) => {
        const that = this;
        const c = res => {
          if (res.errcode === 0) {
            that.listDtl = res.data[0];
            that.decisionId = res.data[0].decisionId;
            for (var i = 0; i < res.data[0].pictureList.length; i++) {
              const a = res.data[0].pictureList[i];
              that.tianImgList.push(
                "http://merit.dsunyun.com/m_decisionMaking/loadImage?fileName=" +
                a.pictureName
              );
            }
            if (that.listDtl.countDown !== null && that.list.countDown !== "0") {
              that.dicyTimes = that.$common.DateClculateA(that.listDtl.countDown);
              that.calculateDate(1);
            }
          } else {
          }
          resolve("something");
        };
        const param = {
          resolutionId: that.$route.query.resolutionId,
          resolutionType: 0,
          countDownUserName: that.$common.getUserInfo("userName")
        };
        getResolutionApi(param).then(c);
      });
    },
    getJcInfo() {
      const that = this;
      const c = res => {
        if (res.errcode === 0) {
          that.decisionList = res.data[0];
          if (that.decisionList.statusStr === "结案") {
            that.scoreShow = true;
            that.tabtnShow = false;
          }
        } else {
        }
      };
      const param = {
        decisionId: that.list.decisionId,
        userName: that.$common.getUserInfo("userName"),
        makType: 0
      };
      getDecisionMaking(param).then(c);
    },
    calculateDate(type) {
      const that = this;
      let clock = window.setInterval(() => {
        //console.log("启动");
        that.dicyTimes = that.$common.DateClculateB(that.dicyTimes, 1000);
        that.timesValue = that.$common.DateClculate(that.dicyTimes)
      }, 1000);
      if (type === 2) {
        console.log("关闭");
        window.clearInterval(clock);
      }
    },
    getQui() {
      return new Promise((resolve, reject) => {
        const that = this;
        const callbackA = res => {
          if (res.errcode === 0) {
            that.tiwenlist = res.data;
          } else {
          }
          resolve();
        };
        const param = {
          resolutionId: that.$route.query.resolutionId,
          userName: that.$common.getUserInfo("userName"),
          makQuizType: 0
        };
        getQuizInfo(param).then(callbackA);
      });
    },
    btn_tw() {
      this.show = true;
      this.popupTitle = "提问";
      this.tiwenShow = true;
      this.pingshenShow = false;
    },
    btn_ps() {
      this.show = true;
      this.popupTitle = "评审";
      this.pingshenShow = true;
      this.tiwenShow = false;
    },
    btnSaveTw() {
      const that = this;
      if (that.quizCentent.replace(/\s+/g, "") === "") {
        that.$toast.fail("请输入提问的内容");
        return;
      }

      const callback = res => {
        if (res.errcode === 0) {
          that.$toast.success(res.errmsg);
          that.tiwenShow = false;
          that.show = false;
          that.quizCentent = "";
          that.getQui(that.resolutionId);
        } else {
          that.$toast.fail(res.errmsg);
          return;
        }
      };
      const param = {
        quizCentent: that.quizCentent,
        resolutionId: that.$route.query.resolutionId,
        decisionId: that.list.decisionId,
        createUser: that.$common.getUserInfo("userName")
      };
      addQuizInfo(param).then(callback);
    },
    btnSavePs() {
      const that = this;
      that.tabtnShow = false;
      let checklist = [
        { domId: "resolutionMerit", msg: "请输入优点", valiType: "" },
        { domId: "resolutionDefect", msg: "请输入缺点", valiType: "" },
        { domId: "resolutionScore", msg: "请输入分数1-10", valiType: "" },
        { domId: "resolutionConclusion", msg: "请输入结论", valiType: "" }
      ];
      if (!that.$checkVal.validateNull(that.psObj, checklist)) {
        return;
      }
      if (that.psObj.resolutionScore > 10 || that.psObj.resolutionScore < 0) {
        that.psObj.resolutionScore_err = "请输入分数1-10";
        return;
      }
      const callback = res => {
        if (res.errcode === 0) {
          that.$toast.success(res.errmsg);
          that.pingshenShow = !that.pingshenShow;
          that.show = false;
          that.tabtnShow = false;
          //location.reload();
          that.$router.go(-1)
        } else {
          that.$toast.fail(res.errmsg);
          return;
        }
      };
      const param = {
        decisionId: that.list.decisionId,
        resolutionId: that.$route.query.resolutionId,
        resolutionConclusion: that.psObj.resolutionConclusion,
        resolutionMerit: that.psObj.resolutionMerit,
        resolutionDefect: that.psObj.resolutionDefect,
        resolutionScore: that.psObj.resolutionScore,
        createUser: that.$common.getUserInfo("userName")
      };
      addResolutionDtlInfo(param).then(callback);
    },
    showAnswer(id) {
      this.answerId = id;
      this.ffshow = !this.ffshow;
    },
    addAnswer() {
      const that = this;
      if (that.answerCentent.replace(/\s+/g, "") === "") {
        that.$toast.fail("请输入回复的内容");
        return;
      }
      const c = res => {
        if (res.errcode === 0) {
          that.$toast.success({
            message: "回复成功",
            duration: 2000
          });
          that.answerCentent = "";
          that.ffshow = !that.ffshow;
          that.getQui();
        }
      };
      const param = {
        quizId: that.answerId,
        answerCentent: that.answerCentent,
        createUser: that.$common.getUserInfo("userName")
      };
      addAnswerInfo(param).then(c);
    },
    imgPreview(index) {
      const that = this;
      ImagePreview(that.imgList);
    },
    imgPreviewTiAn(index) {
      const that = this;
      ImagePreview(that.tianImgList);
    }
  }
};
</script>

<style  lang="less">
.detailsPanel {
	overflow-x: auto;
	.van-collapse-item {
		background: white;
	}
	.van-collapse-item__title {
		background: url(../../../assets/images/bgcolor_sta02.png) no-repeat;
		background-size: contain;
		color: white;
	}
	.van-col--18 {
		color: #656363;
	}
}
.details {
	div {
		//border-bottom: 1px solid #333;
		line-height: 25px;
	}
	.d-t {
		text-align: center;
	}
	.d-c {
		padding: 10px 0;
		text-indent: 30px;
		border-top: 1px solid #e5e5e5;
		border-bottom: 1px solid #e5e5e5;
	}
	.d-p {
		font-size: 12px;
		color: #666;
	}
	.van-collapse-item__content {
		padding: 5px 10px;
	}
}
.de-boA {
	position: fixed;
	bottom: 0px;
	margin-top: 10px;
	width: 100%;
	.van-button--small {
		height: 45px;
		line-height: 38px;
		width: 33.3%;
	}
	.dflex {
		display: flex;
		height: 45px;
		div {
			width: 100%;
			height: 45px;
			line-height: 43px;
			text-align: center;
			color: white;
		}
		.b-red {
			background: #f44;
			//	border-radius: 5px 0 0 0;
		}
		.b-cheng {
			background: #ff7f00;
		}
		.b-green {
			//	border-radius: 0 5px 0 0;
			background: rgb(77, 201, 46);
		}
	}
}
.creative .van-field .van-cell__title {
	max-width: 50px;
}
.wdt-title {
	.wdt-toux img {
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
	div {
		height: 40px;
		line-height: 40px;
	}
}
.wdt-c {
	color: #666;
	font-size: 12px;
}
.dd-wd {
	height: 40px;
	line-height: 40px;
	padding-left: 20px;
	background: white;
	color: white;
	margin-top: 10px;
	background: url(../../../assets/images/bgcolor_sta02.png) no-repeat;
	background-size: contain;
}
.content {
	text-indent: 20px;
}
.pingshen .van-col--4 {
	text-align: right;
}
.pingshen .van-col--18,
.pingshen .van-col--12 {
	padding-left: 10px;
}
.details .van-col-6 {
	color: #999;
}
</style>
