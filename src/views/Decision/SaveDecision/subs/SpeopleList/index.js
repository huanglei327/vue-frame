import { getSearchData } from './api'
export default {
    props: ['status'],
    data() {
        return {
            searchValue: '',
            result: [],
            allResult: [],
            value: '',
            list: [],
            currentName:''
            //list: ['a', 'b', 'c'],
            // result: ['a', 'b']
        }
    },
    created() {
        const that = this
        const callback = res => {
            if (res.errcode === 0) {
                that.allResult = res.data
                that.result = JSON.parse(JSON.stringify(res.data))
            } else {
                alert(res.errmsg)
            }
        }
        getSearchData().then(callback)
    },
    mounted() {
        const that =this 
        that.currentName = that.$common.getUserInfo("userName")
    },
    watch: {
        value(val) {
            const that = this
            if (!val) {
                that.result = that.allResult
            }
            const fn = item => {
                return item.userName.indexOf(val) !== -1
            }
            that.result = that.allResult.filter(fn)
        }
    },
    methods: {
        showName(it) {
            return it.userName + `(编号：${it.userId})`
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
            console.log(this.list)
            const that = this
            that.status.cuserId = ''
            that.status.cuserName = ''
            for (var i = 0; i < that.list.length; i++) {
                that.status.cuserId += that.list[i].userId + ','
                that.status.cuserName += that.list[i].userName + ','
            }
            that.status.cuserId = that.status.cuserId.substring(0,that.status.cuserId.length-1)
            that.status.cuserName = that.status.cuserName.substring(0,that.status.cuserName.length-1)
            console.log(this.status)
            this.status.speopleListPopup = false
        },
        toggle(index) {
            this.$refs.checkboxes[index].toggle()
        }
    }
}