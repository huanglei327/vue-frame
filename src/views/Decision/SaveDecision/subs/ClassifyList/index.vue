<template>
  <van-popup v-model="status.classifyPopup" position="right" style="width:100%;height:100%;">
    <van-nav-bar :title="status.classTitle" @click-left="onClickLeft" left-text="返回" />
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
        {
          infoId: 1010,
          infoName: '信息化建设'
        },
        {
          infoId: 1020,
          infoName: '精益生产'
        },
        {
          infoId: 1030,
          infoName: '财务一体化'
        },
        {
          infoId: 1040,
          infoName: '数字化运营'
        },
        {
          infoId: 1050,
          infoName: '精准营销'
        }
      ],
      list: [
        {
          infoId: '1',
          infoName: 'A'
        },
        {
          infoId: '2',
          infoName: 'B'
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const that = this
      const callback = res => {
        if (res.errcode === 0) {
          that.result = res.data
        } else {
          alert(res.errmsg)
        }
      }
      const param = {
        lookupNo: 'decision_type'
      }
      getValue().then(callback)
    },
    showName(item) {
      return item.lookupValue
    },
    getShow(item) {
      return item.lookupCode === this.status.infoId
    },
    select(item) {
      this.status.infoId = item.lookupCode
      this.status.infoName = item.lookupValue
      this.status.classifyPopup = false
    },
    onClickLeft() {
      this.status.classifyPopup = false
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