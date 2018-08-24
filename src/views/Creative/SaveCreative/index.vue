<template>
    <div>
        <van-cell-group>
            <van-field required label="创意提案名称" type="textarea" placeholder="请录入创意提案名称,不超过30个字" rows="1"
             autosize v-model="status.cyName" :error-message="status.cyName_err" />
            <van-field required label="创意提案内容" type="textarea" placeholder="请录入创意提案内容，不超过200字" rows="4" autosize v-model="status.cyContent" :error-message="status.cyContent_err" />
            <!-- <van-cell is-link @click="showspeoplePopup" :value="status.cuserName">
                <template slot="title">
                    <span class="van-cell-text">
                        <span class="cell-s-c-red">*</span>创意评审人</span>
                    <div class="van-field__error-message errmsg">{{status.cuserName_err}}</div>
                </template>
            </van-cell> -->
        </van-cell-group>
        <div class="div-btn">
            <van-button type="primary" size="newlarge" @click="btnGoCy">发起创意提案
            </van-button>
        </div>
        <speople-list :status="status" />
    </div>
</template>

<script>
import { SaveTA } from './api'
import speopleList from './subs/SpeopleList/index.vue'
export default {
    data() {
        return {
            value: '1',
            checked: true,
            status: {
                infoId: 0,
                infoName: '',
                classifyPopup: false,
                employeeCode: 0,
                employeeName: '',
                cuserId: 0,
                cuserName: '',
                cuserName_err: '',
                cyName: '',
                cyName_err: '',
                cyContent_err: '',
                cyContent: '',
                SearchListTitle: '创意提案人',
                SearchListPopup: false,
                speopleListTitle: '创意评审人',
                speopleListPopup: false,
            }
        }
    },
    components: {
        speopleList,
    },
    methods: {
        btnGoCy() {
            const that = this
            let checklist = [
                { domId: 'cyName', msg: '请输入创意提案名称', valiType: '' },
                { domId: 'cyContent', msg: '请选择创意提案内容', valiType: '' },
            ]

            if (!that.$checkVal.validateNull(that.status, checklist)) {
                return
            }
            const resolution = {
                decisionId: that.$route.query.decisionId,
                resolutionName: that.status.cyName,
                resolutionContent: that.status.cyContent,
                createUser: that.$common.getUserInfo("userName")
            }
            const callback = res => {
                if (res.errcode === 0) {
                    that.$toast.success({
                        message: '添加成功',
                        duration: 2000
                    });
                    that.$router.go(-1)
                } else {
                    alert(res.errmsg)
                }
            }
            SaveTA(resolution).then(callback)
        },
        showClassify() {
            this.status.classifyPopup = true
        },
        showPeople() {
            this.status.SearchListPopup = true
        },
        showspeoplePopup() {
            console.log('----')
            this.status.speopleListPopup = true
        }

    }

}
</script>

<style>
</style>
