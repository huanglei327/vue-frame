<template>
    <div>
        <!-- <div>
            <van-panel title="标题" desc="描述信息" status="状态">

                <div slot="header" style="padding:10px 0; text-align:center;">
                    <van-row>
                        <van-col span="8">2018-08-13</van-col>
                        <van-col span="8">{{list.createUser}}</van-col>
                        <van-col span="8">{{list.status | filterFun}}</van-col>
                    </van-row>
                </div>
                <div class="content" style="height:calc(100vh - 156px );overflow:auto;">
                    {{list.resolutionContent}}

                </div>
                <div slot="footer">
                    <van-row class="text-align-c">
                        <van-col span="12">
                            <van-button type="danger" size="small" @click="btn_tw">提问</van-button>
                        </van-col>
                        <van-col span="12">
                            <van-button type="primary" size="small" @click="btn_ps">评审</van-button>
                        </van-col>
                    </van-row>
                </div>
            </van-panel>

        </div> -->

        <div class="detailsPanel">
            <van-cell-group class="details">
                <van-cell>
                    <van-row>
                        <van-col span="8">2018-08-13</van-col>
                        <van-col span="8">{{list.createUser}}</van-col>
                        <van-col span="8">{{list.status | filterFun}}</van-col>
                    </van-row>
                    <div class="alin-c">{{list.resolutionName}}</div>
                    <div class="content font13">
                        {{list.resolutionContent}} 
                    </div>
                </van-cell>
            </van-cell-group>
            <div class="bg-white">
                <div class="dd-wd">问答</div>
            </div>
            <van-cell-group>
                <van-cell v-for="(item,index) in tiwenlist" :key="index">
                    <div>
                        <van-row class="wdt-title">
                            <van-col span="4" class="wdt-toux"><img :src="toux"> </van-col>
                            <van-col span="6">{{item.createUser}}</van-col>
                            <van-col span="12">{{item.createTime}}</van-col>
                        </van-row>
                        <div class="wdt-c">{{item.quizCentent}}</div>
                    </div>
                </van-cell>
            </van-cell-group>
        </div>
        <div class="de-boA">
            <div class="dflex">
                <div class="b-cheng" @click="btn_tw">提问</div>
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
                    <van-field type="number" min="10" max="100" required clearable label="分数" placeholder="请输入分数1-10" v-model="resolutionScore" />
                    <van-field type="textarea" maxlength="50" required clearable label="结论" placeholder="请输入结论，不超过50字" rows="1" autosize v-model="resolutionConclusion" />
                    <van-field type="textarea" maxlength="200" required clearable label="优点" placeholder="请在这里录入优点，提案名称不超过200个字" v-model="resolutionMerit" rows="2" autosize />
                    <van-field type="textarea" maxlength="200" required clearable label="缺点" placeholder="请在这里录入优点，提案名称不超过200个字" rows="2" autosize v-model="resolutionDefect" />
                </van-cell-group>
                <div class="div-btn">
                    <van-button type="primary" size="newlarge" @click="btnSavePs">发起评审
                    </van-button>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import view from '../../../assets/images/smallxr0.png'
import { getCreativeDetails, addQuizInfo, addResolutionDtlInfo, getQuizInfo } from './api'
export default {
    data() {
        return {
            msg: 'adasd',
            show: false,
            popupTitle: '提问',
            tiwenShow: true,
            pingshenShow: false,
            message: '',
            list: {},
            resolutionMerit: '',
            resolutionDefect: '',
            resolutionScore: '',
            resolutionConclusion: '',
            quizCentent: '',
            userName: '',
            decisionId: 0,
            resolutionId: 0,
            tiwenlist: [],
            toux: view,
        }
    },
    mounted() {
        const that = this
        const resolutionId = that.$route.query.resolutionId
        that.resolutionId = that.$route.query.resolutionId
        that.decisionId = that.$route.query.decisionId
        const callback = res => {
            if (res.errcode === 0) {
                console.log(res.data[0])
                that.list = res.data[0]
            }
        }
        //that.tiwenlist = [{ "quizId": 17, "decisionId": 9, "resolutionId": null, "quizName": null, "quizType": null, "quizCentent": "adadad", "remarks": "", "createUser": "管理员", "createTime": "2018-08-17 10:41:09", "updateUser": null, "updateTime": "2018-08-17 10:41:08", "quizTypeStr": null }, { "quizId": 18, "decisionId": 9, "resolutionId": null, "quizName": null, "quizType": null, "quizCentent": "请问系统上线有什么要求", "remarks": "", "createUser": "管理员", "createTime": "2018-08-17 10:41:30", "updateUser": null, "updateTime": "2018-08-17 10:41:30", "quizTypeStr": null }]
        getCreativeDetails(resolutionId).then(callback)
        that.getQui(resolutionId)
    },
    filters: {
        filterFun(value) {
            const status = {
                '10': '提案中',
                '20': '评审中',
                '90': '结案'
            }
            return status[value]
        }
    },
    methods: {
        getQui(resolutionId) {
            const that = this
            const callbackA = res => {
                if (res.errcode === 0) {
                    that.tiwenlist = res.data
                } else {
                }
            }
            getQuizInfo(resolutionId).then(callbackA)
        },
        btn_tw() {
            this.show = true
            this.popupTitle = '提问'
            this.tiwenShow = true
            this.pingshenShow = false
        },
        btn_ps() {
            this.show = true
            this.popupTitle = '评审'
            this.pingshenShow = true
            this.tiwenShow = false
        },
        btnSaveTw() {
            const that = this
            const callback = res => {
                if (res.errcode === 0) {
                    that.$toast.success(res.errmsg)
                    that.tiwenShow = false
                    that.show = false
                    that.getQui(that.resolutionId)
                }
                else {
                    that.$toast.fail(res.errmsg);
                    return
                }
            }
            const param = {
                quizCentent: that.quizCentent,
                resolutionId: that.list.resolutionId,
                decisionId: that.list.decisionId,
                createUser: that.$common.getUserInfo("userName")
            }
            addQuizInfo(param).then(callback)
        },
        btnSavePs() {
            const that = this
            const callback = res => {
                if (res.errcode === 0) {
                    that.$toast.success(res.errmsg)
                    that.pingshenShow = !that.pingshenShow
                    that.show = false
                }
                else {
                    that.$toast.fail(res.errmsg);
                    return
                }
            }
            const param = {
                decisionId: that.list.decisionId,
                resolutionId: that.list.resolutionId,
                resolutionConclusion: that.resolutionConclusion,
                resolutionMerit: that.resolutionMerit,
                resolutionDefect: that.resolutionDefect,
                resolutionScore: that.resolutionScore,
                createUser: that.$common.getUserInfo("userName")
            }
            addResolutionDtlInfo(param).then(callback)
        }
    }
}
</script>

<style  lang="less">
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
.de-boA {
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
			width: 50%;
			height: 40px;
			line-height: 38px;
			text-align: center;
			color: white;
		}
		.b-red {
			background: #f44;
		}
		.b-cheng {
			border-radius: 5px 0 0 0;
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
.content {
	text-indent: 20px;
}
</style>
