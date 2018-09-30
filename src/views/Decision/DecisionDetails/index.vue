<template>
  <div>
    <div class="detailsPanel">
      <van-cell-group class="details">
        <van-cell>
          <div style=" position: relative;">
            <!-- <div class="daojishi">
            12321
        </div> -->
            <div class="d-t">{{list.decisionName}}</div>
            <div class="d-p">类型:{{list.decisionTypeStr}}</div>
            <div class="d-c">
              {{list.decisionContent}}</div>
            <div v-if="list.countDown!==null" class=" colored">倒计时:{{timesValue}}</div>
            <div v-if="list.countDown!==null" class=" colored">{{textValue}}</div>

            <div class="d-p">时间要求:{{list.closeTime}}天</div>
            <div class="d-p">提案人:{{list.decisionProposer}}</div>
            <div class="d-p">评审人:{{list.decisionAssessor}}</div>
            <div class="d-p">创建决策人:{{list.createUser}}</div>
            <div class="d-p">创建时间:{{list.createTime}}</div>
            <div>
              <ul class="up-img-ul">
                <li v-for="(item,index) in imgList" :key="index">
                  <img width="70px" height="90px" @click="imgPreview(index)" :src="item">
                </li>
              </ul>
            </div>
          </div>
        </van-cell>
      </van-cell-group>
      <div v-if="talistShow">
        <div class="bg-white">
          <div class="dd-wd">提案列表</div>
        </div>
        <van-cell-group>
          <div v-if="talist.length>0">
            <van-cell v-for="(item, index) in talist" :key="index" @click="skipCreative(item.resolutionId,item.decisionId)" v-bind:class="{'bgsbred':item.remarks==='1'}">
              <van-row>
                <van-col span="20">
                  <div class="wl_c">{{item.resolutionName}}</div>
                  <van-row class="w_l_t">
                    <van-col span="14">{{item.createTime}}</van-col>
                    <van-col span="10">申请人:{{item.createUser}}</van-col>
                  </van-row>
                </van-col>
                <van-col style="height:48px" span="4">
                  <div> {{item.statusStr}}</div>
                  <div v-if="item.score!==0">{{item.score}}分</div>
                </van-col>
              </van-row>
            </van-cell>
          </div>
          <div v-else class="no-data">
            暂无提案
          </div>
        </van-cell-group>
      </div>
      <div v-if="noJCList.length>0">
        <div class="bg-white">
          <div class="dd-wd">未参与提案</div>
        </div>
        <van-cell-group v-for="(item,index) in noJCList" :key="index">
          <div class="div-jainfo">
            <div>
              <van-row>
                <van-col span="6">提案人:</van-col>
                <van-col span="16">{{item.decisionProposer}}</van-col>
              </van-row>
            </div>
            <div>
              <van-row>
                <van-col span="6">原因:</van-col>
                <van-col span="16">{{item.remarks}}</van-col>
              </van-row>
            </div>
          </div>
        </van-cell-group>
      </div>
      <div v-if="list.statusStr === '结案'">
        <div class="bg-white">
          <div class="dd-wd">结案信息</div>
        </div>
        <van-cell-group>
          <div class="div-jainfo">
            <div>
              <van-row>
                <van-col span="8">最优创意提案:</van-col>
                <van-col span="16">{{list.optimalResolutionName}}</van-col>
              </van-row>
            </div>
            <div>
              <van-row>
                <van-col span="8">最终结案:</van-col>
                <van-col span="16">{{list.finalResolutionName}}</van-col>
              </van-row>
            </div>
          </div>
        </van-cell-group>
      </div>
      <div v-if="tiwenlistshow">
        <div class="bg-white">
          <div class="dd-wd">问答</div>
        </div>
        <van-cell-group>
          <div v-if="tiwenlist.length>0">
            <van-cell v-for="(item,index) in tiwenlist" :key="index">
              <div>
                <van-row class="wdt-title">
                  <van-col span="4" class="wdt-toux"><img :src="toux"> </van-col>
                  <van-col span="6">{{item.createUser}}</van-col>
                  <van-col span="12">{{item.createTime}}</van-col>
                </van-row>
                <van-row class="wd-f">
                  <van-col span="20">{{item.quizCentent}}</van-col>
                  <van-col span="4" class="ff" v-if="isShowFF">
                    <div @click="showAnswer(item.quizId)">回复</div>
                  </van-col>
                </van-row>
                <!-- <div v-for="(ff,ffindex) in item.answerInfoList" :key="ffindex" class="div-ff">
                {{ff.createUser}}回复:{{ff.answerCentent}}
              </div> -->
                <div v-for="(ff,ffindex) in item.answerInfoList" :key="ffindex">
                  <van-col span="20" class="div-ff">{{ff.createUser}}回复:{{ff.answerCentent}}</van-col>
                  <van-col span="4" class="ff" v-if="isAshowFF && ffindex+1 === item.answerInfoList.length">
                    <div @click="showAnswer(item.quizId)" style="color:blue;line-height:30px;">回复</div>
                  </van-col>
                </div>
              </div>
            </van-cell>
          </div>
          <div v-else class="no-data">
            暂无提问
          </div>
          <div style="width:100%;height:48px;"></div>
        </van-cell-group>
      </div>
    </div>
    <div class="de-bo" v-if="tianshow">
      <div class="dflex">
        <div class="b-red" v-if="cshow" @click="goNoPation()">不参与</div>
        <div class="b-cheng" v-if="btntiwenShow" @click="goTiWen()">提问</div>
        <div class="b-green" v-if="noCshow" @click="goPation()">参与</div>
        <div class="b-green" v-if="jaShow" @click="goJieAn()">结案</div>
        <div class="b-green" v-if="fqtaShow" @click="goTiAn()">发起提案</div>
      </div>
    </div>
    <van-popup v-model="show" style="width:80%;" class="creative">
      <div v-if="twshow">
        <div class="popup-title text-align-c">
          <h3>提问</h3>
        </div>
        <van-cell-group>
          <van-field required v-model="quizCentent" label="提问" type="textarea" placeholder="请录入提问信息，提案名称不超过200个字" rows="6" autosize />
        </van-cell-group>
        <div class="div-btn">
          <van-button type="primary" size="newlarge" @click="btnSaveTw">发起提问
          </van-button>
        </div>
      </div>
      <div v-if="nocyshow">
        <div class="popup-title text-align-c">
          <h3>不参与原因</h3>
        </div>
        <van-cell-group>
          <!-- <van-field :value="list.decisionName" required clearable label="创意提案名称" disabled /> -->
          <div>
            <van-row>
              <van-col span="6" class="wdt-toux" style="text-align:center;">
                <div>创意提</div>
                <div>案名称</div>
              </van-col>
              <van-col span="18">{{list.decisionName}}</van-col>
            </van-row>
          </div>
          <van-field v-model="remarks" required label="原因" type="textarea" placeholder="请在这里录入不参与提案评审的原因不超过200个字。" rows="6" autosize />
        </van-cell-group>
        <div class="div-btn">
          <van-button type="primary" size="newlarge" @click="btnNoPation">提交
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
import {
  parDecisionMakingApi,
  GetdecisionMakingByIdApi,
  getResolutionApi
} from "@/utils/httpUtils/api.js";
import { ImagePreview } from "vant";
import {
  getDecisionMaking,
  getQuizInfo,
  notDecisionMaking,
  addQuizInfo,
  addAnswerInfo,
  getQuizInfoA,
  queryNoJC,
  getCreativeDetails
} from "./api";
export default {
  data() {
    return {
      msg: "asdd",
      toux: view,
      list: {},
      tiwenlist: [],
      show: false,
      ffshow: false,
      twshow: false,
      nocyshow: false,
      remarks: "",
      quizCentent: "",
      answerCentent: "",
      answerId: "",
      isShowFF: false,
      tianshow: true,
      imgList: [],
      jcrShow: false,
      btntiwenShow: true,
      noJCList: [],
      isAshowFF: false,
      talist: [],
      jaShow: false,
      btnfqta: true,
      talistShow: false,
      cshow: true,
      noCshow: true,
      fqtaShow: false,
      dicyTimes: "",
      timesValue: '',
      tiwenlistshow: true,
      textValue: '超时未处理，系统默认自动参与',
    };
  },
  mounted() {
    const that = this;
    that.$toast.loading({
      mask: true,
      message: "加载中..."
    });
    setTimeout(() => {
      that.$toast.clear();
    }, 2000);
    that
      .getDecision()
      .then(() => {
        //return that.getTaDetails()
        return that.getResolution();
      })
      .then(() => {
        return that.getTiwenList();
      })
      .then(() => {
        return that.checkDiv();
      });
  },
  methods: {
    getDecision() {
      return new Promise((resolve, reject) => {
        const that = this;
        const callback = res => {
          if (res.errcode === 0) {
            that.$toast.clear();
            that.list = res.data[0];
            for (var i = 0; i < res.data[0].pictureList.length; i++) {
              const a = res.data[0].pictureList[i];
              that.imgList.push(
                "http://merit.dsunyun.com/m_decisionMaking/loadImage?fileName=" +
                a.pictureName
              );
            }
            if (that.list.countDown !== null && that.list.countDown !== "0") {
              that.dicyTimes = that.$common.DateClculateA(that.list.countDown);
              that.calculateDate(1);
            }
          } else {
          }
          resolve();
        };
        var param = {
          decisionId: that.$route.query.decisionId,
          userName: that.$common.getUserInfo("userName")
        };
        if (that.$route.query.deciType === "weicanyu") {
          param.queryType = 1;
        }
        if (that.$route.query.deciType === "yicanyu") {
          param.queryType = 2;
        }
        if (that.$route.query.statusStr === "待结案") {
          param.queryType = 3;
          that.textValue = '超时未处理，系统将不能结案并扣除权重分，需联系管理员。'
        }

        GetdecisionMakingByIdApi(param).then(callback);
      });
    },
    checkDiv() {
      return new Promise((resolve, reject) => {
        const that = this;
        //未参与
        if (that.list.isParticipation === 1) {
          that.cshow = false;
          that.noCshow = false;
          that.btntiwenShow = false;
        }
        //参与
        if (that.list.isParticipation === 2) {
          that.noCshow = false;
          that.cshow = false;
          that.fqtaShow = true;
        }
        //啥也没干
        if (that.list.isParticipation === 0) {
        }
        console.log(that.$route);
        //未参与
        if (that.$route.query.type === 1 || that.$route.query.type === "1") {
          that.cshow = false;
          that.noCshow = false;
          that.btntiwenShow = false;
        }
        //参与
        if (that.$route.query.type === 2 || that.$route.query.type === "2") {
          that.noCshow = false;
          that.cshow = false;
          that.fqtaShow = true;
          that.btntiwenShow = true;
        }
        if (that.list.createUser === that.$common.getUserInfo("userName")) {
          that.isShowFF = true;
          that.btntiwenShow = false;
          that.talistShow = true;
          that.getNoJcInfo();
        } else {
          that.tianshow = true;
          that.isAshowFF = true;
        }
        if (that.$route.query.deciType === "weicanyu") {
          that.isAshowFF = false;
        }
        if (that.$route.query.isExistsResolution === "存在") {
          that.fqtaShow = false;
        }
        if (that.$route.query.statusStr === "待结案") {
          that.cshow = false;
          that.btntiwenShow = false;
          that.noCshow = false;
          that.jaShow = true;
        }
        if (that.$route.query.pageType === "No") {
          that.tianshow = false
          that.tiwenlistshow = false
        }
        if (that.$route.query.statusStr === "yijiean") {
          that.cshow = false;
          that.btntiwenShow = false;
          that.noCshow = false;
          that.jaShow = false;
        }
        // var assessorA = that.list.decisionProposer
        // var temp = assessorA.split(',')
        // var num = 0
        // for (var i = 0; i < temp.length; i++) {
        //   if (temp[i] === that.$common.getUserInfo("userName")) {
        //     num = 1
        //   }
        // }
        // if (num !== 1) {
        //   that.tianshow = false
        // }
        // if (that.list.statusStr === '结案') {
        //   that.tianshow = false
        // }
        // var proposerList = that.list.decisionProposer.indexOf(',')
        // if (proposerList + 1 === that.talist.length) {
        //   that.jaShow = true
        //   that.btnfqta = false
        //   that.tianshow = true
        // }
        resolve();
      });
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
    goPation() {
      const that = this;
      const c = res => {
        if (res.errcode === 0) {
          that.$toast.success("参与成功");
          //that.$router.go(-1);
          setTimeout(() => {
            that.$router.push({
              path: "/DecisionDetails",
              query: {
                decisionId: that.$route.query.decisionId,
                type: 2,
                deciType: "yicanyu"
              }
            });
            that.checkDiv()
          }, 1500);
        }
      };
      const param = {
        decisionProposer: that.$common.getUserInfo("userName"),
        decisionId: that.$route.query.decisionId
      };
      parDecisionMakingApi(param).then(c);
    },
    skipCreative(resolutionId, decisionId) {
      this.$router.push({
        path: "/CreativeDetails",
        query: {
          resolutionId: resolutionId,
          decisionId: decisionId,
          pageType: "No"
        }
      });
    },
    getTaDetails() {
      return new Promise((resolve, reject) => {
        const that = this;
        const c = res => {
          if (res.errcode === 0) {
            that.talist = res.data;
            for (var i = 0; i < that.talist.length; i++) {
              console.log(that.talist[i])
              if (that.talist[i].score === that.talist[0].score) {
                that.talist[i].remarks === '1'
              }
            }

          }

          resolve();
        };
        const param = {
          decisionId: that.$route.query.decisionId
        };
        getCreativeDetails(param).then(c);
      });
    },
    getResolution() {
      return new Promise((resolve, reject) => {
        const that = this;
        const c = res => {
          if (res.errcode === 0) {
            that.talist = res.data;
            for (var i = 0; i < that.talist.length; i++) {
              if (that.talist[i].score === that.talist[0].score && that.talist[0].score !== 0) {
                that.talist[i].remarks = '1'
              }
            }
          }
        };
        const param = {
          decisionId: that.$route.query.decisionId,
          resolutionType: 0
        };
        getResolutionApi(param).then(c);
        resolve();
      });
    },
    getTiwenList() {
      return new Promise((resolve, reject) => {
        const that = this;
        const callbackA = res => {
          if (res.errcode === 0) {
            that.tiwenlist = res.data;
            that.tiwenlist.forEach(item => {
              if (item.createUser === that.$common.getUserInfo("userName") && (that.$route.query.type === 0 || that.$route.query.type === '0')) {
                that.btntiwenShow = false;
              }
            });

            that.$toast.clear();
          } else {
            that.$toast.clear();
          }
          resolve();
        };
        const param = {
          decisionId: that.$route.query.decisionId,
          userName: that.$common.getUserInfo("userName"),
          makQuizType: 1
        };
        getQuizInfoA(param).then(callbackA);
      });
    },
    getNoJcInfo() {
      const that = this;
      const c = res => {
        if (res.errcode === 0) {
          that.noJCList = res.data;
        }
      };
      const param = {
        decisionId: that.$route.query.decisionId,
        isParticipationResolution: 1
      };
      queryNoJC(param).then(c);
    },
    goTiWen() {
      this.show = true;
      this.twshow = true;
      this.nocyshow = false;
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
          that.getTiwenList();
        } else {
          that.$toast.fail(res.errmsg);
          return;
        }
      };
      const param = {
        quizCentent: that.quizCentent,
        decisionId: that.list.decisionId,
        createUser: that.$common.getUserInfo("userName")
      };
      addQuizInfo(param).then(callback);
    },
    goNoPation() {
      this.show = true;
      this.nocyshow = true;
      this.twshow = false;
    },
    goJieAn() {
      const that = this;
      console.log(that.$route.query.decisionId);
      that.$router.push({
        path: "/Over",
        query: {
          decisionId: that.$route.query.decisionId
        }
      });
    },
    btnNoPation() {
      const that = this;
      if (that.remarks.replace(/\s+/g, "") === "") {
        that.$toast.fail("请输入不参与的内容");
        return;
      }
      const callback = res => {
        if (res.errcode === 0) {
          that.$toast.success({
            message: "提交成功",
            duration: 2000
          });
          that.remarks = "";
          that.$router.push({
            path: "/MyCreative"
          });
          this.show = false;
          this.nocyshow = false;
        } else {
          that.$toast.fail({
            message: res.errmsg,
            duration: 2000
          });
          this.show = false;
          this.nocyshow = false;
        }
      };
      const param = {
        decisionId: that.$route.query.decisionId,
        decisionProposer: that.$common.getUserInfo("userName"),
        remarks: that.remarks
      };
      notDecisionMaking(param).then(callback);
    },
    goTiAn() {
      this.$router.push({
        path: "/SaveCreative",
        query: {
          decisionId: this.list.decisionId
        }
      });
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
          that.ffshow = !that.ffshow;
          that.getTiwenList();
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
    }
  }
};
</script>
<style lang="less">
.detailsPanel {
	overflow-x: auto;
}
.daojishi {
	background: url(../../../assets/images/score.png) no-repeat;
	position: absolute;
	width: 30px;
	height: 30px;
	/* background-size: contain; */
	background-size: contain;
	top: 0px;
	right: 0px;
	color: white;
	text-align: center;
	line-height: 30px;
}
.details {
	div {
		//border-bottom: 1px solid #333;
		line-height: 30px;
	}
	.d-t {
		text-indent: 20px;
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
}
.de-bo {
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
	z-index: 2;
}
.wd-f {
	word-wrap: break-word;
	word-break: normal;
	.ff {
		text-align: center;
		color: blue;
	}
}
.div-jainfo {
	.van-col--6 {
		text-align: right;
		color: #666;
		padding: 5px 10px 5px 0;
	}
	.van-col--18 {
		padding: 5px 0;
	}
	.van-col--8 {
		text-align: right;
		color: #666;
		padding: 5px 10px 5px 0;
	}
	.van-col--16 {
		padding: 5px 0;
	}
}
.w_l_m {
	font-size: 12px;
	color: #666;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.w_l_t {
	font-size: 12px;
	color: #999;
}
.wl_c {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.bgsbred {
	background: #f14545;
	color: white;
	.w_l_t {
		color: white;
	}
}
</style>

