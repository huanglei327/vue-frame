<template>
    <div>
        <van-cell-group>
            <van-cell is-link @click="showspeoplePopup" :value="status.infoName">
                <template slot="title">
                    <span class="van-cell-text">
                        <span class="cell-s-c-red">*</span>用户姓名</span>
                    <div class="van-field__error-message errmsg">{{status.infoName_err}}</div>
                </template>
            </van-cell>
            <div></div>
        </van-cell-group>
        <van-button size="large cdy" @click="btnBind">绑定</van-button>
        <classify-list :status="status" />
    </div>
</template>

<script>
import { BindUserInfo } from './api'
import classifyList from './subs/ClassifyList/index.vue'
export default {
    data() {
        return {
            msg: 'asdasd',
            status: {
                infoId: '',
                infoName: '',
                infoName_err: '',
                classifyPopup: false,
                classTitle: '用户',
                phoneVal: '',
                phoneVal_err: '',
            }
        }

    },
    components: {
        classifyList,
    },
    mounted(){
        this.msg =JSON.stringify(this.$route.query)
    },
    methods: {
        btnBind() {
            const that = this
            let checklist = [
                { domId: 'infoName', msg: '请选择要绑定的用户', valiType: '' },
            ]

            if (!that.$checkVal.validateNull(that.status, checklist)) {
                return
            }
            const callback = res => {
                if (res.errcode === 0) {
                    that.$toast.success({
                        message: '绑定成功',
                        duration: 2000
                    });
                    that.$router.push({
                        path: '/',
                        query: {
                            token: that.$route.query.token,
                            userName: that.status.infoName,
                            status: '1'
                        }
                    })
                }
                else{
                     alert(res.errmsg)
                }
            }
            const param = {
                openid: that.$route.query.token,
                userId: that.status.infoId
            }
            BindUserInfo(param).then(callback)
        },
        showspeoplePopup() {
            this.status.classifyPopup = true
        },
    },
}
</script>

<style>
.cdy {
	margin-top: 10px;
	height: 45px;
	line-height: 38px;
	background: #ff7f00;
	color: white;
}
</style>
