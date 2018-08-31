<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div>1</div>
      <p>刷新次数: {{ count }}</p>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      isLoading: false
    }
  },
  mounted() {
    // const that = this
    // console.time('case 1')
    // that.doSomething().then(() => {
    //   return that.doSomethingElse()
    // }).then(function finalHandler(res) {
    //   console.log(res)
    //   console.timeEnd('case 1')
    // })
    const that = this
    console.time('case 1')
    that.fun1().then(()=>{
      return that.fun2()
    })
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    doSomething() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('something')
        }, 1000)
      })
    },
    doSomethingElse() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('somethingElse')
        }, 1500)
      })
    },
    fun1() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(1)
          resolve('something')
        }, 1000);
      
      })
    },
    fun2() {
       
        console.log(2)
      
    }
  }
}
</script>

<style>
</style>
