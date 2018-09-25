<template>
  <div>
    <div class="detailsInfo">
      <van-cell-group class="detailsx">
        <van-cell>
          <div class="d-t">{{list.decisionName}}</div>
          <div class="d-p">类型:{{list.decisionTypeStr}}</div>
          <div class="d-c">
            {{list.decisionContent}}</div>
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
        </van-cell>
      </van-cell-group>
      <div v-if="talistShow">
        <div class="bg-white">
          <div class="dd-wd">提案列表</div>
        </div>
        <van-collapse  v-model="activeNames">
          <van-collapse-item class="xlk" :title="item.resolutionName" :name="index" v-for="(item, index) in talist" :key="index" >
            <van-row>
                <van-col span="24">
                  <div class="wl_c">{{item.resolutionName}}</div>
                  <div class="wl_cc">{{item.resolutionContent}}</div>
                  <van-row class="w_l_t">
                    <van-col span="14">{{item.createTime}}</van-col>
                    <van-col span="10">申请人:{{item.createUser}}</van-col>
                  </van-row>
                </van-col>
                
              </van-row>
              <div >
                  <div class="mx-title"><span style="color: rgb(255, 210, 30);margin-right: 5px;"><van-icon name="exchange"/></span>评审</div>
                   <div class="detailsx" v-for="(ritem,rindex) in item.resolutionDtlList" :key="rindex">
            <div>
              <van-row>
                <van-col span="4">分数:</van-col>
                <van-col span="12">
                  <van-rate v-model="ritem.resolutionScore" /></van-col>
                <van-col span="4">{{ritem.resolutionScore}}分</van-col>
              </van-row>
            </div>
            <div>
              <van-row>
                <van-col span="4">优点:</van-col>
                <van-col span="18"> {{ritem.resolutionMerit}}</van-col>
              </van-row>
            </div>
            <div>
              <van-row>
                <van-col span="4">缺点:</van-col>
                <van-col span="18"> {{ritem.resolutionDefect}}</van-col>
              </van-row>
            </div>
            <div>
              <van-row>
                <van-col span="4">结论:</van-col>
                <van-col span="18">{{ritem.resolutionConclusion}}</van-col>
              </van-row>
            </div>
            <div>
              <van-row>
                <van-col span="4">评审人:</van-col>
                <van-col span="18">{{ritem.createUser}}</van-col>
              </van-row>
            </div>
             <div>
              <van-row>
                <van-col span="4">评审时间:</van-col>
                <van-col span="18">{{ritem.createTime}}</van-col>
              </van-row>
            </div>
          </div>
              </div>
            <div>

               <div class="mx-title"><span style="color: rgb(255, 210, 30);margin-right: 5px;"><van-icon name="exchange"/></span>提问</div>
       
          <van-cell v-for="(qitem,qindex) in item.quizList" :key="qindex">
            <div>
              <van-row class="wdt-title">
                <van-col span="4" class="wdt-toux"><img :src="toux"> </van-col>
                <van-col span="6">{{qitem.createUser}}</van-col>
                <van-col span="12">{{qitem.createTime}}</van-col>
              </van-row>
              <van-row class="wd-f">
                <van-col span="20">{{qitem.quizCentent}}</van-col>
                <!-- <van-col span="4" class="ff" v-if="isShowFF">
                  <div @click="showAnswer(qitem.quizId)">回复</div>
                </van-col> -->
              </van-row>
              <!-- <div v-for="(ff,ffindex) in item.answerInfoList" :key="ffindex" class="div-ff">
                {{ff.createUser}}回复:{{ff.answerCentent}}
              </div> -->
              <div v-for="(ff,ffindex) in qitem.answerInfoList" :key="ffindex">
                <van-col span="20" class="div-ff">{{ff.createUser}}回复:{{ff.answerCentent}}</van-col>
              </div>
            </div>
          </van-cell>
            </div>
          </van-collapse-item>
            </van-collapse>
        <van-cell-group>
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
           
              </van-row>
           
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
</template>

<script>
import view1 from "../../assets/images/smallxr0.png";
import { ImagePreview } from "vant";
import { getCloseInfo } from "./api";
export default {
  data() {
    return {
      toux: view1,
      isShowFF: false,
      list: [],
      imgList: [],
      talistShow: true,
      activeNames: ["0"],
      talist: [],
      noJCList: [],
      tiwenlist: []
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
    that.getDecision();
  },
  methods: {
    getDecision() {
      return new Promise((resolve, reject) => {
        const that = this;
        const callback = res => {
          if (res.errcode === 0) {
            that.$toast.clear();
            that.list = res.data[0];
            that.talist = res.data[0].resolutionList;
            that.tiwenlist = res.data[0].quizList;
            console.log(that.tiwenlist)
            for (var i = 0; i < res.data[0].pictureList.length; i++) {
              const a = res.data[0].pictureList[i];
              that.imgList.push(
                "http://merit.dsunyun.com/m_decisionMaking/loadImage?fileName=" +
                  a.pictureName
              );
            }
            //that.checkDiv()
          } else {
          }
          resolve();
        };
        const param = {
          decisionId: that.$route.query.decisionId,
          userName: that.$common.getUserInfo("userName")
        };
        getCloseInfo(param).then(callback);
      });
    },
    getPsInfo() {
      return new Promise((resolve, reject) => {
        const that = this;
        const c = res => {
          if (res.errcode === 0) {
          } else {
          }
          resolve();
        };
        const param = {
          decisionId: that.$route.query.decisionId,
          userName: that.$common.getUserInfo("userName"),
          assessorType: 0
        };
        getPSInfoApi(param).then(c);
      });
    },
    goPation() {
      const that = this;
      const c = res => {
        if (res.errcode === 0) {
          that.$toast.success("参与成功");
          that.$router.push({
            path: "/"
          });
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
          }
          resolve();
        };
        const param = {
          decisionId: that.$route.query.decisionId,
          resolutionType: 0
        };
        getResolutionApi(param).then(c);
      });
    },
    getTiwenList() {
      return new Promise((resolve, reject) => {
        const that = this;
        const callbackA = res => {
          if (res.errcode === 0) {
            that.tiwenlist = res.data;
            that.tiwenlist.forEach(item => {
              if (item.createUser === that.$common.getUserInfo("userName")) {
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
          makQuizType: 0
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
      const callback = res => {
        if (res.errcode === 0) {
          that.$toast.success({
            message: "提交成功",
            duration: 2000
          });
          that.$route.push({
            path: "/"
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
.detailsInfo {
  overflow-x: auto;
}
.detailsx {
  border: 1px solid #e5e5e5e5;
  border-radius: 10px;
  padding: 5px;
  background: white;
  margin-bottom: 5px;
  div {
    //border-bottom: 1px solid #333;
    line-height: 26px;
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
.xlk {
  .van-collapse-item__content {
    background: #e5e5e5;
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
  background: url(../../assets/images/bgcolor_sta02.png) no-repeat;
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
.wl_cc {
  overflow: hidden;
  text-overflow: ellipsis;
  color: #716d6d;
  font-size: 12px;
  line-height: 20px;
}

.mx-title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  border: 1px solid #e5e5e5;
  text-indent: 3px;
  margin: 5px 0;
  background: white;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
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
  background: url(../../assets/images/bgcolor_sta02.png) no-repeat;
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
</style>

