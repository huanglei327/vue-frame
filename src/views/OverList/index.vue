<template>
  <div>
        <van-list v-model="loading" :finished="finished" @load="onLoad" :offset="300">
          <van-cell v-for="(item,index) in list" :key="index" style="margin-top:5px;" :class="{ 'border-yellow': index% 2===0}" @click="goDetails(item.decisionId)">
            <div class="d-c-title">
              <van-row>
                <van-col span="20" class="title"> {{item.decisionName}}</van-col>
                <van-col span="4" class="status">{{item.statusStr}}</van-col>
              </van-row>
            </div>
            <div class="sizecor d-c-content">{{item.decisionContent}}</div>
            <van-row class="sizecor">
              <van-col span="8">决策人:{{item.createUser}}</van-col>
              <van-col span="16">申请时间:{{item.createTime}}</van-col>
            </van-row>
          </van-cell>

          <div class="div-noshow" v-if="noDataShow">暂无数据</div>
        </van-list>
  </div>
</template>

<script>
import { getCloseInfo } from "./api";
export default {
  data() {
    return {
      msg: "123",
      list: [],
      loading: false,
      finished: false,
      page: 1,
      pagesize: 20,
      noDataShow: false,
      active: 0,
      loading1: false,
      finished1: false,
      list1: [],
      noDataShow1: false
    };
  },

  methods: {
    onLoad() {
      const that = this;
      setTimeout(() => {
        const callback = res => {
          console.log(res);
          if (res.errcode === 0 && res.data.length > 0) {
            that.list = res.data;
          } else {
            that.noDataShow = true;
          }
        };
        const param = {
          userName: that.$common.getUserInfo("userName")
        };
        getCloseInfo(param).then(callback);
        this.loading = false;
        this.finished = true;
      }, 500);
    },
    goDetails(decisionId) {
      this.$router.push({
        path: '/OverInfo',
        query: {
          decisionId: decisionId,
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
.d-c-content {
  line-height: 16px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.sizecor {
  font-size: 12px;
  color: #666;
}
.div-noshow {
  text-align: center;
  font-size: 12px;
  padding: 10px;
}
</style>
