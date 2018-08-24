<template>
    <van-popup v-model="status.classifyPopup" position="right" style="width:100%;height:100%;">
    <van-nav-bar :title="status.classifyTitle" @click-left="onClickLeft" left-text="返回" />
    <div class="popupList">
 
      <van-checkbox-group v-model="list">
        <van-cell-group>
          <van-cell v-for="(item,index) in result" clickable :key="index" :title="item.resolutionName" @click="toggle(index)">
            <van-checkbox :name="item" ref="checkboxes" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>
  </van-popup>
</template>
<script>import { getTaInfo } from './api'
export default {
    props: ['status'],
    data() {
        return {
            searchValue: '',
            result: [],
            value: '',
            list: []
        }
    },
    created() {
        const that = this
        const callback = res => {
            if (res.errcode === 0) {
                that.result = res.data
                that.result.push({resolutionName:'无',resolutionId:0})
            } else {
               // alert(res.errmsg)
            }
        }
        getTaInfo(that.status.decisionId,that.$common.getUserInfo("userName")).then(callback)
    },
    mounted() {

    },
    methods: {
        showName(it) {
            return it.resolutionName
        },
        select(it) {
            // this.searchValue = ''
            // this.status.employeeCode = it.employeeCode
            // this.status.employeeName = it.employeeName + `(编号:${it.employeeCode})`
            //this.status.speopleListPopup = false
        },
        getShow(item) {
            return item.userId === this.status.cuserId
        },
        onSearch(value) {
            console.log(this.value)
        },
        onClickLeft() {
            const that = this
            that.status.infoId = ''
            that.status.infoName = ''
            for (var i = 0; i < that.list.length; i++) {
                that.status.infoId += that.list[i].resolutionId + ','
                that.status.infoName += that.list[i].resolutionName + ','
            }
            that.status.infoId = that.status.infoId.substring(0,that.status.infoId.length-1)
            that.status.infoName = that.status.infoName.substring(0,that.status.infoName.length-1)
            this.status.classifyPopup = false
        },
        toggle(index) {
            this.$refs.checkboxes[index].toggle()
        }
    }
}
</script>
<style lang="less" scoped>
.mint-searchbar-cancel {
  transition-duration: 0.3s;
}
.mint-cell-wrapper {
  font-size: 12px;
}

.mint-popup-right {
  left: 0;
}

.popup {
  .mint-cell {
    color: #333;
    cursor: pointer;
  }
}
.icon {
  width: 20px;
  margin-right: 5px;
}
</style>