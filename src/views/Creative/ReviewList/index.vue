<template>
  <div>
    <van-tabs v-model="active" sticky @click="tabsClick">
      <van-tab title="未完成">
        <van-list v-model="loading" :finished="finished" @load="onLoad" :offset="300">
          <van-cell v-for="item in list" :key="item.id" style="margin-top:5px;" @click="goJCDetails(item.resolutionId,item.score,item.decisionId,1)">
            <div style="position:relative;">
              <div class="d-c-title">
                <van-row>
                  <van-col span="20" class="title"> {{item.decisionName}}</van-col>

                </van-row>
              </div>
              <!-- <div class="sizecor d-c-content">{{item.resolutionContent}}</div> -->
              <van-row class="sizecor">
                <van-col span="16">申请时间:{{item.createTime}}</van-col>
                <van-col span="8" class="status">决策状态:{{item.statusStr}}</van-col>
              </van-row>

              <div v-if="item.score>0" class="div-score">{{item.score}}</div>
            </div>
          </van-cell>

          <div class="div-noshow" v-if="noDataShow">暂无数据</div>
        </van-list>
      </van-tab>
      <van-tab title="已完成">
        <van-list v-model="loading1" :finished="finished1" @load="onLoad1" :offset="300">
          <van-cell v-for="item in list1" :key="item.id" style="margin-top:5px;" @click="goJCDetails(item.resolutionId,item.score,item.decisionId,2)">
            <div style="position:relative;">
              <div class="d-c-title">
                <van-row>
                  <van-col span="20" class="title"> {{item.decisionName}}</van-col>

                </van-row>
              </div>
              <!-- <div class="sizecor d-c-content">{{item.resolutionContent}}</div> -->
              <van-row class="sizecor">
                <van-col span="16">申请时间:{{item.createTime}}</van-col>
                <van-col span="8" class="status">决策状态:{{item.statusStr}}</van-col>
              </van-row>
              <div v-if="item.score>0" class="div-score">{{item.score}}</div>
            </div>
          </van-cell>

          <div class="div-noshow" v-if="noDataShow1">暂无数据</div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getDecisionMaking, getMyCreactive, GetDecisionList } from "./api";
export default {
  data() {
    return {
      msg: "1323",
      active: 0,
      loading: false,
      finished: false,
      list: [],
      loading1: false,
      finished1: false,
      list1: [],
      noDataShow: false,
      noDataShow1: false,
      tlist: [
        {
          name: "未发起"
        },
        {
          name: "已发起"
        }
      ]
    };
  },
  methods: {
    onLoad() {
      const that = this;
      setTimeout(() => {
        const callback = res => {
          console.log(res);
          if (res.errcode === 0) {
            //that.list = res.data;
            for (var i = 0; i < res.data.length; i++) {
              var temp = false;
              for (var j = 0; j < that.list.length; j++) {
                if (res.data[i].decisionId === that.list[j].decisionId) {
                  temp = true;
                }
              }
              if (temp === false) {
                that.list.push(res.data[i]);
              }
            }
          } else {
            that.noDataShow = true;
          }
        };
        const param = {
          userName: that.$common.getUserInfo("userName"),
          assessorType: 1
        };
        GetDecisionList(param).then(callback);
        this.loading = false;
        this.finished = true;
      }, 500);
    },
    onLoad1() {
      const that = this;
      setTimeout(() => {
        const callback = res => {
          if (res.errcode === 0) {
            //that.list1 = res.data;
            for (var i = 0; i < res.data.length; i++) {
              var temp = false;
              if (that.list1.length > 0) {
                for (var j = 0; j < that.list1.length; j++) {
                  if (res.data[i].decisionId === that.list1[j].decisionId) {
                    temp = true;
                  }
                }
              }
              if (temp === false) {
                that.list1.push(res.data[i]);
              }
            }
          } else {
            that.noDataShow1 = true;
          }
        };
        const param = {
          userName: that.$common.getUserInfo("userName"),
          assessorType: 2
        };
        GetDecisionList(param).then(callback);
        this.loading1 = false;
        this.finished1 = true;
      }, 500);
    },
    tabsClick(index, title) {
      console.log(index, title);
      const that = this;
      if (index === 0) {
        that.onLoad();
        this.finished = false;
        this.finished1 = true;
        this.list = [];
      } else {
        that.onLoad1();
        this.finished1 = false;
        this.finished = true;
        this.list1 = [];
      }
    },
    goDetails(decisionId) {
      this.$router.push({
        path: "/DecisionDetails",
        query: {
          decisionId: decisionId
        }
      });
    },
    goJCDetails(resolutionId, score, decisionId, type) {
      if (score > 0) var pageType = "No";
      this.$router.push({
        path: "/ReviewDicyList",
        query: {
          resolutionId: resolutionId,
          pageType: pageType,
          decisionId: decisionId,
          type: type
        }
      });
    }
  }
};
</script>
<style lang="less">
.d-c-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  .title {
    font-size: 14px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 5px;
  }
  .status {
    font-size: 12px;
  }
}
.div-score {
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
</style>

