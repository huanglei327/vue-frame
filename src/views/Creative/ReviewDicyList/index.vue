<template>
    <div class="details">
        <div style="background:white;padding:3px 8px;">
            <div>
                <van-row>
                    <van-col span="6">决策名称:</van-col>
                    <van-col span="18">{{decisionInfo.decisionName}}</van-col>
                </van-row>
            </div>
            <div>
                <van-row>
                    <van-col span="6">决策类型:</van-col>
                    <van-col span="18">{{decisionInfo.decisionTypeStr}}</van-col>
                </van-row>
            </div>
            <div>
                <van-row>
                    <van-col span="6">决策内容:</van-col>
                    <van-col span="18">{{decisionInfo.decisionContent}}</van-col>
                </van-row>
            </div>

            <div>
                <van-row>
                    <van-col span="6">时间要求:</van-col>
                    <van-col span="18">{{decisionInfo.closeTime}}天</van-col>
                </van-row>
            </div>

            <div>
                <van-row>
                    <van-col span="6">决策人:</van-col>
                    <van-col span="18">{{decisionInfo.createUser}}</van-col>
                </van-row>
            </div>

            <div>
                <van-row>
                    <van-col span="6">创建时间:</van-col>
                    <van-col span="18">{{decisionInfo.createTime}}</van-col>
                </van-row>
            </div>
            <div class="colored" v-if="decisionInfo.countDown !== null && decisionInfo.countDown !== '0'">
                <van-row>
                    <van-col span="24"><span style="">倒计时:</span>{{timesValue}}</van-col>
                </van-row>
            </div>
            <div class="colored" v-if="decisionInfo.countDown !== null && decisionInfo.countDown !== '0'">
                <van-row>
                    <van-col span="24">超时未处理，系统默认作废并扣除权重分</van-col>
                </van-row>
            </div>
            <ul class="up-img-ul">
                <li v-for="(item,index) in tianImgList" :key="index">
                    <img width="70px" height="90px" @click="imgPreview(index)" :src="item">
                </li>
            </ul>
        </div>
        <van-list v-model="loading" :finished="finished" @load="onLoad" :offset="300">
            <van-cell v-for="item in list" :key="item.id" style="margin-top:5px;" @click="goJCDetails(item.resolutionId,item.score,item.decisionId)">
                <div style="position:relative;">
                    <div class="d-c-title">
                        <van-row>
                            <van-col span="20" class="title"> {{item.resolutionName}}</van-col>

                        </van-row>
                    </div>
                    <div class="sizecor d-c-content">{{item.resolutionContent}}</div>
                    <van-row class="sizecor">
                        <van-col span="16">申请时间:{{item.createTime}}</van-col>
                        <van-col span="8" class="status">决策状态:{{item.statusStr}}</van-col>
                    </van-row>

                    <div v-if="item.score>0" class="div-score">{{item.score}}分</div>
                </div>
            </van-cell>

            <div class="div-noshow" v-if="noDataShow">暂无数据</div>
        </van-list>
    </div>
</template>

<script>
import { getDecisionMaking, getMyCreactive, GetDecisionList } from "./api";
import {
    GetdecisionMakingByIdApi,
} from "@/utils/httpUtils/api.js";
import { ImagePreview } from "vant";
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
            decisionInfo: {},
            noDataShow: false,
            noDataShow1: false,
            tianImgList: [],
            timesValue: '',
            dicyTimes: '',
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
    mounted() {
        const that = this
        that.init()
    },
    methods: {
        init() {
            const that = this
            const c = res => {
                if (res.errcode === 0) {
                    console.log('--')
                    that.decisionInfo = res.data[0]
                    for (var i = 0; i < res.data[0].pictureList.length; i++) {
                        const a = res.data[0].pictureList[i];
                        that.tianImgList.push(
                            "http://merit.dsunyun.com/m_decisionMaking/loadImage?fileName=" +
                            a.pictureName
                        );
                    }
                    if (that.decisionInfo.countDown !== null && that.decisionInfo.countDown !== "0") {
                        that.dicyTimes = that.$common.DateClculateA(that.decisionInfo.countDown);
                        that.calculateDate(1);
                    }
                }
            }
            const param = {
                decisionId: that.$route.query.decisionId,
                queryType: 4,
                userName: that.$common.getUserInfo("userName")
            }
            GetdecisionMakingByIdApi(param).then(c)
        },
        onLoad() {
            const that = this;
            setTimeout(() => {
                const callback = res => {
                    console.log(res);
                    if (res.errcode === 0) {
                        that.list = res.data;
                    } else {
                        that.noDataShow = true;
                    }
                };
                var param = {
                    userName: that.$common.getUserInfo("userName"),
                    assessorType: 1,
                    decisionId: that.$route.query.decisionId
                };
                if (that.$route.query.type === 2 || that.$route.query.type === '2') {
                    param.assessorType = 2
                }
                GetDecisionList(param).then(callback);
                this.loading = false;
                this.finished = true;
            }, 500);
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
        goJCDetails(resolutionId, score, decisionId) {
            if (score > 0) var pageType = "No";
            this.$router.push({
                path: "/CreativeDetails",
                query: {
                    resolutionId: resolutionId,
                    pageType: pageType,
                    decisionId: decisionId
                }
            });
        },
        imgPreview(index) {
            const that = this;
            ImagePreview(that.imgList);
        },
    }
};
</script>
<style lang="less">
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
	//background: url(../../../assets/images/score.png) no-repeat;
	position: absolute;
	width: 60px;
	height: 60px;
	/* background-size: contain; */
	background-size: contain;
	top: 0px;
	right: -8px;
	color: red;
	text-align: center;
    line-height: 30px;
    font-size: 18px;
    font-weight: 500;
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
</style>

