import { getSearchData } from './api'
export default {
    props: ['status'],
    data() {
        return {
            searchValue: '',
            result: [],
            allResult: [],
            value: '',
            list: []
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
            console.log(it)
            // this.searchValue = ''
            // this.status.employeeCode = it.employeeCode
            // this.status.employeeName = it.employeeName + `(编号:${it.employeeCode})`
            //this.status.speopleListPopup = false
        },
        getShow(item) {
            return item.userId === this.status.tuserId
        },
        onSearch(value) {
            console.log(this.value)
        },
        onClickLeft() {
            console.log(this.list)
            const that = this
            that.status.tuserId = ''
            that.status.tuserName = ''
            for (var i = 0; i < that.list.length; i++) {
                that.status.tuserId += that.list[i].userId + ','
                that.status.tuserName += that.list[i].userName + ','
            }
            that.status.tuserId = that.status.tuserId.substring(0,that.status.tuserId.length-1)
            that.status.tuserName = that.status.tuserName.substring(0,that.status.tuserName.length-1)
            console.log(this.status)
            this.status.SearchListPopup = false
        },
        toggle(index) {
            this.$refs.checkboxes[index].toggle()
        }
    }
}