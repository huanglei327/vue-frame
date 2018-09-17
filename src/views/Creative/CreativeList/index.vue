<template>
    <div>
        <van-tabs v-model="active" sticky @click="tabsClick">
            <van-tab title="未发起">
                <van-list v-model="loading" :finished="finished" @load="onLoad" :offset="300">
                    <van-cell v-for="item in list" :key="item.id" style="margin-top:5px;" @click="goDetails(item.decisionId)">
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
            </van-tab>
            <van-tab title="已发起">
                <van-list v-model="loading1" :finished="finished1" @load="onLoad1" :offset="300">
                    <van-cell v-for="item in list1" :key="item.id" style="margin-top:5px;" @click="goJCDetails(item.decisionId)">
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

                    <div class="div-noshow" v-if="noDataShow1">暂无数据</div>
                </van-list>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { getDecisionMaking,getMakByResolution } from './api'
export default {
    data() {
        return {
            msg: '1323',
            active: 0,
            loading: false,
            finished: false,
            list: [],
            loading1: false,
            finished1: false,
            list1: [],
            noDataShow: false,
            noDataShow1: false,
            tlist: [{
                name: '未发起',
            }, {
                name: '已发起',
            }]
        }
    },
    methods: {
        onLoad() {
            const that = this
            setTimeout(() => {
                const callback = res => {
                    console.log(res)
                    if (res.errcode === 0) {
                        that.list = res.data
                    } else {
                        that.noDataShow = true
                    }
                }
                const param ={
                    userName:that.$common.getUserInfo("userName"),
                    makType:1,
                    isExistResolution:2
                }
                getMakByResolution(param).then(callback)
                this.loading = false
                this.finished = true
            }, 500)
        },
        onLoad1() {
            const that = this
            setTimeout(() => {
                const callback = res => {
                    if (res.errcode === 0 && res.data.length>0) {
                        that.list1 = res.data
                    } else {
                        that.noDataShow1 = true
                    }
                }
                 const param ={
                    userName:that.$common.getUserInfo("userName"),
                    makType:1,
                    isExistResolution:1
                }
                getMakByResolution(param).then(callback)
                this.loading1 = false
                this.finished1 = true
            }, 500)
        },
        tabsClick(index, title) {
            console.log(index, title)
            const that = this
            if (index === 0) {
                that.onLoad()
                this.finished = false
                this.finished1 = true
                this.list = []
            } else {
                that.onLoad1()
                this.finished1 = false
                this.finished = true
                this.list1 = []
            }
        },
        goDetails(decisionId){
             this.$router.push({
                path: "/DecisionDetails",
                query: {
                    decisionId: decisionId,
                    
                }
            })
        },
        goJCDetails(decisionId,resolutionId){
              this.$router.push({
                path: "/CreativeDetails",
                query: {
                    decisionId: decisionId,
                    resolutionId:resolutionId
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
</style>

