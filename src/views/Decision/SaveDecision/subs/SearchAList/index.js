import { getSearchData } from './api'
    export default {
        props: ['status'],
        data() {
            return {
                searchValue: '',
                result: [],
                allResult: []
            }
        },
        created() {
            const that = this
            const callback = res => {
                if (res.errorCode === 0) {
                    that.allResult = res.data
                    
                    that.result = JSON.parse(JSON.stringify(res.data))
                } else {
                    alert(res.errorMessage)
                }
            }
            getSearchData().then(callback)
        },
        mounted() {
           
        },
        watch: {
            searchValue(val) {
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
                return it.name + `(编号：${it.userId})`
            },
            select(it) {
                this.searchValue = ''
                this.status.nameId = it.userId
                this.status.name = it.userName + `(编号:${it.userId})`
                this.status.popupSearch = false
            },
            getShow(item) {
                return item.userId === this.status.nameId + ''
            }
        }
    }