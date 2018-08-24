<template>
  <div>
    <van-list v-model="loading" :finished="finished" @load="onLoad" :offset="300">
      <van-cell v-for="item in list" :key="item.id" style="margin-top:5px;" @click="goDetails(item.decisionId)">
        <div class="d-c-title">
          <van-row>
            <van-col span="20" class="title"> {{item.decisionName}}</van-col>
            <van-col span="4" class="status">{{item.statusStr}}</van-col>
          </van-row>
        </div>
        <div class="sizecor d-c-content">{{item.decisionContent}}</div>
        <!-- <div class="sizecor d-c-title">提案人:{{item.decisionProposer}}</div>
        <div class="sizecor d-c-title">评审人:{{item.decisionAssessor}}</div> -->
        <van-row class="sizecor">
          <van-col span="8">决策人:{{item.createUser}}</van-col>
          <van-col span="16">申请时间:{{item.createTime}}</van-col>
        </van-row>
        <!-- <van-row class="sizecor">
          <van-col span="12">
            <van-button size="small" @click="goDetails(item.decisionId)">查看决策</van-button>
          </van-col>
          <van-col span="12">
            <van-button size="small"  @click="goRemind(item.decisionId)">查看提案</van-button>
          </van-col>
        </van-row> -->
      </van-cell>

      <div class="div-noshow" v-if="noDataShow">暂无数据</div>
    </van-list>
  </div>
</template>

<script>
import { getDecisionMaking } from './api'
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      pagesize: 20,
      noDataShow: false
    };
  },

  methods: {
    onLoad() {
      const that = this
      setTimeout(() => {
        // var num = 1
        // const objlist = JSON.parse(localStorage.getItem("jclocal"))
        // for (let i = 0; i < objlist.length; i++) {
        //   if ((that.page * that.pagesize) > i || i < (that.page + 1) * that.pagesize) {
        //     that.list.push(objlist[i])
        //     num = num +1
        //   }
        // }
        // this.loading = false;
        // console.log(num)
        // if (num < that.pagesize) {
        //   this.finished = true;
        // }
        const callback = res => {
          console.log(res)
          if (res.errcode === 0) {
            that.list = res.data
          } else {
            that.noDataShow = true
          }
        }
        getDecisionMaking(that.$common.getUserInfo("userName")).then(callback)
        this.loading = false
        this.finished = true
      }, 500)
    },
    goRemind(decisionId) {
      var path = "/Remind?decisionId=" + decisionId

      if (this.$route.query.type === "over") {
        path = "/Over?decisionId=" + decisionId
      }
      this.$router.push({
        path: path
      })
    },
    goDetails(decisionId) {
      var path = "/DecisionDetails"
      if (this.$route.query.type === "over") {
        path = "/Over?decisionId=" + decisionId
      }
      this.$router.push({
        path: path,
        query: {
          decisionId: decisionId
        }
      })
    }
  }
}
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
