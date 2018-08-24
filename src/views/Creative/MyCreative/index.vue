
<template>
    <div>
        <van-list v-model="loading" :finished="finished" :offset="100" @load="caonima">
            <van-cell-group v-for="(item, index) in list" :key="index">
                <van-cell @click="skipCreative(item.resolutionId,item.decisionId)">
                    <van-row>
                        <van-col span="20">
                            <div class="wl_c">{{item.resolutionName}}</div>
                            <van-row class="w_l_t">
                                <van-col span="14">{{item.createTime}}</van-col>
                                <van-col span="10">申请人:{{item.createUser}}</van-col>
                            </van-row>
                        </van-col>
                        <van-col style="height:48px" span="4">
                            {{item.statusStr}}
                        </van-col>
                    </van-row>
                </van-cell>
            </van-cell-group>
        </van-list>
    </div>
</template>

<script>
import { getMyCreactive } from './api'
export default {
    data() {
        return {
            msg: '----',
            list: [],
            loading: false,
            finished: false,
        }
    },
    mounted() {

        const that = this
        const callback = res => {
            console.log(res)
            if (res.errcode === 0) {
                that.list = res.data
            }
        }
        getMyCreactive(that.$common.getUserInfo("userName")).then(callback)
    },
    methods: {
        caonima() {
            let that = this

            // getMyCreactive().then(response => {
            //     that.list = response.data
            //     console.log(response)
            // })
            that.loading = false
            that.finished = true
        },
        skipCreative(resolutionId, decisionId) {
            this.$router.push({
                path: '/CreativeDetails',
                query: {
                    resolutionId: resolutionId,
                    decisionId: decisionId
                }
            })
        }
    }

}
</script>

<style>
.van-search--show-action {
	padding-right: 15px;
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
</style>
