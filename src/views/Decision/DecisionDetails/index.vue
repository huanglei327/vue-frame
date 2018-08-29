<template>
  <div>
    <div class="detailsPanel">
      <van-cell-group class="details">
        <van-cell>
          <div class="d-t">{{list.decisionName}}</div>
          <div class="d-p">类型:{{list.decisionTypeStr}}</div>
          <div class="d-c">{{list.decisionContent}}</div>
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
        </van-cell>
      </van-cell-group>
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
              <div v-for="(ff,ffindex) in item.answerInfoList" :key="ffindex" class="div-ff">
                {{ff.createUser}}回复:{{ff.answerCentent}}
              </div>
            </div>
          </van-cell>
        </div>
        <div v-else class="no-data">
          暂无提问
        </div>
      </van-cell-group>
    </div>
    <div class="de-bo" v-if="tianshow">
      <div class="dflex">
        <div class="b-red" @click="goNoPation()">不参与</div>
        <div class="b-cheng" @click="goTiWen()">提问</div>
        <div class="b-green" @click="goTiAn()">发起提案</div>
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
          <van-field :value="list.decisionName" required clearable label="创意提案名称" disabled />
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
import { ImagePreview } from "vant";
import {
  getDecisionMaking,
  getQuizInfo,
  notDecisionMaking,
  addQuizInfo,
  addAnswerInfo,
  getQuizInfoA
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
    const callback = res => {
      if (res.errcode === 0) {
        that.$toast.clear();
        that.list = res.data[0];
        for (var i = 0; i < res.data[0].pictureList.length; i++) {
          const a = res.data[0].pictureList[i]
          that.imgList.push('http://merit.dsunyun.com/m_decisionMaking/loadImage?fileName=' + a.pictureName)
        }
        that.checkDiv()
      } else {
      }
    };
    const param = {
      decisionId: that.$route.query.decisionId,
      userName: that.$common.getUserInfo("userName"),
      makType:0
    }
    getDecisionMaking(param)
    .then(callback)
    .then(that.getTiwenList())
  },
  methods: {
    checkDiv() {
      const that = this
      if (that.list.createUser === that.$common.getUserInfo("userName")) {
        that.isShowFF = true
      }
      else {
        that.tianshow = true
      }
    },
    getTiwenList() {
      const that = this;
      const callbackA = res => {
        if (res.errcode === 0) {
          console.log(res);
          that.tiwenlist = res.data;
          that.$toast.clear();
        } else {
          that.$toast.clear();
        }
      };
      const param = {
        decisionId: that.$route.query.decisionId,
        userName: that.$common.getUserInfo("userName")
      }
      getQuizInfoA(param).then(callbackA)
    },
    goTiWen() {
      this.show = true;
      this.twshow = true;
      this.nocyshow = false;
    },
    btnSaveTw() {
      const that = this;
      const callback = res => {
        if (res.errcode === 0) {
          that.$toast.success(res.errmsg);
          that.tiwenShow = false;
          that.show = false;
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
    btnNoPation() {
      const that = this;
      const callback = res => {
        if (res.errcode === 0) {
          that.$toast.success({
            message: "提交成功",
            duration: 2000
          });
          that.$router.go(-1);
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
        remarks: this.remarks
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
	height: calc(100vh - 90px);
	overflow-x: auto;
}
.details {
	div {
		//border-bottom: 1px solid #333;
		line-height: 30px;
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
}
.de-bo {
	position: fixed;
	bottom: 0px;
	margin-top: 10px;
	height: calc(100vh-100px);
	width: 100%;
	.van-button--small {
		height: 40px;
		line-height: 38px;
		width: 33.3%;
	}
	.dflex {
		display: flex;
		height: 40px;
		div {
			width: 33.3%;
			height: 40px;
			line-height: 38px;
			text-align: center;
			color: white;
		}
		.b-red {
			background: #f44;
			border-radius: 5px 0 0 0;
		}
		.b-cheng {
			background: #ff7f00;
		}
		.b-green {
			border-radius: 0 5px 0 0;
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
.wd-f {
	word-wrap: break-word;
	word-break: normal;
	.ff {
		text-align: center;
		color: blue;
	}
}
</style>

