<template>
    <div>

        <van-panel class="padding15" title="陈总，您好！">
            <div>
                <p class="t-indet25">
                    请及时评审，《关于杰美特公司关于集团数字化转型》的创意提案。 如果您不能在第一时间提出您的建议和参与创意提案，请直接点暂不参与，并输入原因。 参与评审直接点“继续”。
                </p>
                <p>感谢您的参与创意提案，为杰美特的发展提出自己的宝贵意见，祝您生活愉快！</p>
            </div>
            <div slot="footer">
                <van-row class="text-align-c">
                    <van-col span="12">
                        <van-button type="danger" size="small" @click="goNonparticipation">不参与</van-button>
                    </van-col>
                    <van-col span="12">
                        <van-button type="primary" size="small" @click="goCreative">继续</van-button>
                    </van-col>
                </van-row>
            </div>
        </van-panel>
        <van-popup v-model="show" style="width:80%;" class="remind">
            <div class="popup-title text-align-c">
                <h3>不参与原因</h3>
            </div>
            <van-cell-group>
                <van-field :value="list.decisionName" required clearable label="创意提案名称" disabled />
                <van-field v-model="remarks" required label="原因" 
                type="textarea" placeholder="请在这里录入不参与提案评审的原因不超过200个字。"
                 rows="6" autosize />
            </van-cell-group>
            <div class="div-btn">
                <van-button type="primary" size="newlarge" @click="btnNoPation">提交
                </van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { getDecisionMaking, notDecisionMaking } from './api'
export default {
    data() {
        return {
            msg: 'asd',
            show: false,
            cyName: '',
            remarks: '',
            list: {},

        }
    },
    created() {
        const that = this
        const callback = res => {
            console.log(res)
            if (res.errcode === 0) {
                that.list = res.data[0]
            }
        }
        getDecisionMaking(this.$route.query.decisionId).then(callback)
    },
    mounted() {
        console.log(this.$route.query)
    },
    methods: {
        goCreative() {

            this.$router.push({
                path: "/SaveCreative",
                query: {
                    decisionId: this.$route.query.decisionId
                }
            })
        },
        goNonparticipation() {
            this.show = !this.show
        },
        btnNoPation() {
            const that = this
            const callback = res => {
                console.log(res)
                if (res.errcode === 0) {
                    that.$toast.success({
                        message: '提交成功',
                        duration: 2000
                    });
                    that.$router.go(-1)
                    this.show = !this.show
                }
                else{
                     that.$toast.fail({
                        message: res.errmsg,
                        duration: 2000
                    });
                    this.show = !this.show
                }
            }
            const param = {
                decisionId: that.$route.query.decisionId,
                decisionProposer: that.$common.getUserInfo("userName"),
                remarks: this.remarks
            }
            notDecisionMaking(param).then(callback)
        }
    }
}
</script>

<style>
.remind .van-field .van-cell__title {
	max-width: 50px;
}
</style>
