<template>
    <van-popup v-model="status.daysPopup" position="right" style="width:100%;height:100%;">
        <van-nav-bar :title="status.daysPopupTitle" @click-left="onClickLeft" left-text="返回" />
        <div class="popupList">
            <van-cell-group>
                <van-cell v-for="(item, index) in result" :title="showName(item)" :key="index" @click.native="select(item)">
                    <img src="../../../../../assets/images/right.png" class="icon" v-if="getShow(item)">
                </van-cell>
            </van-cell-group>
        </div>
    </van-popup>
</template>
<script>
import { getValue } from './api.js'
export default {
    props: ['status'],
    data() {
        return {
            result: [

            ],
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            const that = this
            for (var i = 3; i <= 15; i++) {
                that.result.push(i)
            }
        },
        showName(item) {
            return item+'天'
        },
        getShow(item) {
            return item === this.status.jcDays
        },
        select(item) {
            this.status.jcDays = item
            this.status.daysPopup = false
        },
        onClickLeft() {
            this.status.daysPopup = false
        }
    }
}
</script>
<style lang="less" scoped>
.popupList {
	width: 100%;
	height: 100vh;
	.icon {
		width: 20px;
		margin-right: 5px;
		color: #4b0;
	}
}
</style>