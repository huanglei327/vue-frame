<template>
    <div>
        <van-cell-group>
            <van-field required label="决策名称" :value="list.decisionName" type="textarea" rows="1" autosize disabled />
            <van-field v-model="list.decisionTypeStr" required label="类型" disabled />
            <van-field required label="决策内容" :value="list.decisionContent" type="textarea" rows="1" autosize disabled/>
            <van-field v-model="list.decisionProposer" required label="创意提案人" disabled />
            <van-field v-model="list.decisionAssessor" required label="创意评审人" disabled />
        </van-cell-group>
        <div style="margin-top:10px;"></div>
        <van-cell-group>
            <van-field v-model="list.optimalResolutionName" required label="最优创意提案" disabled />
            <!-- <van-cell is-link @click="showspeoplePopup" :value="status.infoName">
                <template slot="title">
                    <span class="van-cell-text">
                        <span class="cell-s-c-red">*</span>最优创意提案</span>
                    <div class="van-field__error-message errmsg">{{status.infoName_err}}</div>
                </template>
            </van-cell>-->
            <div style="padding:  5px 20px;display:  flex;">
                <van-radio-group v-model="isConsent">
                    <van-radio name="1" style="margin:10px 0;">同意最优创意提案 </van-radio>
                    <van-radio name="2">不同意最优创意提案</van-radio>
                </van-radio-group>
            </div>
            <van-field required label="原因" type="textarea" placeholder="请输入原因,不超过30个字" rows="1" autosize v-model="status.finalResolutionName" :error-message="status.finalResolutionName_err" />
        </van-cell-group>

        <div class="div-btn">
            <van-button type="primary" size="newlarge" @click="btnGoOver">结案
            </van-button>
        </div>
        <classify-list :status="status" />
    </div>
</template>

<script>
import { getDecisionMaking, closeDecisionMaking } from './api'
import classifyList from './subs/ClassifyList/index.vue'
export default {
    data() {
        return {
            reamrk: "新技术革命给我们带来了千载难逢的机遇，中国的制造业如果把握机会？我们的企业该怎么样通过数字化实现转型升级",
            value: '1',
            checked: true,
            isConsent: '1',
            status: {
                infoId: 0,
                infoName: '',
                infoName_err: '',
                finalResolutionName: '',
                finalResolutionName_err: '',
                classifyPopup: false,
                classifyTitle: '最优创意提案',
                decisionId: 0,

            },
            list: {}
        }
    },
    components: {
        classifyList,
    },
    created() {
        console.log(this.$route.query.decisionId)
        this.status.decisionId = this.$route.query.decisionId

        const that = this
        const callback = res => {
            console.log(res)
            if (res.errcode === 0) {
                that.list = res.data[0]
            }
        }
        const param = {
            decisionId: this.$route.query.decisionId,
            userName: that.$common.getUserInfo("userName"),
            makType: 0
        }
        getDecisionMaking(param).then(callback)
    },
    methods: {
        btnGoJC() {
            console.log('----')
        },
        showClassify() {
            this.status.classifyPopup = true
        },
        showPeople() {
            this.status.SearchListPopup = true
        },
        showspeoplePopup() {
            console.log('----')
            this.status.classifyPopup = true
        },
        btnGoOver() {
            const that = this
            let checklist = [
                { domId: 'finalResolutionName', msg: '请输入原因', valiType: '' },
                { domId: 'jcContent', msg: '请选择决策内容', valiType: '' },
            ]

            if (!that.$checkVal.validateNull(that.status, checklist)) {
                return
            }
            const DecisionMaking = {
                decisionId: that.$route.query.decisionId,
                finalResolutionName: that.status.finalResolutionName,
                optimalResolutionName: that.list.optimalResolutionName,
                updateUser: that.$common.getUserInfo("userName"),
                isConsent: that.isConsent
            }
            const callback = res => {
                if (res.errcode === 0) {
                    that.$toast.success({
                        message: '添加成功',
                        duration: 2000
                    });
                    setTimeout(() => {
                        that.$router.push({
                            path: '/OverInfo',
                            query: {
                                statusStr: 'yijiean',
                                decisionId: this.$route.query.decisionId,
                            }
                        })
                    }, 1000);
                } else {
                    alert(res.errmsg)
                }
            }
            closeDecisionMaking(DecisionMaking).then(callback)
        }
    }

}
</script>

<style>
</style>
