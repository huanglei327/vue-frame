<template>
    <mt-popup v-model="status.popupSearch" position="right" class="popup">
        <mt-search v-model="searchValue" :result.sync="result" :show="true" cancel-text="Cancel" placeholder="Search">
            <slot>
                <mt-cell v-for="(item, index) in result" :title="showName(item)" :key="index" @click.native="select(item)">
                    <img src="@/assets/images/attendance/right.png" class="icon" v-if="getShow(item)">
                </mt-cell>
            </slot>
        </mt-search>
    </mt-popup>
</template>
<script src="./index.js"></script>
<style lang="less" scoped>
    .mint-searchbar-cancel {
        transition-duration: .3s;
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