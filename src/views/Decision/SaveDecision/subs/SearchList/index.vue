<template>
  <van-popup v-model="status.SearchListPopup" position="right" style="width:100%;height:100%;">
    <van-nav-bar :title="status.SearchListTitle" @click-left="onClickLeft" left-text="返回" />
    <van-search v-model="value" show-action @search="onSearch">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <div class="popupList">

      <van-checkbox-group v-model="list">
        <van-cell-group>
          <van-cell v-for="(item,index) in result" clickable :key="index" :title="item.userName+'(编号:'+item.userId+')'" @click="toggle(index)">
            <div v-if="currentName === item.userName">
              <van-checkbox :name="item" ref="checkboxes" disabled />
            </div>
            <div v-else>
              <van-checkbox :name="item" ref="checkboxes" />
            </div>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>
  </van-popup>
</template>
<script src="./index.js"></script>
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