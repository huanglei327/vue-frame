<template>
  <div class="index">
    <div class="portrait-list">
      <div class="p-photo">
      </div>
      <div class="p-p-title"></div>
    </div>
    <!-- <div class="index-hd">
      <img class="kind-list-img-title" src="../../assets/logo.jpg" />
      <div class="index-desc">欢迎光临</div>
    </div> -->
    <div class="index-bd">
      <div class="kind-list">
        <div class="kind-list-item" v-for="item in list" :key="item.id">
          <div v-on:click="kindToggle(item.id)" :class="{ 'kind-list-item-hd': item.status, 'kind-list-item-hd-show': item.open }">
            <div class="kind-list-text">{{item.name}}</div>
            <img class="kind-list-img" :src="item.src" />
          </div>
          <div :class="{ 'kind-list-item-bd': item.status, 'kind-list-item-bd-show': item.open }">
            <div :class="{'navigator-box': item.status, 'navigator-box-show': item.open} ">
              <van-cell-group v-for="( page,pindex) in  item.pages" :key="pindex">
                <router-link :to="page.url">
                  <van-cell is-link>
                    <div>
                      <van-row>
                        <van-col span="6"><img :src="page.imgn" /></van-col>
                        <van-col span="18" style="height:32px;line-height:32px;">{{page.tname}}</van-col>
                      </van-row>
                    </div>
                  </van-cell>
                </router-link>
              </van-cell-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import view from '../../assets/images/view.png'
import content from '../../assets/images/content.png'
import form from '../../assets/images/form.png'
import nav from '../../assets/images/nav.png'
import media from '../../assets/images/media.png'
import map from '../../assets/images/map.png'
import canvas from '../../assets/images/canvas.png'
import photo from '../../assets/images/logo.jpg'
import temp1 from '../../assets/images/1.png'
import temp2 from '../../assets/images/2.png'
import temp3 from '../../assets/images/3.png'
import temp4 from '../../assets/images/4.png'
import temp5 from '../../assets/images/5.png'
import temp6 from '../../assets/images/6.png'
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'HelloWorld',
  data() {
    return {
      photo: '../../assets/logo.jpg',
      msg: 'asd',
      list: [
        {
          id: 'view',
          name: '决策管理',
          open: false,
          status: true,
          src: view,
          pages: [
            {              tname: '查看决策',
              url: '/QueryDecision',
              imgn: temp1
            },
            {              tname: '发起决策',
              url: '/SaveDecision',
              imgn: temp2            }
          ]
        },
        {
          id: '2',
          name: '创意提案管理',
          open: false,
          status: true,
          src: view,
          pages: [
            { tname: '我的提案', url: '/MyCreative', imgn: temp3 },
            { tname: '发起提案', url: '/CreativeList', imgn: temp4 }
          ]
        },
         {
          id: '3',
          name: '创意评审',
          open: false,
          status: true,
          src: content,
          pages: [
            { tname: '我的评审', url: '/ReviewList', imgn: temp5 },
          ]
        },
        {
          id: '4',
          name: '结案管理',
          open: false,
          status: true,
          src: content,
          pages: [
            { tname: '我的结案', url: '/QueryDecision?type=over', imgn: temp6 },
          ]
        }
        // , {
        //   id: 'content',
        //   name: '基础内容',
        //   open: false,
        //   status: true,
        //   src: content,
        //   pages: ['text', 'icon', 'progress']
        // }, {
        //   id: 'form',
        //   name: '表单组件',
        //   open: false,
        //   status: true,
        //   src: form,
        //   pages: ['button', 'checkbox', 'form', 'input', 'label', 'picker', 'radio', 'slider', 'switch', 'textarea']
        // }, {
        //   id: 'nav',
        //   name: '导航',
        //   open: false,
        //   status: true,
        //   src: nav,
        //   pages: ['navigator']
        // }, {
        //   id: 'media',
        //   name: '媒体组件',
        //   open: false,
        //   status: true,
        //   src: media,
        //   pages: ['image', 'audio', 'video']
        // }, {
        //   id: 'map',
        //   name: '地图',
        //   status: true,
        //   src: map,
        //   pages: ['map']
        // }, {
        //   id: 'canvas',
        //   name: '画布',
        //   status: true,
        //   src: canvas,
        //   pages: ['canvas']
        // }
      ]
    }
  },
  //computed: { ...mapGetters(['msg']) },  //对应getters.技术中的msg
  mounted() {
    const that = this
    if (that.$route.query.status !== '1') {
      that.$router.push({
        path: '/BindUser',
        query: {
          token: that.$route.query.token
        }
      })
    }
    else {
      const userinfo = {
        "id": 1,
        "userName": decodeURI(that.$route.query.userName),
        "token": that.$route.query.token,
      }
      localStorage.setItem("userInfo", JSON.stringify(userinfo))
    }
    // const userinfo = {
    //   "id": 1,
    //   "userName": '管理员',
    //   "token": '456',
    // }
    // localStorage.setItem("userInfo", JSON.stringify(userinfo))
  },
  methods: {
    kindToggle: function (id) {
      let list = this.list
      for (var i = 0; i < list.length; i++) {
        if (list[i].id == id) {
          list[i].open = !list[i].open
        } else {
          list[i].open = false
        }
      }
      this.list = list
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" >
.index {
	background: white;
}
.portrait-list {
	height: 200px;
	background: white;
	background: url(/static/img/logo.c3b7e7d.jpg) no-repeat;
	background-size: 100% 100%;
	margin: 0 auto;
	width: 90%;
	.p-photo {
		margin: 0 auto;
		width: 100px;
		height: 100px;
		padding-top: 30px;
		.photo {
			width: 100px;
			height: 100px;
			border-radius: 50px;
		}
	}
	.p-p-title {
		text-align: center;
		padding: 10px 0;
	}
}
.bor {
	border-right: 1px solid #e5e5e5;
	border-bottom: 1px solid #e5e5e5;
}
.bornone {
	border-right: 1px solid white;
}
.p-list {
	text-align: center;
	padding: 15px 0;

	.p-img {
		height: 50px;
		line-height: 50px;
	}
	.p-title {
		height: 20px;
		line-height: 20px;
		color: #665858;
	}
}
</style>
